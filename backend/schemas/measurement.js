module.exports = function schemasMeasurement(fastify) {

  fastify.addSchema({
    $id: 'measurement/get/query',
    type: 'object',
    properties: {
      start: { type: 'string' },
      stop: { type: 'string' },
      muid: { type: 'string' },
      limit: { type: 'number' },
    }
  })

  fastify.addSchema({
    $id: 'measurement/entity',
    type: 'object',
    properties: {
      measurement: {
        type: 'string'
      },
      '0100011D00FF': {
        type: 'number'
      },
      '0100021D00FF': {
        type: 'null'
      },
      tags: {
        type: 'object',
        properties: {
          muid: {
            type: 'string'
          }
        },
        required: [
          'muid'
        ]
      },
      'timestamp': {
        type: 'string'
      }
    },
    required: [
      'measurement',
      '0100011D00FF',
      '0100021D00FF',
      'tags',
      'timestamp'
    ]
  })

  fastify.addSchema({
    $id: 'measurement/get/response/200',
    type: 'array',
    items: { '$ref': 'measurement/entity' },
  });

  fastify.addSchema({
    $id: 'measurement/get/response/400',
    type: 'object', 
    properties: {
      statusCode: {
        type: "integer"
      },
      error: {
        type: "string"
      },
      message: {
        type: "string"
      }   
    }
  });  

}
