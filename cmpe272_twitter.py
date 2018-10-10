from flask import jsonify, render_template, request
from flask import Flask
import json
import twitter
import api_key as t

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index():
    return app.send_static_file('cmpe272_twitter.html')

@app.route('/timeline', methods=['POST'])
def timeline():
    screen_name = request.form.get('screenname', 'SanJoseTrails')
    tapi = twitter.Api(t.CONSUMER_KEY, t.CONSUMER_SECRET, t.ACCESS_KEY, t.ACCESS_SECRET)
    timeline = tapi.GetUserTimeline(screen_name=screen_name)
    #text = '\n'.join([t.text for t in timeline])
    return jsonify([t.text for t in timeline])

@app.route('/poststatus', methods=['POST'])
def poststatus():
    text = request.form.get('text', '')
    print('DDDD', text)
    status = {'status': 'error'}
    if text:
        tapi = twitter.Api(t.CONSUMER_KEY, t.CONSUMER_SECRET, t.ACCESS_KEY, t.ACCESS_SECRET)
        if tapi.PostUpdate(text):
            status = {'status': 'ok'}
    return jsonify(status)
