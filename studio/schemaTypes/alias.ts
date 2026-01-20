import {defineType} from 'sanity'

export default defineType({
  name: 'alias',
  title: 'Alias',
  type: 'document',
  fields: [
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    },
  ],
})
