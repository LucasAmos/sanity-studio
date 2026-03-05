import {defineField, defineType} from 'sanity'



export default defineType({
  name: 'childpage',
  title: 'Child Page',
  type: 'document',
  fields: [
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    },
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [{type: 'page'}, {type: 'childpage'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
