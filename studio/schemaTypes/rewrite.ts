import {defineType} from 'sanity'

export default defineType({
  name: 'rewrite',
  title: 'Rewrite',
  type: 'document',
  preview: {
    select: {
      title: 'slug.current',
    },
  },
  fields: [
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    },
  ],
})
