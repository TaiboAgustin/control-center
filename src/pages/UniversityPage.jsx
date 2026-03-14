import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, STUDY_PLAN, TOTAL_SUBJECTS } from '../db/db';
import { GraduationCap, Clock, BookOpen, Plus, Check, ChevronDown, ChevronUp, ChevronRight, Trash2, X } from 'lucide-react';
import './UniversityPage.css';

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const UniversityPage = () => {
  const navigate = useNavigate();
  const subjects = useLiveQuery(() => db.subjects.toArray());
  const schedules = useLiveQuery(() => db.schedules.toArray());
  const resources = useLiveQuery(() => db.resources.toArray());
  const weeksData = useLiveQuery(() => db.weeks.toArray());

  const [expandedSemester, setExpandedSemester] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ subjectId: '', dayOfWeek: 1, startTime: '08:00', endTime: '10:00' });
  const [activeResourceTab, setActiveResourceTab] = useState(null);

  // --- Computed Data ---
  const approvedCount = useMemo(() => subjects?.filter(s => s.status === 'approved').length || 0, [subjects]);
  const inProgressSubjects = useMemo(() => subjects?.filter(s => s.status === 'in_progress') || [], [subjects]);
  const progressPercent = TOTAL_SUBJECTS > 0 ? Math.round((approvedCount / TOTAL_SUBJECTS) * 100) : 0;

  // --- Build a lookup: subjectId -> weekNumber -> weekMeta ---
  const weeksLookup = useMemo(() => {
    if (!weeksData) return {};
    const map = {};
    for (const w of weeksData) {
      if (!map[w.subjectId]) map[w.subjectId] = {};
      map[w.subjectId][w.weekNumber] = w;
    }
    return map;
  }, [weeksData]);

  // --- Next Class Calculation ---
  const getNextClassForSubject = (subjectId, schedulesArr) => {
    if (!schedulesArr) return null;
    const subjSchedules = schedulesArr.filter(sc => sc.subjectId === subjectId);
    if (subjSchedules.length === 0) return null;

    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let best = null;
    let bestDelta = Infinity;

    for (const sched of subjSchedules) {
      const [h, m] = sched.startTime.split(':').map(Number);
      const schedMinutes = h * 60 + m;
      let dayDiff = sched.dayOfWeek - currentDay;

      if (dayDiff < 0) dayDiff += 7;
      if (dayDiff === 0 && schedMinutes <= currentTime) dayDiff = 7;

      const delta = dayDiff * 24 * 60 + (schedMinutes - currentTime);
      if (delta < bestDelta) {
        bestDelta = delta;
        best = { ...sched, delta };
      }
    }

    if (best) {
      const days = Math.floor(best.delta / (24 * 60));
      return days;
    }
    return null;
  };

  const nextClass = useMemo(() => {
    if (!schedules || schedules.length === 0 || !subjects) return null;

    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let best = null;
    let bestDelta = Infinity;

    for (const sched of schedules) {
      const [h, m] = sched.startTime.split(':').map(Number);
      const schedMinutes = h * 60 + m;
      let dayDiff = sched.dayOfWeek - currentDay;

      if (dayDiff < 0) dayDiff += 7;
      if (dayDiff === 0 && schedMinutes <= currentTime) dayDiff = 7;

      const delta = dayDiff * 24 * 60 + (schedMinutes - currentTime);
      if (delta < bestDelta) {
        bestDelta = delta;
        const subj = subjects.find(s => s.id === sched.subjectId);
        best = { ...sched, subjectName: subj?.name || 'Desconocida', delta };
      }
    }

    if (best) {
      const days = Math.floor(best.delta / (24 * 60));
      const hours = Math.floor((best.delta % (24 * 60)) / 60);
      const mins = best.delta % 60;
      let timeStr = '';
      if (days > 0) timeStr += `${days}d `;
      if (hours > 0) timeStr += `${hours}h `;
      timeStr += `${mins}m`;
      best.timeUntil = timeStr;
      best.dayName = DAY_NAMES[best.dayOfWeek];
    }
    return best;
  }, [schedules, subjects]);

  // --- Pending resources: only current week or overdue ---
  const pendingResources = useMemo(() => {
    if (!resources || !subjects || !schedules) return [];

    const inProgressIds = new Set(inProgressSubjects.map(s => s.id));
    const pending = resources.filter(r => !r.isCompleted && inProgressIds.has(r.subjectId));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return pending.filter(r => {
      // If no week assigned, always show
      if (!r.week) return true;
      const weekMeta = weeksLookup[r.subjectId]?.[r.week];
      // If week has no dates configured, show it
      if (!weekMeta || !weekMeta.startDate || !weekMeta.endDate) return true;
      const start = new Date(weekMeta.startDate + 'T00:00:00');
      const end = new Date(weekMeta.endDate + 'T23:59:59');
      // Show if current week (today is within range) or overdue (endDate already passed)
      return today <= end && today >= start || today > end;
    }).map(r => {
      const subj = subjects.find(s => s.id === r.subjectId);
      // Deadline = days until the week's endDate
      let daysUntil = null;
      if (r.week) {
        const weekMeta = weeksLookup[r.subjectId]?.[r.week];
        if (weekMeta?.endDate) {
          const end = new Date(weekMeta.endDate + 'T23:59:59');
          const diffMs = end - today;
          daysUntil = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
        }
      }
      return {
        ...r,
        subjectName: subj?.name || '',
        daysUntil,
      };
    }).sort((a, b) => {
      if (a.daysUntil === null && b.daysUntil === null) return a.title.localeCompare(b.title);
      if (a.daysUntil === null) return 1;
      if (b.daysUntil === null) return -1;
      return a.daysUntil - b.daysUntil;
    });
  }, [resources, subjects, schedules, inProgressSubjects, weeksLookup]);

  // --- Group pending resources by subjectId ---
  const resourcesBySubject = useMemo(() => {
    const map = {};
    for (const r of pendingResources) {
      if (!map[r.subjectId]) map[r.subjectId] = { name: r.subjectName, resources: [] };
      map[r.subjectId].resources.push(r);
    }
    return map;
  }, [pendingResources]);

  // Auto-select first tab if none selected
  const subjectIds = Object.keys(resourcesBySubject).map(Number);
  const currentTab = activeResourceTab && resourcesBySubject[activeResourceTab] ? activeResourceTab : subjectIds[0] || null;
  const currentTabResources = currentTab ? resourcesBySubject[currentTab]?.resources || [] : [];

  // --- Grouped subjects by semester ---
  const subjectsBySemester = useMemo(() => {
    if (!subjects) return {};
    const map = {};
    for (const s of subjects) {
      if (!map[s.semester]) map[s.semester] = [];
      map[s.semester].push(s);
    }
    return map;
  }, [subjects]);

  // --- Handlers ---
  const toggleStatus = async (subject) => {
    const order = ['pending', 'in_progress', 'approved'];
    const next = order[(order.indexOf(subject.status) + 1) % order.length];
    await db.subjects.update(subject.id, { status: next });
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!scheduleForm.subjectId) return;
    await db.schedules.add({
      subjectId: Number(scheduleForm.subjectId),
      dayOfWeek: Number(scheduleForm.dayOfWeek),
      startTime: scheduleForm.startTime,
      endTime: scheduleForm.endTime,
    });
    setShowScheduleForm(false);
    setScheduleForm({ subjectId: '', dayOfWeek: 1, startTime: '08:00', endTime: '10:00' });
  };

  const handleDeleteSchedule = async (id) => {
    await db.schedules.delete(id);
  };

  const toggleResource = async (id, current) => {
    await db.resources.update(id, { isCompleted: !current });
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: { label: 'Pendiente', className: 'badge-pending' },
      in_progress: { label: 'Cursando', className: 'badge-cursando' },
      approved: { label: 'Aprobada', className: 'badge-aprobada' },
    };
    return map[status] || map.pending;
  };

  const getDeadlineLabel = (days) => {
    if (days === null) return null;
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Mañana';
    return `en ${days} días`;
  };

  const getDeadlineClass = (days) => {
    if (days === null) return '';
    if (days <= 1) return 'deadline-urgent';
    if (days <= 3) return 'deadline-soon';
    return 'deadline-normal';
  };

  if (!subjects) return null;

  return (
    <div className="uni-page">
      {/* Header */}
      <header className="uni-header">
        <div>
          <h1><GraduationCap size={32} className="uni-header-icon" /> Universidad</h1>
          <p className="uni-career">Licenciatura en Sistemas — UNGS</p>
        </div>
        {nextClass && (
          <div className="next-class-widget">
            <div className="next-class-label"><Clock size={14} /> Próxima clase</div>
            <div className="next-class-name">{nextClass.subjectName}</div>
            <div className="next-class-detail">
              {nextClass.dayName} {nextClass.startTime}–{nextClass.endTime} · en {nextClass.timeUntil}
            </div>
          </div>
        )}
      </header>

      {/* Progress Bar */}
      <section className="uni-progress-section card">
        <div className="uni-progress-header">
          <h2>Progreso de la Carrera</h2>
          <span className="uni-progress-fraction">{approvedCount} / {TOTAL_SUBJECTS} materias aprobadas</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="uni-progress-pct">{progressPercent}% completado</p>
      </section>

      <div className="uni-grid">
        {/* Left: Study Plan */}
        <section className="uni-plan">
          <h2>Plan de Estudios</h2>
          <p className="uni-plan-hint">Hacé clic en una materia para cambiar su estado: Pendiente → Cursando → Aprobada</p>
          <div className="semester-list">
            {STUDY_PLAN.map(sem => {
              const isOpen = expandedSemester === sem.semester;
              const semSubjects = subjectsBySemester[sem.semester] || [];
              const approvedInSem = semSubjects.filter(s => s.status === 'approved').length;
              return (
                <div key={sem.semester} className="semester-block">
                  <button className="semester-header" onClick={() => setExpandedSemester(isOpen ? null : sem.semester)}>
                    <span>{sem.label || `Cuatrimestre ${sem.semester}`}</span>
                    <span className="semester-count">{approvedInSem}/{sem.subjects.length}
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="semester-subjects">
                      {semSubjects.map(subj => {
                        const badge = getStatusBadge(subj.status);
                        return (
                          <button key={subj.id} className={`subject-row ${subj.status}`} onClick={() => toggleStatus(subj)}>
                            <span className="subject-name">{subj.name}</span>
                            <span className={`subject-badge ${badge.className}`}>{badge.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column */}
        <div className="uni-right">
          {/* Current Semester Subjects & Schedules */}
          <section className="card uni-schedule-section">
            <div className="section-title-row">
              <h2>Materias Cursando</h2>
              <button className="btn btn-primary btn-sm" onClick={() => setShowScheduleForm(!showScheduleForm)}>
                {showScheduleForm ? <X size={14} /> : <Plus size={14} />}
                {showScheduleForm ? 'Cancelar' : 'Horario'}
              </button>
            </div>

            {showScheduleForm && (
              <form className="inline-form" onSubmit={handleAddSchedule}>
                <select className="input" value={scheduleForm.subjectId} onChange={e => setScheduleForm(p => ({ ...p, subjectId: e.target.value }))}>
                  <option value="">Seleccionar materia...</option>
                  {inProgressSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <select className="input" value={scheduleForm.dayOfWeek} onChange={e => setScheduleForm(p => ({ ...p, dayOfWeek: e.target.value }))}>
                  {DAY_NAMES.map((d, i) => <option key={i} value={i}>{d}</option>)}
                </select>
                <div className="time-row">
                  <input type="time" className="input" value={scheduleForm.startTime} onChange={e => setScheduleForm(p => ({ ...p, startTime: e.target.value }))} />
                  <span>a</span>
                  <input type="time" className="input" value={scheduleForm.endTime} onChange={e => setScheduleForm(p => ({ ...p, endTime: e.target.value }))} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>Agregar Horario</button>
              </form>
            )}

            {inProgressSubjects.length > 0 ? (
              <div className="current-subjects-list">
                {inProgressSubjects.map(subj => {
                  const subjSchedules = schedules?.filter(sc => sc.subjectId === subj.id) || [];
                  const subjResources = resources?.filter(r => r.subjectId === subj.id) || [];
                  const totalRes = subjResources.length;
                  const doneRes = subjResources.filter(r => r.isCompleted).length;
                  const resPct = totalRes > 0 ? Math.round((doneRes / totalRes) * 100) : 0;

                  return (
                    <div
                      key={subj.id}
                      className="current-subject-card clickable"
                      onClick={() => navigate(`/university/${subj.id}`)}
                    >
                      <div className="subject-card-header">
                        <h4>{subj.name}</h4>
                        <ChevronRight size={16} className="subject-card-arrow" />
                      </div>
                      {subjSchedules.length > 0 && (
                        <div className="schedule-tags">
                          {subjSchedules.map(sc => (
                            <div key={sc.id} className="schedule-tag">
                              <span>{DAY_NAMES[sc.dayOfWeek]} {sc.startTime}–{sc.endTime}</span>
                              <button className="tag-delete" onClick={(e) => { e.stopPropagation(); handleDeleteSchedule(sc.id); }}><Trash2 size={12} /></button>
                            </div>
                          ))}
                        </div>
                      )}
                      {totalRes > 0 && (
                        <div className="subject-card-progress">
                          <div className="subject-card-progress-track">
                            <div className={`subject-card-progress-fill ${resPct === 100 ? 'complete' : ''}`} style={{ width: `${resPct}%` }}></div>
                          </div>
                          <span className="subject-card-progress-label">{doneRes}/{totalRes}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-data">Marcá materias como "Cursando" desde el plan de estudios.</p>
            )}
          </section>
        </div>
      </div>

      {/* Resources - Full width below grid, with subject tabs */}
      <section className="card uni-resources-section uni-resources-full">
        <div className="section-title-row">
          <h2><BookOpen size={18} /> Lecturas y Recursos</h2>
        </div>

        {subjectIds.length > 0 ? (
          <>
            <div className="resource-tabs">
              {subjectIds.map(id => (
                <button
                  key={id}
                  className={`resource-tab ${currentTab === id ? 'active' : ''}`}
                  onClick={() => setActiveResourceTab(id)}
                >
                  {resourcesBySubject[id].name}
                  <span className="resource-tab-count">{resourcesBySubject[id].resources.length}</span>
                </button>
              ))}
            </div>

            <div className="resources-list">
              {currentTabResources.map(res => (
                <div key={res.id} className={`resource-row ${res.isCompleted ? 'completed' : ''}`}>
                  <button className="resource-check" onClick={() => toggleResource(res.id, res.isCompleted)}>
                    {res.isCompleted ? <Check size={16} /> : <div className="empty-check" />}
                  </button>
                  <div className="resource-info">
                    <span className="resource-title">{res.title}</span>
                    <span className="resource-subject">
                      Semana {res.week}
                      {res.daysUntil !== null && (
                        <span className={`resource-deadline ${getDeadlineClass(res.daysUntil)}`}>
                          {' '}· {getDeadlineLabel(res.daysUntil)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="no-data">No hay lecturas pendientes. Agregá recursos desde el detalle de cada materia.</p>
        )}
      </section>
    </div>
  );
};
