import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'captionedImage',
  title: 'Captioned Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe what the image shows for accessibility.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Short context explaining what the image shows.',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'caption',
    },
  },
})