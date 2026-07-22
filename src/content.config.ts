import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    image: z.string().optional(),
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    description: z.string().optional(),
  })
});

export const collections = { blog, pages };
