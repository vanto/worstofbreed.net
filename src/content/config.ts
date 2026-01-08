import { defineCollection, z } from 'astro:content';
import { date } from 'astro:schema';

const patternsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Architecture', 'Process', 'Legacy', 'Culture', 'AI', 'Code', 'Security', 'Infra', 'Frontend']),
    imagePlaceholder: z.string().optional(),
    stats: z.object({
      latency: z.number().min(0).max(100),
      pain: z.number().min(0).max(100),
      maintainability: z.number().min(0).max(100),
      resumeValue: z.string(),
    }),
    specialAbility: z.object({
      name: z.string(),
      description: z.string(),
    }),
    quote: z.string(),
    dateAdded: date(),
    tags: z.array(z.string()),
    contributor: z.string().optional(),
  }),
});

const blipsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    quadrant: z.number().min(1).max(4),
    status: z.enum(['BURN', 'CONTAINMENT', 'RESUME', 'DESPAIR']),
    x: z.number(),
    y: z.number(),
    dateAdded: date(),
    edition: z.string(),
    contributor: z.string().optional(),
  }),
});

const testimonialsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
  }),
});

export const collections = {
  'patterns': patternsCollection,
  'blips': blipsCollection,
  'testimonials': testimonialsCollection,
};