import { StructureBuilder } from "sanity/structure";

import { standardTypes } from "../schemaTypes";

export const getDocuments = (S: StructureBuilder) => {
  return standardTypes.map(({ name, title }) => S.documentTypeListItem(name).title(title || name));
};
