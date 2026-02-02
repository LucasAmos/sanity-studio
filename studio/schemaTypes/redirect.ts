import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((string) => (string?.startsWith('/') ? true : 'Must begin with /')),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((string) => (string?.startsWith('/') ? true : 'Must begin with /')),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'number',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Permanent', value: 301},
          {title: 'Temporary', value: 302},
        ],
      },
    }),
  ],
})
