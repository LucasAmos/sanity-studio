import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "alias",
  title: "Alias",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      validation: (rule) => rule.required()
    })
  ]
});
