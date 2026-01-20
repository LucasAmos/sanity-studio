import {defineField, defineType, ValidationError} from 'sanity'
import groq from 'groq'
export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'alias',
      title: 'Alias',
      type: 'reference',
      to: [{type: 'alias'}],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          console.log('***1', value)
          console.log('***2', context)

          if (!value || !value._ref) {
            console.log('No alias selected, so no validation needed')
            return true
          }
          const client = context.getClient({apiVersion: '2021-03-25'})
          console.log('value._ref: ', value._ref)
          const res = await client.fetch(
            groq`*[_type != "alias" && references($aliasId)]{...}`,
            {
              aliasId: value._ref,
            },
            {
              perspective: 'published',
            },
          )
          console.log('**res', res)

          if (res[0]?._id === context.document?._id) {
            // if the reference of document linked to the alias is the same as
            // this document then that is allowed
            return true
          }

          // this can probably be removed and just return false

          if (res.length > 0) {
            return {message: 'Slug can only be use once'} as ValidationError
          }
          return true
        }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finishDate',
      title: 'Finish date',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'estimated',
      title: 'Estimated date',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',
    }),
    defineField({
      name: 'audiobook',
      title: 'Audiobook?',
      type: 'boolean',
    }),
  ],
})
