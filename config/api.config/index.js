const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const serverEnv =
  process.env.NODE_ENV === 'test'
    ? 'test'
    : process.env.VUE_APP_IS_SERVER === 'true'
      ? 'server'
      : 'local'
const confEnv = process.env.VUE_APP_CONF_ENV || 'dev'
const baseConfigFile = `./${serverEnv}.js`
const confEnvConfigFile = `./${serverEnv}.${confEnv}.js`
const baseConfigFileExist = fs.existsSync(
  path.resolve(__dirname, baseConfigFile)
)
const confEnvConfigFileExist = fs.existsSync(
  path.resolve(__dirname, confEnvConfigFile)
)

if (!baseConfigFileExist && !confEnvConfigFileExist) {
  throw Error(
    `Api config file "${baseConfigFile}" or "${confEnvConfigFile}" is not exist.`
  )
}

const baseConfig = baseConfigFileExist ? require(baseConfigFile) : {}
const confEnvConfig = confEnvConfigFileExist ? require(confEnvConfigFile) : {}
const apiConfig = _.merge(baseConfig, confEnvConfig)

function formatApiConfig(originConfig) {
  const finalConfig = {}
  const invalidConfig = []
  Object.keys(originConfig).forEach(key => {
    const config = originConfig[key]
    if (_.isPlainObject(config)) {
      if (!config.url) {
        return
      }
      finalConfig[key] = { url: config.url }
      if (_.isPlainObject(config.requestConfig)) {
        finalConfig[key].requestConfig = config.requestConfig
      }
    } else if (typeof config === 'string') {
      finalConfig[key] = { url: config }
    } else {
      invalidConfig.push(key)
    }
  })

  if (invalidConfig.length > 0) {
    throw Error(
      `Invalid api config (${serverEnv} | ${confEnv}):
      ${invalidConfig.join(', ')}`
    )
  }

  return finalConfig
}

module.exports = formatApiConfig(apiConfig)
