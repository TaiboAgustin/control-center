import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, X, Trash2 } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import './CalendarPage.css';

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', startTime: '09:00', endTime: '10:00', section: 'Trabajo', description: '' });

  const events = useLiveQuery(
    () => db.events.where('date').equals(format(selectedDate, 'yyyy-MM-dd')).toArray(),
    [selectedDate]
  );

  const handlePrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await db.events.add({
      title: form.title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime: form.startTime,
      endTime: form.endTime,
      section: form.section,
      description: form.description,
    });
    setForm({ title: '', startTime: '09:00', endTime: '10:00', section: 'Trabajo', description: '' });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await db.events.delete(id);
  };

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <div>
          <h1>Agenda</h1>
          <p>Gestiona tu tiempo y eventos diarios</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X size={16} /><span>Cancelar</span></> : <><Plus size={16} /><span>Agregar Evento</span></>}
        </button>
      </header>

      {showForm && (
        <form className="event-form card" onSubmit={handleSubmit}>
          <input className="input" placeholder="Título del evento" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} autoFocus />
          <div className="form-row">
            <div className="form-group">
              <label>Inicio</label>
              <input type="time" className="input" value={form.startTime} onChange={e => setForm(p => ({ ...p, startTime: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Fin</label>
              <input type="time" className="input" value={form.endTime} onChange={e => setForm(p => ({ ...p, endTime: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Sección</label>
              <select className="input" value={form.section} onChange={e => setForm(p => ({ ...p, section: e.target.value }))}>
                <option value="Trabajo">Trabajo</option>
                <option value="Entrenamiento">Entrenamiento</option>
                <option value="Universidad">Universidad</option>
              </select>
            </div>
          </div>
          <textarea className="input" placeholder="Descripción (opcional)" rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}></textarea>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Guardar Evento</button>
        </form>
      )}

      <div className="calendar-controls card">
        <button className="btn btn-ghost" onClick={handlePrevDay}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="current-date">
          {format(selectedDate, "eeee, d 'de' MMMM, yyyy", { locale: es })}
        </h2>
        <button className="btn btn-ghost" onClick={handleNextDay}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="agenda-view card">
        <div className="events-column">
          {events?.length > 0 ? (
            events.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(event => (
              <div key={event.id} className="event-card hover-lift">
                <div className="event-time">
                  {event.startTime} – {event.endTime}
                </div>
                <div className="event-details">
                  <div>
                    <h3>{event.title}</h3>
                    {event.description && <p className="event-desc">{event.description}</p>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`event-badge badge-${event.section.toLowerCase()}`}>
                      {event.section}
                    </span>
                    <button className="btn btn-ghost" style={{ padding: '4px', color: 'var(--text-muted)' }} onClick={() => handleDelete(event.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">No hay eventos programados para este día.</div>
          )}
        </div>
      </div>
    </div>
  );
};
