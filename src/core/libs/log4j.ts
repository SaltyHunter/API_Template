import { configure, getLogger } from 'log4js'
export const logger = getLogger()
logger.level = 'info'

configure({
  appenders: { multi: { type: 'multiFile', base: 'logs/', property:'level', extension: '.log', maxLogSize: 10485760 } },
  categories: { default: { appenders: ['multi'], level: 'info' } },
})