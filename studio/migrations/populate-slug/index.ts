import {defineMigration, patch, at, set} from 'sanity/migrate'

/**
 * this migration will set `Default title` on all documents that are missing a title
 * and make `true` the default value for the `enabled` field
 */
export default defineMigration({
  title: 'populate slug',
  documentTypes: ['author'],

  async *migrate(documents, context) {
    for await (const document of documents()) {
      const slug = document.name
        ?.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

      yield patch(document._id, [at('slug', set({current: slug}))])
    }
  },
})
