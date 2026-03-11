import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowLeft, Plus, Check, Trash2, ChevronDown, ChevronUp, ExternalLink, Pencil, Calendar } from 'lucide-react';
import './SubjectDetailPage.css';

export const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const numericId = Number(subjectId);

  const subject = useLiveQuery(() => db.subjects.get(numericId), [numericId]);
  const resources = useLiveQuery(() => db.resources.where('subjectId').equals(numericId).toArray(), [numericId]);
  const weeksData = useLiveQuery(() => db.weeks.where('subjectId').equals(numericId).toArray(), [numericId]);

  const [expandedWeeks, setExpandedWeeks] = useState(new Set());
  const [newResourceTexts, setNewResourceTexts] = useState({});
  const [newResourceLinks, setNewResourceLinks] = useState({});
  const [editingId, setEditingId] = useState(null);

  // --- Map week metadata by weekNumber ---
  const weeksMeta = useMemo(() => {
    if (!weeksData) return {};
    const map = {};
    for (const w of weeksData) {
      map[w.weekNumber] = w;
    }
    return map;
  }, [weeksData]);

  // --- Grouped by week ---
  const weekGroups = useMemo(() => {
    if (!resources) return [];
    const map = {};
    for (const r of resources) {
      const w = r.week || 1;
      if (!map[w]) map[w] = [];
      map[w].push(r);
    }
    // Also include weeks that exist in weeksMeta but have no resources yet
    if (weeksData) {
      for (const w of weeksData) {
        if (!map[w.weekNumber]) map[w.weekNumber] = [];
      }
    }
    return Object.entries(map)
      .map(([week, items]) => ({ week: Number(week), items }))
      .sort((a, b) => a.week - b.week);
  }, [resources, weeksData]);

  // --- Global progress ---
  const totalResources = resources?.length || 0;
  const completedResources = resources?.filter(r => r.isCompleted).length || 0;
  const globalPercent = totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0;

  // --- Format date range ---
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate + 'T12:00:00');
    const end = new Date(endDate + 'T12:00:00');
    const startStr = format(start, "d 'de' MMMM", { locale: es });
    const endStr = format(end, "d 'de' MMMM", { locale: es });
    return `${startStr} – ${endStr}`;
  };

  // --- Handlers ---
  const toggleWeek = (week) => {
    setExpandedWeeks(prev => {
      const next = new Set(prev);
      next.has(week) ? next.delete(week) : next.add(week);
      return next;
    });
  };

  const handleAddWeek = async () => {
    const maxWeek = weekGroups.length > 0 ? Math.max(...weekGroups.map(g => g.week)) : 0;
    const newWeek = maxWeek + 1;
    // Create the week entry with empty dates
    await db.weeks.add({
      subjectId: numericId,
      weekNumber: newWeek,
      startDate: '',
      endDate: '',
    });
    setExpandedWeeks(prev => new Set(prev).add(newWeek));
  };

  const handleUpdateWeekDates = async (weekNumber, field, value) => {
    const weekEntry = weeksMeta[weekNumber];
    if (weekEntry) {
      await db.weeks.update(weekEntry.id, { [field]: value });
    } else {
      // Create the week entry if it doesn't exist yet (legacy weeks)
      await db.weeks.add({
        subjectId: numericId,
        weekNumber,
        startDate: field === 'startDate' ? value : '',
        endDate: field === 'endDate' ? value : '',
      });
    }
  };

  const handleAddResource = async (week) => {
    const text = (newResourceTexts[week] || '').trim();
    if (!text) return;
    const link = (newResourceLinks[week] || '').trim();
    await db.resources.add({
      subjectId: numericId,
      title: text,
      isCompleted: false,
      dueDate: null,
      week,
      link: link || null,
    });
    setNewResourceTexts(prev => ({ ...prev, [week]: '' }));
    setNewResourceLinks(prev => ({ ...prev, [week]: '' }));
  };

  const toggleResource = async (id, current) => {
    await db.resources.update(id, { isCompleted: !current });
  };

  const handleDeleteResource = async (id) => {
    await db.resources.delete(id);
  };

  const handleRenameResource = async (id, newTitle) => {
    const trimmed = newTitle.trim();
    if (trimmed) {
      await db.resources.update(id, { title: trimmed });
    }
    setEditingId(null);
  };

  const handleDeleteWeek = async (week) => {
    const ids = resources?.filter(r => r.week === week).map(r => r.id) || [];
    await db.resources.bulkDelete(ids);
    // Also delete the week metadata
    const weekEntry = weeksMeta[week];
    if (weekEntry) {
      await db.weeks.delete(weekEntry.id);
    }
  };

  if (!subject) return null;

  return (
    <div className="subject-detail-page">
      {/* Header */}
      <div className="subject-detail-header">
        <button className="back-btn" onClick={() => navigate('/university')}>
          <ArrowLeft size={20} />
        </button>
        <div className="subject-detail-title">
          <h1>{subject.name}</h1>
          <p>Organizá tus recursos de lectura por semana</p>
        </div>
      </div>

      {/* Global Progress */}
      {totalResources > 0 && (
        <div className="card global-progress-card">
          <div className="global-progress-header">
            <h3>Progreso General</h3>
            <span>{completedResources} / {totalResources} completados</span>
          </div>
          <div className="progress-track">
            <div className={`progress-fill ${globalPercent === 100 ? 'complete' : ''}`} style={{ width: `${globalPercent}%` }}></div>
          </div>
          <div className="global-progress-pct">{globalPercent}%</div>
        </div>
      )}

      {/* Weeks */}
      <div className="weeks-header">
        <h2>Semanas</h2>
        <button className="btn btn-primary" onClick={handleAddWeek}>
          <Plus size={16} /> Agregar Semana
        </button>
      </div>

      {weekGroups.length > 0 ? (
        <div className="weeks-container">
          {weekGroups.map(({ week, items }) => {
            const isOpen = expandedWeeks.has(week);
            const done = items.filter(r => r.isCompleted).length;
            const total = items.length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const meta = weeksMeta[week];
            const dateRange = meta ? formatDateRange(meta.startDate, meta.endDate) : null;

            return (
              <div key={week} className="week-block">
                <div className="week-header" onClick={() => toggleWeek(week)}>
                  <div className="week-header-left">
                    <div className="week-title-group">
                      <h3>Semana {week}</h3>
                      {dateRange && (
                        <span className="week-date-range">
                          <Calendar size={12} />
                          {dateRange}
                        </span>
                      )}
                    </div>
                    <div className="week-progress-mini">
                      <div className="mini-track">
                        <div className={`mini-fill ${pct === 100 ? 'complete' : ''}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="week-header-right">
                    <span className="week-count">{done}/{total}</span>
                    <button className="week-delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteWeek(week); }} title="Eliminar semana">
                      <Trash2 size={14} />
                    </button>
                    {isOpen ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="week-content">
                    {/* Date range inputs */}
                    <div className="week-dates-row">
                      <label>Desde</label>
                      <input
                        type="date"
                        className="input week-date-input"
                        value={meta?.startDate || ''}
                        onChange={e => handleUpdateWeekDates(week, 'startDate', e.target.value)}
                        onClick={e => e.stopPropagation()}
                      />
                      <label>Hasta</label>
                      <input
                        type="date"
                        className="input week-date-input"
                        value={meta?.endDate || ''}
                        onChange={e => handleUpdateWeekDates(week, 'endDate', e.target.value)}
                        onClick={e => e.stopPropagation()}
                      />
                    </div>

                    {items.length > 0 ? (
                      items.map(res => (
                        <div key={res.id} className={`resource-item ${res.isCompleted ? 'completed' : ''}`}>
                          <button
                            className={`resource-checkbox ${res.isCompleted ? 'checked' : ''}`}
                            onClick={() => toggleResource(res.id, res.isCompleted)}
                          >
                            {res.isCompleted && <Check size={14} />}
                          </button>
                          {editingId === res.id ? (
                            <input
                              className="resource-edit-input"
                              defaultValue={res.title}
                              autoFocus
                              onBlur={e => handleRenameResource(res.id, e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleRenameResource(res.id, e.target.value);
                                if (e.key === 'Escape') setEditingId(null);
                              }}
                            />
                          ) : (
                            <span className="resource-item-title">{res.title}</span>
                          )}
                          {res.link && (
                            <a href={res.link} target="_blank" rel="noopener noreferrer" className="resource-link" onClick={e => e.stopPropagation()} title={res.link}>
                              <ExternalLink size={14} />
                            </a>
                          )}
                          <button className="resource-edit-btn" onClick={() => setEditingId(res.id)}>
                            <Pencil size={14} />
                          </button>
                          <button className="resource-delete" onClick={() => handleDeleteResource(res.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="week-empty">No hay recursos en esta semana.</div>
                    )}

                    {/* Inline add */}
                    <div className="add-resource-form">
                      <div className="add-resource-row">
                        <input
                          placeholder="Título del recurso..."
                          value={newResourceTexts[week] || ''}
                          onChange={e => setNewResourceTexts(prev => ({ ...prev, [week]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter') handleAddResource(week); }}
                        />
                        <button onClick={() => handleAddResource(week)}>
                          <Plus size={14} /> Agregar
                        </button>
                      </div>
                      <input
                        className="add-resource-link-input"
                        placeholder="Link (opcional): https://..."
                        value={newResourceLinks[week] || ''}
                        onChange={e => setNewResourceLinks(prev => ({ ...prev, [week]: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') handleAddResource(week); }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-weeks">
          Aún no hay semanas creadas. Hacé clic en "Agregar Semana" para empezar a organizar tus recursos.
        </div>
      )}
    </div>
  );
};
