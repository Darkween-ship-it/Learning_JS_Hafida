import type {StructureResolver} from 'sanity/structure'
import {UserIcon} from '@sanity/icons/User'
import {CaseIcon} from '@sanity/icons/Case'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {SparklesIcon} from '@sanity/icons/Sparkles'

const SINGLETONS = ['profile']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      // 1. Singletons first
      S.listItem()
        .title('Profile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Profile'),
        ),

      S.divider(),

      // 2. Site content
      S.listItem()
        .title('Projects')
        .icon(CaseIcon)
        .child(S.documentTypeList('project').title('Projects')),

      S.listItem()
        .title('Experience')
        .icon(CalendarIcon)
        .child(S.documentTypeList('experience').title('Experience')),

      S.listItem()
        .title('Skills')
        .icon(BulbOutlineIcon)
        .child(S.documentTypeList('skill').title('Skills')),

      S.listItem()
        .title('Certifications & Programs')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('certification').title('Certifications & Programs')),

      S.listItem()
        .title('Achievements')
        .icon(SparklesIcon)
        .child(S.documentTypeList('achievement').title('Achievements')),

      // 3. Any remaining content types (filtered to exclude singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])