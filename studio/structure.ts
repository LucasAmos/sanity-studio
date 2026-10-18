import { StructureBuilder } from "sanity/structure";

import { getDocuments } from "./structure/documents";
import { getPages } from "./structure/pages";

export const getStructure = (S: StructureBuilder) => {
  return S.list()
    .title("Content")
    .items([getPages(S), ...getDocuments(S)]);
};
