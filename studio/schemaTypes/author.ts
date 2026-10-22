import { UserIcon } from "@sanity/icons/User";
import groq from "groq";
import { defineField, defineType, StringRule } from "sanity";

export const uniqueValidation = (rule: StringRule) => {
  return rule.custom(async (value, context) => {
    if (!value) return true;

    const client = context.getClient({ apiVersion: "2021-03-25" });
    const type = context.document!._type;

    const res = await client.fetch(
      groq`*[ _type == $type && name == $name] {_id}`,
      {
        type: type,
        name: value
      },
      {
        perspective: "published"
      }
    );

    const publishedId = context.document?._id.replace(/^drafts\./, "");
    if (!res.some(({ _id }: { _id: string }) => _id !== publishedId)) {
      // if the reference of document linked to the name is the same as
      // this document then that is allowed
      return true;
    }
    if (res.length === 0) {
      return true;
    }
    return { message: "An author already exists with that name" };
  });
};

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name"
      },
      validation: (rule) => rule.required()
    },
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => uniqueValidation(rule.required())
    })
  ]
});
