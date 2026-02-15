import {defineField, defineType, StringRule} from 'sanity'
import groq from 'groq'

export const uniqueValidation = (rule: StringRule) => {
  return rule.custom(async (value, context) => {
    const client = context.getClient({apiVersion: '2021-03-25'})
    const type = context.document!._type

    const res = await client.fetch(
      groq`*[ _type == $type && name == $name] {_id}`,
      {
        type: type,
        name: value,
      },
      {
        perspective: 'published',
      },
    )

    if (res[0]?._id === context.document?._id) {
      // if the reference of document linked to the rewrite is the same as
      // this document then that is allowed
      return true
    }
    if (res.length === 0) {
      return true
    }
    return {message: 'An author already exists with that name'}
  })
}

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: uniqueValidation,
    }),
  ],
})
