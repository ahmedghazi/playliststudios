// import i18n from "../i18n";
// import localizePreview from "../localizePreview";
import {defineField, defineArrayMember, defineType} from 'sanity'
// import {baseLanguage} from '../locale/supportedLanguages'
// import {FiServer} from 'react-icons/fi'
import modulesList from '../objects/modules/modulesList'
// import {validateSlug} from '../../utils/validateSlug'
import {StackIcon} from '@sanity/icons'

export default defineType({
  name: 'season',
  type: 'document',
  title: 'Season',
  icon: StackIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: `title`,
      slug: 'slug',
    },
    prepare(selection) {
      const {title, slug} = selection
      return {
        title: title,
        subtitle: `/${slug.current}`,
      }
    },
  },

  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'homePage',
      type: 'boolean',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Le nom de la page',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL based on the title (no space, or char other than a-z-0-9',
      options: {
        source: `title`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      // validation: validateSlug,
    }),
    defineField({
      name: 'themeColor',
      type: 'string',
      title: 'Theme Color',
    }),
    defineField({
      name: 'playlist',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'studio'}]}],
    }),
  ],
})
