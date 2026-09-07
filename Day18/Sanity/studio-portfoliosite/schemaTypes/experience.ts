import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'For example: 2025 — Present.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Professional Experience', value: 'professional'},
          {title: 'Internship', value: 'internship'},
          {title: 'Fellowship', value: 'fellowship'},
          {title: 'Volunteering', value: 'volunteering'},
          {title: 'Leadership', value: 'leadership'},
        ],
        layout: 'radio',
      },
      description: 'How should this experience be categorized on the portfolio?',
    }),

    defineField({
      name: 'role',
      title: 'Role label',
      type: 'string',
      description: 'Short label, for example: Project Coordinator, Fellow, Volunteer.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'points',
      title: 'What I did',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order in which experiences appear on the Experience page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
    },
  },
})