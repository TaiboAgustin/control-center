import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Dumbbell, GraduationCap, CalendarDays } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/calendar', icon: CalendarDays, label: 'Agenda' },
  { path: '/work', icon: Briefcase, label: 'Trabajo' },
  { path: '/training', icon: Dumbbell, label: 'Entrenamiento' },
  { path: '/university', icon: GraduationCap, label: 'Universidad' },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        <h2>Control Center</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>Stay focused.</p>
      </div>
    </aside>
  );
};
