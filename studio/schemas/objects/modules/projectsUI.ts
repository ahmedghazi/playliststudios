import {defineField} from 'sanity'
// import {FiImage} from 'react-icons/fi'
import {FolderIcon} from '@sanity/icons'

export default defineField({
  name: 'moduleProjects',
  title: 'Projects',
  type: 'object',
  icon: FolderIcon,
  initialValue: {
    layout: 'mosaic',
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Mosaic', value: 'mosaic'},
          {title: 'Index', value: 'index'},
        ], // <-- predefined values
        // layout: 'radio', // <-- defaults to 'dropdown'
      },
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
    }),
  ],
})
