import { StructureBuilder } from "sanity/structure";

export const getPages = (S: StructureBuilder) =>
  S.listItem()
    .title("Pages")
    .child(
      S.list()
        .title("Page documents")
        .items([
          S.listItem()
            .title("About Page")
            .id("about")
            .schemaType("about")
            .child(S.document().schemaType("about").documentId("about")),

          S.listItem()
            .title("CV Page")
            .id("cv")
            .schemaType("cv")
            .child(S.document().schemaType("cv").documentId("cv"))
        ])
    );
