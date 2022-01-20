#!/bin/bash

#docker-compose build -m 1500MB
docker-compose up -d

sleep 10s

open http://localhost:3000/documentation
open http://localhost/
open $(docker logs data-analysis_jupyter_1 2>&1  | grep "or http://127.0.0.1:8888/" | tail -1 | sed 's/.*or //' | sed 's@?token@notebooks/work/DataAnalysis.ipynb?token@')

