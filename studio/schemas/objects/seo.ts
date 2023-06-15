import {defineField} from 'sanity'

export default defineField({
  title: 'SEO',
  name: 'seo',
  type: 'object',
  description: 'Settings for search engines (title, description, image)',
  options: {
    collapsible: true,
    // collapsed: true
    // columns: 2,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta title',
      validation: (Rule) =>
        Rule.required().min(1).max(80).warning('A title for search engine is better'),
    }),
    defineField({
      name: 'metaDescription',
      type: 'string',
      title: 'Meta description',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          // .max(160)
          .warning(
            'Meta description is too short (Google generally truncates snippets to ~155-160 characters)'
          ),
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta image',
      type: 'image',
      validation: (Rule) =>
        Rule.required()
          .custom((image) => {
            if (!image) return true
            const {dimensions} = decodeAssetId(image.asset._ref)
            return dimensions.width < 1200 ? 'Image must be wider' : true
            // return !name.startsWith("https") ? "Please add an image" : true;
          })
          .warning('Image of at least 1200x600px is required'),
    }),
  ],
})

const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/

const decodeAssetId = (id) => {
  const [, assetId, dimensions, format] = pattern.exec(id)
  const [width, height] = dimensions.split('x').map((v) => parseInt(v, 10))

  return {
    assetId,
    dimensions: {width, height},
    format,
  }
}
