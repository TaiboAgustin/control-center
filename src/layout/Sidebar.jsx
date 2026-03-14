import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Dumbbell, GraduationCap, CalendarDays, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/calendar', icon: CalendarDays, label: 'Agenda' },
  { path: '/work', icon: Briefcase, label: 'Trabajo' },
  { path: '/training', icon: Dumbbell, label: 'Entrenamiento' },
  { path: '/university', icon: GraduationCap, label: 'Universidad' },
];

export const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        {!collapsed && <h2>Control Center</h2>}
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : ''}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        {!collapsed && <p>Stay focused.</p>}
        <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expandir' : 'Comprimir'}>
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
    </aside>
  );
};
