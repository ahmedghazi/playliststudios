// import {BiDockTop, BiDockBottom} from 'react-icons/bi'
// import {ControlsIcon} from '@sanity/icons'
import {ListItemBuilder, StructureResolver} from 'sanity/desk'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return !['media.tag', 'season', 'studio', 'settings'].includes(id)
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .schemaType('settings')
        .child(S.editor().title('Settings').schemaType('settings').documentId('settings')),
      S.divider(),

      S.listItem().title('Seasons').schemaType('season').child(S.documentTypeList('season')),
      S.listItem().title('Studio').schemaType('studio').child(S.documentTypeList('studio')),
      S.divider(),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
