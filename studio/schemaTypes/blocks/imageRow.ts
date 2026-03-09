import { defineType, defineField, defineArrayMember } from "sanity";

export const imageRow = defineType({
  name: "imageRow",
  title: "Image Row",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          name: "image",
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: "caption",
              type: "string"
            })
          ]
        })
      ],
      validation: (rule) => rule.required().min(2)
    })
  ]
});
