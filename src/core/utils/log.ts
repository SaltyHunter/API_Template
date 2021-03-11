import {LoggerFactoryOptions, LFService, LogGroupRule, LogLevel} from "typescript-logging";
import { configure } from 'log4js'
 
// Create options instance and specify 2 LogGroupRules:
// * One for any logger with a name starting with model, to log on debug
// * The second one for anything else to log on info
const options = new LoggerFactoryOptions()
.addLogGroupRule(new LogGroupRule(new RegExp("model.+"), LogLevel.Debug))
.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));
 
// Create a named loggerfactory and pass in the options and export the factory.
// Named is since version 0.2.+ (it's recommended for future usage)
export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);

configure({
    appenders: { multi: { type: 'multiFile', base: 'logs/', property:'level', extension: '.log', maxLogSize: 10485760 } },
    categories: { default: { appenders: ['multi'], level: 'info' } },
  })