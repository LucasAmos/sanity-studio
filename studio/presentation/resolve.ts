import { defineLocations, PresentationPluginOptions } from "sanity/presentation";

import book from "../schemaTypes/book";
import about from "../schemaTypes/pages/about";
import cv from "../schemaTypes/pages/cv";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    [book.name]: defineLocations({
      select: {
        title: "title"
      },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Untitled", href: "/books" }]
      })
    }),
    [about.name]: defineLocations({
      select: {
        title: "title"
      },
      resolve: () => ({
        locations: [{ title: "About", href: "/about" }]
      })
    }),
    [cv.name]: defineLocations({
      select: {
        title: "title"
      },
      resolve: () => ({
        locations: [{ title: "CV page", href: "/about/cv" }]
      })
    })
  }
};
