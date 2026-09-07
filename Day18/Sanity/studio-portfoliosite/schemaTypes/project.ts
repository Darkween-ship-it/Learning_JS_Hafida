import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A short introduction to the project, used on project cards and the case study hero.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The main image displayed at the top of the project case study.',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'For example: Event Management, Youth Development, Technology, Project Management.',
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'For example: 2026 or July 2026.',
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'team',
      title: 'Team',
      type: 'text',
      description: 'Describe the people or teams Louis worked with on this project.',
    }),

    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      description: 'What problem or situation did the project need to address?',
    }),

    defineField({
      name: 'objective',
      title: 'Objective',
      type: 'text',
      description: 'What was the project trying to achieve?',
    }),

    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'List Louis’s specific responsibilities on the project.',
    }),

    defineField({
      name: 'process',
      title: 'Process',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'step',
              title: 'Step',
              type: 'string',
              description: 'For example: Planning, Coordination, Execution.',
            }),

            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'step',
              subtitle: 'description',
            },
          },
        }),
      ],
      description: 'Describe the main stages Louis went through during the project.',
    }),

    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Tools or methods used during the project.',
    }),

    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Important challenges encountered during the project.',
    }),

    defineField({
      name: 'results',
      title: 'Results / Impact',
      type: 'text',
      description: 'What was achieved? Include measurable results only when they can be verified.',
    }),

    defineField({
      name: 'lessonsLearned',
      title: 'Lessons Learned',
      type: 'text',
      description: 'What did Louis learn from this project?',
    }),

    defineField({
      name: 'gallery',
      title: 'Photos / Screenshots',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      description: 'Upload photos, screenshots, documents or other visual evidence from the project.',
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
      description: 'Controls the order in which projects appear on the Projects page.',
    }),
  ],
})