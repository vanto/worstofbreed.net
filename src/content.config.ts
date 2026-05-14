import { defineCollection, reference } from 'astro:content';
import { date } from 'astro:schema';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const patternsCollection = defineCollection({
  loader: glob({ base: './src/content/patterns', pattern: '**/*.{md,mdx}' }),
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
    relatedPatterns: z.array(reference('patterns')).optional(),
    relatedBlips: z.array(reference('blips')).optional(),
  }),
});

const blipsCollection = defineCollection({
  loader: glob({ base: './src/content/blips', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    quadrant: z.number().min(1).max(4),
    status: z.enum(['BURN', 'CONTAINMENT', 'RESUME', 'DESPAIR']),
    x: z.number(),
    y: z.number(),
    dateAdded: date(),
    edition: z.string(),
    contributor: z.string().optional(),
    relatedPatterns: z.array(reference('patterns')).optional(),
    relatedBlips: z.array(reference('blips')).optional(),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '*.json' }),
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