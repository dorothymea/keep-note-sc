import dayjs from "dayjs";
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh')
dayjs.locale('zh')

export function until(createdAt){
  return dayjs().to(createdAt,true)
}
