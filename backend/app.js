const fastify = require('fastify')({ logger: { prettyPrint: true }});

async function setupApp(opts={}){
  await require('./config/mongodb')(fastify);
  await require('./schemas/measurement')(fastify);
  await require('./config/fastify')(fastify);
  await require('./endpoints/measurements')(fastify);

  return fastify;
}

module.exports = setupApp;