import {defineField, defineType} from 'sanity'
import groq from 'groq'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
      name: 'rewrite',
      title: 'Rewrite',
      type: 'reference',
      to: [{type: 'rewrite'}],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          console.log('***1', value)
          console.log('***2', context)

          if (!value || !value._ref) {
            console.log('No rewrite selected, so no validation needed')
            return true
          }
          const client = context.getClient({apiVersion: '2021-03-25'})
          console.log('value._ref: ', value._ref)
          const res = await client.fetch(
            groq`*[_type != "rewrite" && references($rewriteId)]{...}`,
            {
              rewriteId: value._ref,
            },
            {
              perspective: 'published',
            },
          )
          console.log('**res', res)

          if (res[0]?._id === context.document?._id) {
            // if the reference of document linked to the rewrite is the same as
            // this document then that is allowed
            return true
          }

          // this can probably be removed and just return false

          if (res.length > 0) {
            return {message: 'Slug can only be use once'}
          }
          return true
        }),
    }),
  ],
})
