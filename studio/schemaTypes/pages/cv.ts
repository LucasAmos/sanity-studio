import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { richText } from "../blocks/richText";

export default defineType({
  name: "cv",
  title: "CV",
  type: "document",
  icon: DocumentIcon,
  fields: [
    {
      title: "Parent Page",
      name: "parentPage",
      type: "reference",
      to: [{ type: "about" }]
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      initialValue: { current: "cv" },
      readOnly: true,
      validation: (rule) => rule.required()
    },
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    { ...richText, validation: (rule) => rule.required() }
  ]
});
