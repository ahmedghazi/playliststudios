import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './src/deskStructure'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'PlaylistStudios backoffice',

  projectId: 'qo3vrjs9',
  dataset: 'production',

  plugins: [deskTool({structure: structure}), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
