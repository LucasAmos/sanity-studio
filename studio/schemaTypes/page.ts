import {defineField, defineType} from 'sanity'



export default defineType({
  name: 'page',
  title: 'Page',
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
  ],
})

/**
 * 
 * 
 * *[_type == "childpage" && slug.current == "child-2-url-segment"]{
  slug,
  title,
  parent -> {
  slug,
  title,
  parent -> {
  slug,
  title
  }
}

}
 * 
 */

/**
 * Footer should have option to hide breadcrumbs, leave footer in layout and display
 * breadcrumbs at the bottom of each page
 */

