import groq from "groq";
import { defineField, defineType, StringRule } from "sanity";

export const uniqueValidation = (rule: StringRule) => {
  return rule.custom(async (value, context) => {
    if (value?.startsWith("/") !== true) {
      return { message: "Must begin with /" };
    }

    const client = context.getClient({ apiVersion: "2021-03-25" });
    const type = context.document!._type;

    const res = await client.fetch(
      groq`*[ _type == $type && source == $source] {_id}`,
      {
        type: type,
        source: value
      },
      {
        perspective: "published"
      }
    );

    if (res[0]?._id === context.document?._id) {
      // if the reference of document linked to the name is the same as
      // this document then that is allowed
      return true;
    }
    if (res.length === 0) {
      return true;
    }
    return { message: "Source must be unique" };
  });
};

export default defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      validation: uniqueValidation
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      validation: (rule) =>
        rule.required().custom((string) => (string?.startsWith("/") ? true : "Must begin with /"))
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "number",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Permanent", value: 301 },
          { title: "Temporary", value: 302 }
        ]
      }
    })
  ]
});
