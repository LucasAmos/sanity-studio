import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { imageRow } from "../blocks/imageRow";
import { richText } from "../blocks/richText";

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
      type: imageRow.name
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "reference",
      to: [{ type: "techStackSection" }]
    })
  ]
});
