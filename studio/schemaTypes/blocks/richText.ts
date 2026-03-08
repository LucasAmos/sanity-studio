import { defineField, defineArrayMember } from "sanity";

export const richText = defineField({
  name: "content",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block"
    })
  ]
});
