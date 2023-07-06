import {defineField, defineType} from 'sanity'
import {FaPaintBrush} from 'react-icons/fa'

export default defineType({
  type: 'document',
  name: 'studio',
  title: 'Studio',
  icon: FaPaintBrush,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'track',
      title: 'Track',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'editorial',
    }),
    defineField({
      name: 'studioUrl',
      type: 'string',
      title: 'Studio Url',
      group: 'editorial',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      group: 'editorial',
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      group: 'editorial',
    }),
    defineField({
      name: 'poster',
      type: 'image',
      title: 'Poster',
      group: 'editorial',
    }),

    defineField({
      name: 'trackName',
      type: 'string',
      group: 'track',
    }),
    defineField({
      name: 'trackArtist',
      type: 'string',
      group: 'track',
    }),
    defineField({
      name: 'trackDuration',
      type: 'string',
      group: 'track',
    }),
    defineField({
      name: 'trackUrl',
      type: 'string',
      description: 'youtube url',
      group: 'track',
    }),
  ],

  preview: {
    select: {
      title: `title`,
      media: 'poster',
    },
  },
})
