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
      name: 'problemStatement',
      title: 'Problem Statement',
      type: 'text',
      description: 'A short, memorable summary of the problem, shown large. For example: "Young people had ideas. The challenge was turning them into something real."',
    }),

    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      description: 'What problem or situation did the project need to address? Shown as the smaller supporting text under the statement.',
    }),

    defineField({
      name: 'problemImage',
      title: 'Problem Image (Optional)',
      type: 'captionedImage',
      description: 'An image that establishes the context of the problem. Leave empty if there is nothing useful to show.',
    }),

    defineField({
      name: 'objectiveStatement',
      title: 'Objective Statement',
      type: 'text',
      description: 'A short, memorable summary of the objective, shown large. For example: "Create an environment where ideas could move from concept to action."',
    }),

    defineField({
      name: 'objective',
      title: 'Objective',
      type: 'text',
      description: 'What was the project trying to achieve? Shown as the smaller supporting text under the statement.',
    }),

    defineField({
      name: 'objectiveImage',
      title: 'Objective Image (Optional)',
      type: 'captionedImage',
      description: 'An image that supports the objective, such as a planning document or programme graphic. Leave empty if not useful.',
    }),

    defineField({
      name: 'roleStatement',
      title: 'Role Statement',
      type: 'text',
      description: 'A short, memorable summary of the role, shown large. For example: "Keeping people, tasks and moving parts connected."',
    }),

    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'responsibility',
          fields: [
            defineField({
              name: 'title',
              title: 'Responsibility',
              type: 'string',
              description: 'For example: Programme coordination, Communication, Task tracking.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'What this responsibility actually involved.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
      description: 'Louis’s specific responsibilities on the project, each with a short description.',
    }),

    defineField({
      name: 'roleImage',
      title: 'My Role Image (Optional)',
      type: 'captionedImage',
      description: 'A photo of the team or event alongside the responsibilities. Leave empty if not useful.',
    }),

    defineField({
      name: 'processStatement',
      title: 'Process Statement',
      type: 'text',
      description: 'A short, memorable summary of the process, shown large.',
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
      name: 'processImage',
      title: 'Process Image (Optional)',
      type: 'captionedImage',
      description: 'A workflow diagram, planning board or screenshot showing the process. Leave empty if not useful.',
    }),

    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Tools or methods used during the project.',
    }),

    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'For example: Project archive, LinkedIn.',
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
        }),
      ],
      description: 'Professional or project links shown in the case-study information panel.',
    }),

    defineField({
      name: 'challengesStatement',
      title: 'Challenges Statement',
      type: 'text',
      description: 'A short, memorable summary of the challenges, shown large.',
    }),

    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Important challenges encountered during the project.',
    }),

    defineField({
      name: 'challengesImage',
      title: 'Challenges Image (Optional)',
      type: 'captionedImage',
      description: 'Evidence of a challenge, such as a coordination screenshot. Leave empty if not useful.',
    }),

    defineField({
      name: 'resultsStatement',
      title: 'Results Statement',
      type: 'text',
      description: 'A short, memorable summary of the results, shown large.',
    }),

    defineField({
      name: 'results',
      title: 'Results / Impact',
      type: 'text',
      description: 'What was achieved? Include measurable results only when they can be verified.',
    }),

    defineField({
      name: 'resultsImage',
      title: 'Results Image (Optional)',
      type: 'captionedImage',
      description: 'A final outcome photo or presentation shot. Leave empty if not useful.',
    }),

    defineField({
      name: 'resultStats',
      title: 'Result Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'For example: 100+',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'For example: participants',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      description: 'Key numbers shown as bold statistics in the Results section.',
    }),

    defineField({
      name: 'lessonsLearned',
      title: 'Lessons Learned',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Short lessons from the project. Each entry is shown as a separate takeaway.',
    }),

    defineField({
      name: 'lessonsImage',
      title: 'Lessons Image (Optional)',
      type: 'captionedImage',
      description: 'A behind-the-scenes image. Often left empty for a quieter close.',
    }),

    defineField({
      name: 'gallery',
      title: 'Media Library',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mediaItem',
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
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Short context explaining what the image shows.',
            }),
            defineField({
              name: 'section',
              title: 'Show in section',
              type: 'string',
              initialValue: 'process',
              options: {
                list: [
                  {title: 'Problem', value: 'problem'},
                  {title: 'Objective', value: 'objective'},
                  {title: 'Responsibilities', value: 'responsibilities'},
                  {title: 'Process', value: 'process'},
                  {title: 'Challenges', value: 'challenges'},
                  {title: 'Results', value: 'results'},
                  {title: 'Lessons', value: 'lessons'},
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'section',
              media: 'image',
            },
          },
        }),
      ],
      description: 'Media library. Each image is placed into the relevant case-study section instead of a separate gallery.',
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