import type { Locale } from '../i18n';

type Localized = Record<Locale, string>;

export type TimelineEntry = {
    period: string;
    title: Localized;
    summary: Localized;
};

export const timeline: TimelineEntry[] = [
    {
        period: '2025 — 2026',
        title: { fr: 'Freelance', en: 'Freelance', es: 'Freelance' },
        summary: {
            fr: 'Smartbiotic, My jam, Agent IA Web3. MedTech et mobile, cycle complet.',
            en: 'Smartbiotic, My jam, Web3 AI Agent. MedTech and mobile, full cycle.',
            es: 'Smartbiotic, My jam, Agente IA Web3. MedTech y móvil, ciclo completo.',
        },
    },
    {
        period: '2024 — 2025',
        title: { fr: 'PIANO Analytics', en: 'PIANO Analytics', es: 'PIANO Analytics' },
        summary: {
            fr: "Suite d'analytics à grande échelle. Angular, NGRX, NestJS, MongoDB, GraphQL.",
            en: 'Analytics suite at scale. Angular, NGRX, NestJS, MongoDB, GraphQL.',
            es: 'Suite de analítica a gran escala. Angular, NGRX, NestJS, MongoDB, GraphQL.',
        },
    },
    {
        period: '2022 — 2023',
        title: { fr: 'Premières missions', en: 'First missions', es: 'Primeras misiones' },
        summary: {
            fr: 'A-gO, Smartlife Coaching, Dorval, Fruggr.io. Dashboards et front-ends.',
            en: 'A-gO, Smartlife Coaching, Dorval, Fruggr.io. Dashboards and front-ends.',
            es: 'A-gO, Smartlife Coaching, Dorval, Fruggr.io. Dashboards y front-ends.',
        },
    },
    {
        period: '2020 — 2022',
        title: { fr: 'Plateformes santé', en: 'Health platforms', es: 'Plataformas de salud' },
        summary: {
            fr: 'CASDEN, MyPatientCare, MyHoppenVision, DrumVr. React, Vue, Node.',
            en: 'CASDEN, MyPatientCare, MyHoppenVision, DrumVr. React, Vue, Node.',
            es: 'CASDEN, MyPatientCare, MyHoppenVision, DrumVr. React, Vue, Node.',
        },
    },
    {
        period: '2018',
        title: { fr: 'CATS', en: 'CATS', es: 'CATS' },
        summary: {
            fr: 'Premier stage. Java, Spring, MySQL.',
            en: 'First internship. Java, Spring, MySQL.',
            es: 'Primeras prácticas. Java, Spring, MySQL.',
        },
    },
];
