import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    lang: z.enum(['pt', 'en']),
  }),
});

const projetos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number().optional(),
    type: z.enum(['dev', 'mix']),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    demo: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
    lang: z.enum(['pt', 'en']),
  }),
});

export const collections = { blog, projetos };
