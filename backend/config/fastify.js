
module.exports = async function fastifyConfig(fastify) {

  fastify.setErrorHandler(function (error, request, reply) {
    const { statusCode } = error;

    if (error.validation) {
      reply.status(422).send(new Error('validation failed'))
    } else if (statusCode){
      reply.status(statusCode).send({ ok: false, statusCode })
    } else {
      reply.status(500).send({ ok: false, statusCode: 500 })
    }
    
    if (statusCode >= 500) {
      this.log.error(error);
    } else if (statusCode >= 400) {
      this.log.info(error);
    } else {
      this.log.error(error);
    }    
  })

  const swaggerPath = '/documentation'

  fastify.register(require('fastify-swagger'), {
    routePrefix: swaggerPath,
    swagger: {
      info: {
        title: 'Measurement API',
        description: 'Getting your energy measuments...',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: true,
    exposeRoute: true
  })  

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })


  fastify.register(require('fastify-cors'), function (instance) {

    return (req, callback) => {

      let allowed = false;

      if(req.url === swaggerPath){
        allowed = true;
      }
      const origin = req.headers.origin
      // do not include CORS headers for requests from localhost
      if (/localhost/.test(origin)) {
        allowed = true;
      }

      callback(null, allowed || new Error("Not allowed by CORS")) 
    }
  })
    

}