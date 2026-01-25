import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'alias',
  title: 'Alias',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
