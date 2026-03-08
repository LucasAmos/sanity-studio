import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";
// Use this if no icon is required
// oxlint-disable-next-line no-unused-vars
const NoIcon = () => null;

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name"
      },
      validation: (rule) => rule.required()
    }
  ]
});
