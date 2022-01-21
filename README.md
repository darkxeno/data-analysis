
Data analysis toolkit
=====================

The data analysis toolkit contains:

- Jupyter notebook (python)
- Fastify backend (nodejs)
- React frontend (javascript)
- MongoDB database

Jupiter notebook
----------------

Obtains the data from the measurements API and does some analysis: agregations and resamples over days and weekdays, counts to detect missing data, averages and stardard deviations to try localize patterns.

NOTE: remember to introduce to email and password on the notebook in order to connect to the API.

Finally stores the analyzed subset of data on a mongodb database.

*Service Url:*
```
http://127.0.0.1:8888/?token=XXXXXXX

# The token can be seen at the log of the Jupyter container during the bootstrap.
```

And execution example can be seen [here](https://htmlpreview.github.io/?https://raw.githubusercontent.com/darkxeno/data-analysis/master/DataAnalysis.html).

Fastify backend
---------------

Constructs a REST API to query the data stored on mongodb, validate the structure of all inputs / outputs using json schema and services a OpenApi / swagger documentation.


*Service Url:*
```
http://localhost:3000/api/measurements
```

*Swagger Url:*
```
http://localhost:3000/documentation
```

*Testing the API*
```
curl http://localhost:3000/api/measurements\?limit\=10000\&start\=2021-09-15T22:45:00.000Z\&stop\=2021-09-16T00:00:00.000Z\&muid\=C-2caa1954-b3c8-466c-9722-c1b72dabe32b -v | jq .
```

*Running API tests*
```
#ensure that mongodb is running and exposed

docker-compose up -d mongo

cd ./backend
npm test
```

React frontend
--------------

Renders a time series chart of all the data available using the REST API. Integrates the FlexMonster library for additional data analysis.


Everything is orchestrated using docker-compose and docker for easy comsumption.

*Service Url:*
```
http://localhost:80
```


MongoDB database
----------------

Just a simple storage that goes very well along JSON.


Running
-------

Just execute the bash script on the root folder

```
./start.sh
```

Stopping
--------

```
docker-compose stop
```

Roadmap
-------

- Add a chart that mixes lines for weekday averages and the std values represented as a surrounding area where scatter points for each value can be seen (partially added on the last commit)
- Add more testing (backend / frontend)

Enjoy...
