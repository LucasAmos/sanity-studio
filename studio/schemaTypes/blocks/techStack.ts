import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { IconPicker } from "../../components/IconPicker";

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
      name: "icon",
      title: "Icon",
      type: "string",
      components: {
        input: IconPicker
      }
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
