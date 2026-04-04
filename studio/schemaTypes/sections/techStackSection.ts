import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "techStackSection",
  title: "Tech Stack Section",
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
      name: "techStackSection",
      title: "Tech Stack Section",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "techStack" }] // Ensure "techStack" is a valid document name
        })
      ],
      validation: (rule) => rule.required().min(1)
    })
  ]
});
