
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

- Add a chart that mixes lines for weekday averages and the std values represented as a surrounding area where scatter points for each value can be seen
- Add more testing (backend / frontend)

Enjoy...
