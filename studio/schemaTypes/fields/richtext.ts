import {defineField, defineArrayMember} from 'sanity'

export const richTextField = defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
        of: [
    defineArrayMember({
      type: 'block'
    }),
  ],
      validation: (rule) => rule.required(),
    })