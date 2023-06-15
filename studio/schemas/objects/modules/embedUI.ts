import {defineField} from 'sanity'
import {ImEmbed} from 'react-icons/im'

export default defineField({
  name: 'moduleEmbed',
  title: 'Embed',
  type: 'object',
  icon: ImEmbed,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title',
    }),
    defineField({
      name: 'embed',
      type: 'embed',
    }),
    // defineField({
    //   name: 'url',
    //   type: 'string',
    //   description:
    //     'ex: https://www.youtube.com/watch?v=UMpACxYoPEM, https://soundcloud.com/arpanetofficial/lorentz-contraction',
    // }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Embed',
      }
    },
  },
})
