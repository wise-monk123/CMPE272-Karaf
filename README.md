# CMPE272 Twitter project

## Requirement

python3 is required. It may work with python2 but not tested.

## Install

install required packages:flask.

    cd cmpe272_twitter
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

apply your twitter API key and put them in api_key.py file:

    CONSUMER_KEY    = '...'
    CONSUMER_SECRET = '...'
    ACCESS_KEY      = '...'
    ACCESS_SECRET   = '...'

## Run

    export FLASK_APP=cmpe272_twitter.py
    export FLASK_ENV=development
    flask run --host=0.0.0.0

## Run with Docker

install docker by following [install-docker-on-linux](https://runnable.com/docker/install-docker-on-linux)

build Docker image:

    sudo docker build -t cmpe272_twitter:latest .

run Docker image:

    sudo docker run --name cmpe272_twitter  -p 8000:5000 --rm cmpe272_twitter:latest

the web server is listening on port 8000 from host side(which is mapped to container's port 5000). Please use brower(e.g firefox) to open the web site:

    firefox http://0.0.0.0:8000

find the running docker image id:

    sudo docker ps

stop docker:

    sudo docker stop <CONTAINTER_ID> # found from previous command.

push to docker hub:

    sudo docker login # login with your docker id and password.
    sudo docker tag cmpe272_twitter:latest wisemonk272/cmpe272_twitter:latest
    sudo docker push wisemonk272/cmpe272_twitter:latest

## Run Unittest

   for f in unittest_*.py; do python $f; done

## Development

Please add your name to comments in the code block
