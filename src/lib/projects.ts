import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type ProjectEntry = CollectionEntry<'projects'>;

/** Projects sorted as in the data file (most recent first). */
export async function getProjects(): Promise<ProjectEntry[]> {
    const projects = await getCollection('projects');
    return projects.sort((a, b) => a.data.order - b.data.order);
}

export type LocalizedProject = ReturnType<typeof localizeProject>;

export function localizeProject({ id, data }: ProjectEntry, lang: Locale) {
    return {
        id,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        technologies: data.technologies,
        link: data.link,
        name: data.name[lang],
        role: data.role[lang],
        company: data.company[lang],
        description: data.description[lang],
    };
}

/** First and last year covered by the projects. */
export function yearRange(projects: ProjectEntry[]): { from: number; to: number } {
    const currentYear = new Date().getFullYear();
    const starts = projects.map((p) => Number(p.data.startDate.slice(0, 4)));
    const ends = projects.map((p) => (p.data.endDate ? Number(p.data.endDate.slice(0, 4)) : currentYear));
    return { from: Math.min(...starts), to: Math.max(...ends) };
}
