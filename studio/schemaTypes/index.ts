import alias from './alias'
import author from './author'
import book from './book'
import category from './category'
import aboutPage from "./pages/about"

export const singletonTypes= [aboutPage]
export const standardTypes =[alias, author, book, category]

export const schemaTypes = [...singletonTypes, ...standardTypes ]
