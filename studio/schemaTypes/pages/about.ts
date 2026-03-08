import { defineField, defineType } from "sanity";
import { richTextField } from "../fields/richTextField";

import { InfoOutlineIcon } from "@sanity/icons";

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
    richTextField
  ]
});
