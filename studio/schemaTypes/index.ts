import alias from "./alias";
import author from "./author";
import book from "./book";
import category from "./category";
import aboutPage from "./pages/about";
import { imageRow } from "./blocks/imageRow";
import cv from "./pages/cv";

export const singletonTypes = [aboutPage, cv];
export const standardTypes = [alias, author, book, category];
export const objectTypes = [imageRow];

export const schemaTypes = [...objectTypes, ...singletonTypes, ...standardTypes];
