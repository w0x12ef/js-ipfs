'use strict'

const mfs = require('ipfs-mfs/http')
const resources = require('./../resources')

module.exports = (server) => {
  const api = server.select('API')

  api.route({
    // TODO fix method
    method: '*',
    path: '/api/v0/cat',
    config: {
      pre: [
        { method: resources.files.cat.parseArgs, assign: 'args' }
      ],
      handler: resources.files.cat.handler
    }
  })

  api.route({
    // TODO fix method
    method: '*',
    path: '/api/v0/get',
    config: {
      pre: [
        { method: resources.files.get.parseArgs, assign: 'args' }
      ],
      handler: resources.files.get.handler
    }
  })

  api.route({
    // TODO fix method
    method: '*',
    path: '/api/v0/add',
    config: {
      payload: {
        parse: false,
        output: 'stream',
        maxBytes: 1000 * 1024 * 1024
      },
      handler: resources.files.add.handler,
      validate: resources.files.add.validate
    }
  })

  api.route({
    method: 'POST',
    path: '/api/v0/add-experimental',
    config: {
      payload: {
        parse: false,
        output: 'stream',
        maxBytes: 1000 * 1024 * 1024
      },
      validate: resources.files.addExperimental.validate,
      handler: resources.files.addExperimental.handler
    }
  })

  api.route({
    // TODO fix method
    method: '*',
    path: '/api/v0/ls',
    config: {
      pre: [
        { method: resources.files.immutableLs.parseArgs, assign: 'args' }
      ],
      handler: resources.files.immutableLs.handler
    }
  })

  mfs(api)
}
