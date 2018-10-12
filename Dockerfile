FROM python:3.6-alpine

RUN adduser -D cmpe272twitter

WORKDIR /home/cmpe272twitter

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY static static
COPY cmpe272_twitter.py cmpe272_twitter.py
COPY cmpe272_twitter_api.py cmpe272_twitter_api.py
COPY api_key.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP cmpe272_twitter.py

RUN chown -R cmpe272twitter:cmpe272twitter ./
USER cmpe272twitter

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
