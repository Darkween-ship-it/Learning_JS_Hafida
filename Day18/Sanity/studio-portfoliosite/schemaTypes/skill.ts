import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'For example: Stakeholder Communication.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Project Management', value: 'project-management'},
          {title: 'Product Management', value: 'product-management'},
          {title: 'Leadership', value: 'leadership'},
          {title: 'Communication', value: 'communication'},
          {title: 'Technical / Digital', value: 'technical'},
          {title: 'Tools', value: 'tools'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'Expert', value: 'expert'},
        ],
        layout: 'radio',
      },
      description: 'How confident or experienced is Louis with this skill?',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order within a category on the Skills page.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
})