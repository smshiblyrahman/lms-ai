import { type SchemaTypeDefinition } from 'sanity'
import { noteType } from './noteType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [noteType],
}
