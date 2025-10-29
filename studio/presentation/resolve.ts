import {defineLocations, PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    book: defineLocations({
      select: {
        title: 'title',
      },
      resolve: (doc) => ({
        locations: [{title: doc?.title || 'Untitled', href: '/books'}],
      }),
    }),
  },
}
