// One-time seed script for Sistemas Operativos y Redes I course data from Moodle
// Scraped from: https://virtual.grado.ungs.edu.ar/moodle/course/view.php?id=243

import { db } from './db';

const MOODLE_SEED_VERSION = 1;
const MOODLE_SEED_KEY = 'moodleSeedSOyR';

const MOODLE_DATA = [
  {
    title: '1 - SO: Introducción',
    startDate: '2026-03-09',
    endDate: '2026-03-15',
    resources: [
      { title: 'Presentación - Introducción a la materia', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=166470' },
      { title: 'Presentación - Introducción a Sistemas Operativos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=251860' },
      { title: 'Apunte Introducción a Sistemas Operativos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=166917' },
      { title: 'Presentación de la Clase: Taller de GNU/Linux', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=166475' },
      { title: 'Video: Intro a SO parte 1', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=180720' },
      { title: 'Video: Intro a SO parte 2', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=180804' },
      { title: 'Entrada de la Wiki (CPU Física, lógica, core, thread)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=166488' },
      { title: 'Entrada de la Wiki (¿Qué hace un SO?)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=166474' },
      { title: 'VIDEO: Linux manejo de consola', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=166476' },
      { title: 'Práctica de Shell', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/page/view.php?id=166483' },
      { title: 'Sistemas Operativos y Shell (Lista de verificación)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/checklist/view.php?id=166489' },
      { title: 'Emulador de Terminal Linux Online', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=216174' },
    ],
  },
  {
    title: '1b - Scripts Linux - Lenguaje C',
    startDate: '2026-03-16',
    endDate: '2026-03-22',
    resources: [
      { title: 'Presentación Shell', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=166912' },
      { title: 'Video Shell y Scripts', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=166905' },
      { title: 'Video: Introducción al lenguaje C', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=166899' },
    ],
  },
];

let _seeding = null;

export function seedMoodleSOyR() {
  if (!_seeding) {
    _seeding = _doSeedMoodle();
  }
  return _seeding;
}

async function _doSeedMoodle() {
  const stored = localStorage.getItem(MOODLE_SEED_KEY);
  if (stored && Number(stored) >= MOODLE_SEED_VERSION) return;

  // Find the "Sistemas Operativos y Redes I" subject
  const subject = await db.subjects.where('name').equals('Sistemas Operativos y Redes I').first();
  if (!subject) {
    console.warn('seedMoodleSOyR: subject "Sistemas Operativos y Redes I" not found');
    return;
  }

  const subjectId = subject.id;

  // Clear existing resources and weeks for this subject
  const existingResources = await db.resources.where('subjectId').equals(subjectId).toArray();
  if (existingResources.length > 0) {
    await db.resources.bulkDelete(existingResources.map(r => r.id));
  }
  const existingWeeks = await db.weeks.where('subjectId').equals(subjectId).toArray();
  if (existingWeeks.length > 0) {
    await db.weeks.bulkDelete(existingWeeks.map(w => w.id));
  }

  // Insert weeks and resources
  for (let i = 0; i < MOODLE_DATA.length; i++) {
    const section = MOODLE_DATA[i];
    const weekNumber = i + 1;

    await db.weeks.add({
      subjectId,
      weekNumber,
      startDate: section.startDate,
      endDate: section.endDate,
    });

    for (const res of section.resources) {
      await db.resources.add({
        subjectId,
        title: res.title,
        isCompleted: false,
        dueDate: null,
        week: weekNumber,
        link: res.link,
      });
    }
  }

  // Set subject status to in_progress
  await db.subjects.update(subjectId, { status: 'in_progress' });

  localStorage.setItem(MOODLE_SEED_KEY, String(MOODLE_SEED_VERSION));
  console.log(`seedMoodleSOyR: seeded ${MOODLE_DATA.length} weeks for Sistemas Operativos y Redes I`);
}
