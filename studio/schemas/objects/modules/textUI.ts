import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'

export default defineField({
  name: 'moduleText',
  title: 'Text',
  type: 'object',
  icon: FiAlignLeft,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Text',
      }
    },
  },
})
