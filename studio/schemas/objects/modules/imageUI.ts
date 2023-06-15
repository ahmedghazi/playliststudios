import {defineField} from 'sanity'
import {FiImage} from 'react-icons/fi'

export default defineField({
  name: 'moduleImage',
  title: 'Image',
  type: 'object',
  icon: FiImage,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      type: 'number',
      name: 'width',
      title: 'width',
      description: 'in percentage (default 100)',
    }),
    defineField({
      name: 'caption',
      type: 'text',
      title: 'Image caption',
    }),
  ],

  preview: {
    select: {
      image: 'image',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Image',
        media: image,
      }
    },
  },
})
