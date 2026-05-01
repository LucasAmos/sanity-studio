import { TrendUpwardIcon } from "@sanity/icons";
import { defineField, defineArrayMember } from "sanity";
export const InternalLinkIcon = () => (
  <div>
    <TrendUpwardIcon />
  </div>
);

export const richText = defineField({
  name: "content",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            icon: InternalLinkIcon,
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [{ type: "techStack" }]
              }
            ]
          }
        ]
      }
    })
  ]
});
