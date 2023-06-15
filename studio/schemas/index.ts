import season from './documents/season'
import studio from './documents/studio'
import blockContent from './objects/blockContent'
import embed from './objects/embed'
import seo from './objects/seo'
import settings from './singletons/settings'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'

export const schemaTypes = [
  season,
  studio,
  settings,
  seo,
  blockContent,
  embed,
  linkExternal,
  linkInternal,
]

export default schemaTypes
