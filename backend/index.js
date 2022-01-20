const fastify = require('fastify')({ logger: { prettyPrint: true }});

async function setup(fastify){
  await require('./config/mongodb')(fastify);
  await require('./schemas/measurement')(fastify);
  await require('./config/fastify')(fastify);
  await require('./endpoints/measurements')(fastify);
}

fastify.get('/', (request, reply) => { reply.send(fastify.getSchemas()) })

// Run the server!
const start = async () => {
  try {
    await setup(fastify);
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()