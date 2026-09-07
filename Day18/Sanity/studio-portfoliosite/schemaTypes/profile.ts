import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'For example: Aspiring Project Manager.',
    }),

    defineField({
      name: 'shortMessage',
      title: 'Short Intro Message',
      type: 'text',
      description: 'A brief sentence shown in the hero or contact section.',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'For example: Yaoundé, Cameroon.',
    }),

    defineField({
      name: 'links',
      title: 'Professional Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'For example: LinkedIn, GitHub, Portfolio.',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
      description: 'LinkedIn, GitHub, or any other professional links.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
  },
})