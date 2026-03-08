import { defineField, defineType } from "sanity";
import { richText } from "../blocks/richText";

import { InfoOutlineIcon } from "@sanity/icons";
import { imageRow } from "../blocks/imageRow";

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      initialValue: { current: "about" },
      readOnly: true,
      validation: (rule) => rule.required()
    },
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    { ...richText, validation: (rule) => rule.required() },
    defineField({
      name: "imageRow",
      title: "Image Row",
      type: "reference",
      to: [{ type: imageRow.name }]
    })
  ]
});
