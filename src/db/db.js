import Dexie from 'dexie';

export const db = new Dexie('ControlCenterDB');

db.version(5).stores({
  events: '++id, title, date, startTime, endTime, section, description',
  habits: '++id, title, section, frequency, currentStreak, [section+title]',
  // University-specific tables
  subjects: '++id, name, semester, status',
  schedules: '++id, subjectId, dayOfWeek, startTime, endTime',
  resources: '++id, subjectId, title, isCompleted, dueDate, week, [subjectId+week]',
  weeks: '++id, subjectId, weekNumber, startDate, endDate, [subjectId+weekNumber]',
});

// Plan de estudios oficial — Licenciatura en Sistemas (UNGS – Res. CS Nº7016/18)
// Organizado por cuatrimestre sugerido del itinerario
export const STUDY_PLAN = [
  { semester: 1, subjects: [
    'Taller Inicial Común: Taller de Lectura y Escritura',
    'Taller Inicial Orientado: Ciencias Exactas',
    'Taller Inicial Obligatorio del Área de Matemática',
  ]},
  { semester: 2, subjects: [
    'Introducción a la Programación',
    'Introducción a la Matemática',
    'Taller de Lectura y Escritura en las Disciplinas',
    'Problemas Socioeconómicos Contemporáneos',
  ]},
  { semester: 3, subjects: [
    'Programación I',
    'Lógica y Teoría de Números',
    'Organización del Computador I',
  ]},
  { semester: 4, subjects: [
    'Programación II',
    'Álgebra Lineal',
    'Sistemas Operativos y Redes I',
  ]},
  { semester: 5, subjects: [
    'Programación III',
    'Cálculo para Computación',
  ]},
  { semester: 6, subjects: [
    'Bases de Datos I',
    'Ingeniería de Software I',
    'Especificaciones y Verificación de Software',
    'Matemática Discreta',
  ]},
  { semester: 7, subjects: [
    'Proyecto Profesional I',
    'Teoría de la Computación',
    'Organización del Computador II',
    'Ingeniería de Software II',
  ]},
  { semester: 8, subjects: [
    'Proyecto Profesional II',
    'Bases de Datos II',
    'Informática y Sociedad',
    'Probabilidad y Estadística',
  ]},
  { semester: 9, subjects: [
    'Práctica Profesional Supervisada',
    'Modelado y Optimización',
    'Sistemas Operativos y Redes II',
  ]},
  { semester: 10, subjects: [
    'Taller de Tesina de Licenciatura',
    'Gestión de Proyectos',
    'Laboratorio Interdisciplinario',
  ]},
  // Otros requisitos académicos
  { semester: 0, label: 'Otros Requisitos', subjects: [
    'Taller de Utilitarios',
    'Inglés Lectocomprensión I',
    'Inglés Lectocomprensión II',
    'Inglés Lectocomprensión III',
  ]},
];

export const TOTAL_SUBJECTS = STUDY_PLAN.reduce((sum, s) => sum + s.subjects.length, 0);

// Seed (or re-seed) subjects into the DB
const PLAN_VERSION = 3;
let _seeding = null; // prevent concurrent calls (React StrictMode runs effects twice)

export function seedStudyPlan() {
  if (!_seeding) {
    _seeding = _doSeed();
  }
  return _seeding;
}

async function _doSeed() {
  const storedVersion = localStorage.getItem('planVersion');
  if (storedVersion && Number(storedVersion) >= PLAN_VERSION) return;

  // Clear old subjects and re-seed
  await db.subjects.clear();
  const entries = [];
  for (const sem of STUDY_PLAN) {
    for (const name of sem.subjects) {
      entries.push({ name, semester: sem.semester, status: 'pending' });
    }
  }
  await db.subjects.bulkAdd(entries);
  localStorage.setItem('planVersion', String(PLAN_VERSION));
}

