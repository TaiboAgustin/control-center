import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, TOTAL_SUBJECTS } from '../db/db';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie } from 'recharts';
import { CalendarDays, GraduationCap, Activity } from 'lucide-react';

export const Dashboard = () => {
  const habits = useLiveQuery(() => db.habits.toArray());
  const events = useLiveQuery(() => db.events.toArray());
  const subjects = useLiveQuery(() => db.subjects.toArray());

  const totalHabits = habits?.length || 0;
  const totalEvents = events?.length || 0;
  const approvedSubjects = subjects?.filter(s => s.status === 'approved').length || 0;
  const inProgressSubjects = subjects?.filter(s => s.status === 'in_progress').length || 0;

  const habitsBySection = habits?.reduce((acc, h) => {
    acc[h.section] = (acc[h.section] || 0) + 1;
    return acc;
  }, {}) || {};

  const chartData = [
    { name: 'Trabajo', count: habitsBySection['Trabajo'] || 0, color: '#3b82f6' },
    { name: 'Entrenam.', count: habitsBySection['Entrenamiento'] || 0, color: '#10b981' },
  ];

  const uniData = [
    { name: 'Aprobadas', value: approvedSubjects, color: '#10b981' },
    { name: 'Cursando', value: inProgressSubjects, color: '#3b82f6' },
    { name: 'Pendientes', value: TOTAL_SUBJECTS - approvedSubjects - inProgressSubjects, color: '#2e3340' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-lg)' }}>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{payload[0].name || label}</p>
          <p style={{ margin: 0, color: payload[0].payload?.color || 'var(--text-secondary)' }}>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Resumen general de tu actividad y progreso.</p>
      </header>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '0.875rem', borderRadius: '50%', color: '#3b82f6' }}>
            <Activity size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Hábitos</h3>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{totalHabits}</p>
          </div>
        </div>
        
        <div className="card hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', padding: '0.875rem', borderRadius: '50%', color: '#8b5cf6' }}>
            <CalendarDays size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Eventos</h3>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{totalEvents}</p>
          </div>
        </div>

        <div className="card hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.875rem', borderRadius: '50%', color: '#10b981' }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Materias Aprobadas</h3>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{approvedSubjects}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}> / {TOTAL_SUBJECTS}</span></p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Hábitos por Sección</h3>
          <div style={{ height: '280px', width: '100%' }}>
            {totalHabits > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={50}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Sin hábitos registrados.
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Avance Universitario</h3>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={uniData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {uniData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '-0.5rem' }}>
              {uniData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: d.color }}></div>
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
