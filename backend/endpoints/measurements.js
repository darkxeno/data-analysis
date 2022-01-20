module.exports = function endpointsMeasurement(fastify) {
  fastify.get(
    "/api/measurements",
    {
      schema: {
        response: {
          200: fastify.getSchema("measurement/get/response/200"),
          422: fastify.getSchema("measurement/get/response/400")
        },
        query: fastify.getSchema("measurement/get/query")
      }
    },
    async function getMeasurements(req, reply) {
      const { limit = 1, start, stop, muid } = req.query;

      const query = {
        timestamp: {
          $gte: start || "",
          $lte: stop || "Z"
        }
      };

      if (muid) {
        query["tags.muid"] = muid;
      }

      this.log.info({ query }, "sending query to mongodb");

      const measurements = this.mongo.db.collection("measurements");

      const results = await measurements
        .find(query)
        .sort({ timestamp: 1 })
        .limit(limit)
        .toArray();

      reply.send(results);
    }
  );
};
