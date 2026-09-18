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
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      description: 'Small label above the headline. For example: Aspiring Project Manager.',
    }),

    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'lead',
              title: 'Plain part',
              type: 'string',
              description: 'For example: "Turn".',
            }),
            defineField({
              name: 'accent',
              title: 'Highlighted part',
              type: 'string',
              description: 'For example: "Ideas".',
            }),
          ],
          preview: {
            select: {
              title: 'lead',
              subtitle: 'accent',
            },
          },
        },
      ],
      description: 'Each line has a plain part and a highlighted part.',
    }),

    defineField({
      name: 'heroIntro',
      title: 'Hero Intro',
      type: 'text',
      description: 'The short paragraph under the headline.',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe what the image shows for accessibility.',
        }),
      ],
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),

    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp',
      type: 'url',
      description: 'Optional. A WhatsApp link such as https://wa.me/2376XXXXXXXX.',
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
      description: 'LinkedIn, GitHub, website, or any other professional links.',
    }),

    defineField({
      name: 'aboutHeadingLead',
      title: 'About Heading (plain part)',
      type: 'string',
      description: 'For example: "A little".',
    }),

    defineField({
      name: 'aboutHeadingAccent',
      title: 'About Heading (highlighted part)',
      type: 'string',
      description: 'For example: "about me."',
    }),

    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe what the image shows for accessibility.',
        }),
      ],
    }),

    defineField({
      name: 'aboutParagraph1',
      title: 'About Paragraph 1',
      type: 'text',
    }),

    defineField({
      name: 'aboutParagraph2',
      title: 'About Paragraph 2',
      type: 'text',
    }),

    defineField({
      name: 'aboutQuote',
      title: 'About Quote',
      type: 'text',
      description: 'A personal or professional quote shown at the end of the About section.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
  },
})