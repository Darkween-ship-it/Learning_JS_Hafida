import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons/Sparkles'

export default defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'For example: Led a 200-participant community event.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Award', value: 'award'},
          {title: 'Milestone', value: 'milestone'},
          {title: 'Leadership Achievement', value: 'leadership'},
          {title: 'Project / Event', value: 'project-event'},
          {title: 'Measurable Result', value: 'measurable-result'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'metric',
      title: 'Big Number / Metric',
      type: 'string',
      description: 'A short highlight number, for example: 200+ participants or 90% target reached.',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short context or story behind this achievement.',
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'For example: 2026 or March 2026.',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order in which achievements appear.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})