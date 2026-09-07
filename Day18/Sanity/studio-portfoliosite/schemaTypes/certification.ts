import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export default defineType({
  name: 'certification',
  title: 'Certification & Program',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'For example: Rolfes SDG Academy — Sustainable Development Program.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'Who issued the certificate or hosted the program.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Course', value: 'course'},
          {title: 'Certification', value: 'certification'},
          {title: 'Fellowship', value: 'fellowship'},
          {title: 'Leadership Program', value: 'leadership-program'},
          {title: 'Training Program', value: 'training'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'For example: 2026 or June 2026.',
    }),

    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to the certificate, transcript or program page (optional).',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of what was covered or accomplished.',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order in which certifications appear.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
    },
  },
})