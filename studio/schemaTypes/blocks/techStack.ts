import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "techStack",
  title: "Tech Stack",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      title: "skills",
      name: "skills",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1)
    })
  ]
});
