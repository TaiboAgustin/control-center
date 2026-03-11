// One-time seed script for Programación III course data from Moodle
// Scraped from: https://virtual.grado.ungs.edu.ar/moodle/course/view.php?id=468

import { db } from './db';

const MOODLE_SEED_VERSION = 2;
const MOODLE_SEED_KEY = 'moodleSeedProg3';

const MOODLE_DATA = [
  {
    title: '9 de March - 15 de March (Complejidad computacional)',
    startDate: '2026-03-09',
    endDate: '2026-03-15',
    resources: [
      { title: 'Diapositivas: Presentación de la materia', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29333' },
      { title: 'Diapositivas: Complejidad computacional (repaso)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29334' },
      { title: 'Diapositivas: Divide and conquer', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29335' },
      { title: 'Lectura: The professional programmer', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29336' },
      { title: 'Tecnología: Introducción a WindowBuilder', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29337' },
      { title: 'Ejercicios: Complejidad computacional', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29338' },
      { title: 'Parte 1: Presentación de la materia', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90969' },
      { title: 'Parte 2: Repaso de complejidad computacional', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=91786' },
      { title: 'Parte 3: Divide and conquer (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=95408' },
      { title: 'Parte 4: Divide and conquer (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=95539' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=95540' },
      { title: 'Test de autoevaluación: Semana 1', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=92861' },
    ],
  },
  {
    title: '16 de March - 22 de March (Grafos y algoritmos sobre grafos)',
    startDate: '2026-03-16',
    endDate: '2026-03-22',
    resources: [
      { title: 'Lectura: Nombres I', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29326' },
      { title: 'Diapositivas: Grafos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29327' },
      { title: 'Tecnología: Control de versiones', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29296' },
      { title: 'Tecnología: MVC y MVP', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29330' },
      { title: 'Ejercicios: Grafos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29331' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90364' },
      { title: 'Parte 2: Introducción a la teoría de grafos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90365' },
      { title: 'Parte 3: Control de versiones (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=91784' },
      { title: 'Parte 4: Control de versiones (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90366' },
      { title: 'Parte 5: Implementación de la clase "Grafo" (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90368' },
      { title: 'Parte 6: Implementación de la clase "Grafo" (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90369' },
      { title: 'Parte 7: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90370' },
      { title: 'Test de autoevaluación: Semana 2', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=96021' },
    ],
  },
  {
    title: '23 de March - 29 de March (Testing unitario)',
    startDate: '2026-03-23',
    endDate: '2026-03-29',
    resources: [
      { title: 'Lectura: Nombres II', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29295' },
      { title: 'Diapositivas: Testing unitario', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29274' },
      { title: 'Lectura: Introducción al testing unitario', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29275' },
      { title: 'Ejercicios: Testing unitario', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29277' },
      { title: 'Link: Plugin EclEmma para Eclipse', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=29278' },
      { title: 'Link: Cubrimiento en los tests', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=29279' },
      { title: 'Tecnología: Técnicas con WindowBuilder', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29298' },
      { title: 'Link: 10 user interface design fundamentals', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=29299' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90373' },
      { title: 'Parte 2: Testing unitario (1/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90374' },
      { title: 'Parte 3: Testing unitario (2/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90375' },
      { title: 'Parte 4: Testing unitario (3/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90376' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=97598' },
      { title: 'Test de autoevaluación: Semana 3', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=97004' },
    ],
  },
  {
    title: '30 de March - 5 de April (Grafos y algoritmos sobre grafos)',
    startDate: '2026-03-30',
    endDate: '2026-04-05',
    resources: [
      { title: 'Lectura: Nombres III', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29273' },
      { title: 'Diapositivas: Recorridos de grafos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29328' },
      { title: 'Ejercicios: Algoritmos sobre grafos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29297' },
      { title: 'Tecnología: BigDecimal', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29280' },
      { title: 'Lectura: Uso de float y double', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29281' },
      { title: 'Link: Punto flotante', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=29282' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90378' },
      { title: 'Parte 2: Recorridos de grafos (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90379' },
      { title: 'Parte 3: Recorridos de grafos (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90380' },
      { title: 'Parte 4: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90381' },
      { title: 'Test de autoevaluación: Semana 4', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=103481' },
    ],
  },
  {
    title: '6 de April - 12 de April (Problema de árbol generador mínimo)',
    startDate: '2026-04-06',
    endDate: '2026-04-12',
    resources: [
      { title: 'Lectura: Formato vertical', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29267' },
      { title: 'Diapositivas: Árbol generador mínimo', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29268' },
      { title: 'Instancia: Red de alta tensión', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/page/view.php?id=29269' },
      { title: 'Ejercicios: Árbol generador mínimo', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29270' },
      { title: 'Tecnología: Algoritmos mal condicionados', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29271' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90383' },
      { title: 'Parte 2: Árbol generador mínimo (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90384' },
      { title: 'Parte 3: Árbol generador mínimo (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90385' },
      { title: 'Parte 4: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90386' },
      { title: 'Test de autoevaluación: Semana 5', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=105079' },
    ],
  },
  {
    title: '13 de April - 19 de April (Problemas de flujo máximo)',
    startDate: '2026-04-13',
    endDate: '2026-04-19',
    resources: [
      { title: 'Lectura: Distancia vertical', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29319' },
      { title: 'Diapositivas: Problemas de flujo máximo', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=36373' },
      { title: 'Link: JMapViewer', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=29323' },
      { title: 'Biblioteca: JMapViewer 2.10', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=50608' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90388' },
      { title: 'Parte 2: Flujo máximo (1/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90389' },
      { title: 'Parte 3: Flujo máximo (2/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90390' },
      { title: 'Parte 4: Flujo máximo (3/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90391' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90395' },
      { title: 'Test de autoevaluación: Semana 6', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=106207' },
    ],
  },
  {
    title: '20 de April - 26 de April (Problema de camino mínimo)',
    startDate: '2026-04-20',
    endDate: '2026-04-26',
    resources: [
      { title: 'Lectura: Comentarios', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29340' },
      { title: 'Diapositivas: Camino mínimo', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29320' },
      { title: 'Ejercicios: Camino mínimo', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29321' },
      { title: 'Ejercicios: Archivos y serialización', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29353' },
      { title: 'Tecnología: Serialización', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29352' },
      { title: 'Biblioteca: GSON', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29354' },
      { title: 'Tecnología: Manejo de archivos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29351' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90397' },
      { title: 'Parte 2: Camino mínimo (1/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=105997' },
      { title: 'Parte 3: Camino mínimo (2/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=106013' },
      { title: 'Parte 4: Camino mínimo (3/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90398' },
      { title: 'Parte 5: Momento tecnológico (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90399' },
      { title: 'Parte 6: Momento tecnológico (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90400' },
      { title: 'Test de autoevaluación: Semana 7', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=107764' },
    ],
  },
  {
    title: '27 de April - 3 de May (Fuerza bruta y backtracking)',
    startDate: '2026-04-27',
    endDate: '2026-05-03',
    resources: [
      { title: 'Lectura: Funciones I', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29348' },
      { title: 'Diapositivas: Fuerza bruta', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=38205' },
      { title: 'Ejercicios: Fuerza bruta', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29343' },
      { title: 'Diapositivas: Backtracking', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29349' },
      { title: 'Tecnología: Threads', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29344' },
      { title: 'Tecnología: SwingWorker', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29345' },
      { title: 'Ejercicios: Backtracking', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29355' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90403' },
      { title: 'Parte 2: Fuerza bruta (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90404' },
      { title: 'Parte 3: Fuerza bruta (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90405' },
      { title: 'Parte 4: Backtracking (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90406' },
      { title: 'Parte 5: Backtracking (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90407' },
      { title: 'Parte 6: Momento tecnológico (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90408' },
      { title: 'Parte 7: Momento tecnológico (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90410' },
      { title: 'Test de autoevaluación: Semana 8', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=109226' },
    ],
  },
  {
    title: '4 de May - 10 de May (Problemas NP-completos)',
    startDate: '2026-05-04',
    endDate: '2026-05-10',
    resources: [
      { title: 'Lectura: Funciones II', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29257' },
      { title: 'Diapositivas: Introducción a la teoría de NP-completitud', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29258' },
      { title: 'Ejercicios: NP-completitud', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29264' },
      { title: 'Tecnología: Sockets en Java', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29346' },
      { title: 'Lectura: Sockets', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=57074' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90415' },
      { title: 'Parte 2: Introducción a la teoría de NP-completitud (1/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90416' },
      { title: 'Parte 3: Introducción a la teoría de NP-completitud (2/2)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90417' },
      { title: 'Parte 4: Problemas NP-completos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90419' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90420' },
      { title: 'Test de autoevaluación: Semana 9', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=110793' },
    ],
  },
  {
    title: '11 de May - 17 de May (Heurísticas y algoritmos golosos)',
    startDate: '2026-05-11',
    endDate: '2026-05-17',
    resources: [
      { title: 'Lectura: Funciones III', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29284' },
      { title: 'Diapositivas: Algoritmos golosos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29285' },
      { title: 'Tecnología: Clases anónimas', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29287' },
      { title: 'Ejercicios: Heurísticas y algoritmos golosos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29288' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90422' },
      { title: 'Parte 2: Algoritmos golosos (1/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90423' },
      { title: 'Parte 3: Algoritmos golosos (2/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90424' },
      { title: 'Parte 4: Algoritmos golosos (3/3)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90425' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90426' },
      { title: 'Test de autoevaluación: Semana 10', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=111901' },
    ],
  },
  {
    title: '18 de May - 24 de May (Algoritmos genéticos)',
    startDate: '2026-05-18',
    endDate: '2026-05-24',
    resources: [
      { title: 'Lectura: Clases pequeñas', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29290' },
      { title: 'Diapositivas: Algoritmos genéticos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29291' },
      { title: 'Tecnología: Expresiones lambda', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29292' },
      { title: 'Ejercicios: Buenas prácticas de programación', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29293' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90428' },
      { title: 'Parte 2: Algoritmos genéticos (1/4)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90429' },
      { title: 'Parte 3: Algoritmos genéticos (2/4)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90430' },
      { title: 'Parte 4: Algoritmos genéticos (3/4)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90431' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90433' },
      { title: 'Test de autoevaluación: Semana 11', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=112785' },
    ],
  },
  {
    title: '25 de May - 31 de May (Algoritmos evolutivos)',
    startDate: '2026-05-25',
    endDate: '2026-05-31',
    resources: [
      { title: 'Lectura: Código de terceros', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29302' },
      { title: 'Diapositivas: Algoritmos evolutivos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29303' },
      { title: 'Biblioteca: JFreeChart 1.0.14', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29304' },
      { title: 'Biblioteca: JCommon 1.0.17', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29305' },
      { title: 'Página oficial de JFreeChart', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=29306' },
      { title: 'Ejercicios: Algoritmos genéticos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29307' },
      { title: 'Tecnología: Streams', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29308' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90435' },
      { title: 'Parte 2: Algoritmos genéticos (4/4)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90436' },
      { title: 'Parte 3: Introducción a JFreeChart', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90437' },
      { title: 'Parte 4: Algoritmos evolutivos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90438' },
      { title: 'Parte 5: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90439' },
    ],
  },
  {
    title: '1 de June - 7 de June (Epílogo)',
    startDate: '2026-06-01',
    endDate: '2026-06-07',
    resources: [
      { title: 'Tecnología: Expresiones regulares', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29260' },
      { title: 'Software: Simulador de Autómatas Finitos - DFA', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29262' },
      { title: 'Ejercicios: Expresiones regulares', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29265' },
      { title: 'Ejercicios: Lecturas', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29312' },
      { title: 'Ejercicios de parciales viejos', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29314' },
      { title: 'Diapositivas: Comentarios finales', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29315' },
      { title: 'Parte 1: Lectura', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90441' },
      { title: 'Parte 2: Momento tecnológico', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90442' },
      { title: 'Parte 3: Comentarios finales', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=90443' },
    ],
  },
  {
    title: '8 de June - 14 de June (Simulacro)',
    startDate: '2026-06-08',
    endDate: '2026-06-14',
    resources: [
      { title: 'Simulacro de parcial', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/resource/view.php?id=29317' },
      { title: 'Simulacro de Parcial (formulario Google)', link: 'https://virtual.grado.ungs.edu.ar/moodle/mod/url/view.php?id=248264' },
    ],
  },
  {
    title: '15 de June - 21 de June (Parcial)',
    startDate: '2026-06-15',
    endDate: '2026-06-21',
    resources: [],
  },
  {
    title: '22 de June - 28 de June (Recuperatorio)',
    startDate: '2026-06-22',
    endDate: '2026-06-28',
    resources: [],
  },
];

let _seeding = null;

export function seedMoodleProg3() {
  if (!_seeding) {
    _seeding = _doSeedMoodle();
  }
  return _seeding;
}

async function _doSeedMoodle() {
  const stored = localStorage.getItem(MOODLE_SEED_KEY);
  if (stored && Number(stored) >= MOODLE_SEED_VERSION) return;

  // Find the "Programación III" subject
  const subject = await db.subjects.where('name').equals('Programación III').first();
  if (!subject) {
    console.warn('seedMoodleProg3: subject "Programación III" not found');
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

    // Create week entry
    await db.weeks.add({
      subjectId,
      weekNumber,
      startDate: section.startDate,
      endDate: section.endDate,
    });

    // Create resources
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
  console.log(`seedMoodleProg3: seeded ${MOODLE_DATA.length} weeks for Programación III`);
}
