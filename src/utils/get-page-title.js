import defaultSettings from '@/settings'

const title = defaultSettings.title || '云谱世家'

export default function getPageTitle(pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`
  // }
  return `${title}`
}
