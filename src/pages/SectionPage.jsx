import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { Plus, Trash2, X } from 'lucide-react';

export const SectionPage = ({ section }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', frequency: 'Diario' });

  const habits = useLiveQuery(
    () => db.habits.where('section').equals(section).toArray(),
    [section]
  );

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await db.habits.add({
      title: form.title,
      section,
      frequency: form.frequency,
      currentStreak: 0,
    });
    setForm({ title: '', frequency: 'Diario' });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await db.habits.delete(id);
  };

  const getSectionColor = (sec) => {
    const colors = {
      'Trabajo': '#3b82f6',
      'Entrenamiento': '#10b981',
    };
    return colors[sec] || 'var(--accent-base)';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'flex-end', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', color: getSectionColor(section), letterSpacing: '-0.04em', marginBottom: '0.25rem' }}>
            {section}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gestiona tus hábitos de {section}</p>
        </div>
        <button className="btn" style={{ backgroundColor: getSectionColor(section), color: 'white' }} onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X size={16} /> Cancelar</> : <><Plus size={16} /> Agregar Hábito</>}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleAddHabit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', animation: 'fadeSlideIn 0.2s ease' }}>
          <input className="input" placeholder="Nombre del hábito" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} autoFocus />
          <select className="input" value={form.frequency} onChange={e => setForm(p => ({ ...p, frequency: e.target.value }))}>
            <option value="Diario">Diario</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensual">Mensual</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Guardar Hábito</button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {habits?.length > 0 ? (
          habits.map(habit => (
            <div key={habit.id} className="card hover-lift" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.25rem' }}>{habit.title}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-primary)', padding: '2px 8px', borderRadius: '4px' }}>
                  {habit.frequency}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: getSectionColor(section) }}>
                    {habit.currentStreak} 🔥
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Racha
                  </div>
                </div>
                <button className="btn btn-ghost" style={{ padding: '4px', color: 'var(--text-muted)' }} onClick={() => handleDelete(habit.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)', border: '1px dashed var(--border-color)' }}>
            No hay hábitos en esta sección. Crea uno para comenzar.
          </div>
        )}
      </div>
    </div>
  );
};
