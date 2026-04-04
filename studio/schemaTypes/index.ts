import alias from "./alias";
import author from "./author";
import { imageRow } from "./blocks/imageRow";
import techStack from "./blocks/techStack";
import book from "./book";
import category from "./category";
import aboutPage from "./pages/about";
import cv from "./pages/cv";
import techStackList from "./sections/techStackSection";

export const singletonTypes = [aboutPage, cv];
export const standardTypes = [alias, author, book, category, techStack, techStackList];
export const objectTypes = [imageRow];
export const schemaTypes = [...objectTypes, ...singletonTypes, ...standardTypes];
