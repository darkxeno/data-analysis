module.exports = async function mongodbConfig(fastify) {

  if(!process.env.MONGODB_URL){
    throw new Error('Please provide mongodb connection url using the environment var: MONGODB_URL');
  }

  await fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    
    url: process.env.MONGODB_URL
  })

  fastify.mongo.db.collection("measurements").createIndex({timestamp:1, 'tags.muid': 1});
}