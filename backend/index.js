const setupApp = require('./app');

// Run the server!
const start = async () => {
  const fastify = await setupApp();
  console.log('fastify',fastify);
  try {        
    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();