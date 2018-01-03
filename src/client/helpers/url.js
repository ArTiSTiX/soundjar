import qs from 'qs'
import { trim } from 'lodash'

export function parseHashFragment(hash) {
  return qs.parse(trim(hash, '#'))
}
