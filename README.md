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

## Run Unittest

   for f in unittest_*.py; do python $f; done

## Development

Please add your name to comments in the code block
