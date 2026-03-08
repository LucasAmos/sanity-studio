import { defineType, defineField, defineArrayMember } from "sanity";

export const imageRow = defineType({
  name: "imageRow",
  title: "Image Row",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
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
            }),
            defineField({
              name: "attribution",
              type: "string"
            })
          ]
        })
      ],
      validation: (rule) => rule.required().min(2)
    })
  ]
});
