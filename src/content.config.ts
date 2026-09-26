import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ fr: z.string(), en: z.string(), es: z.string() });
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const projects = defineCollection({
    loader: file('src/data/projects.json'),
    schema: z.object({
        order: z.number().int(),
        startDate: isoDate,
        endDate: isoDate.nullable(),
        location: z.string(),
        technologies: z.array(z.string()),
        link: z.url().optional(),
        name: localized,
        role: localized,
        company: localized,
        description: localized,
    }),
});

export const collections = { projects };
