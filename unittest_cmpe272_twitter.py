import datetime
import unittest
import re
import json
import flask
import cmpe272_twitter as server


class Test_Flask_App(unittest.TestCase):
    def setUp(self):
        server.app.config['TESTING'] = True

    def test_index(self):
        with server.app.test_client() as client:
            resp = client.get('/')
            self.assertTrue('Yet Another Twitter API playground' in resp.data.decode('utf-8'))

    def test_getself(self):
        with server.app.test_client() as client:
            resp = client.get('/getself')
            self.assertTrue('name' in resp.data.decode('utf-8'))
            self.assertTrue('screen_name' in resp.data.decode('utf-8'))

    def test_timeline(self):
        with server.app.test_client() as client:
            resp = client.post('/timeline',
                    data={'screenname': "twitterapi", 'count': 4})

            self.assertTrue(len(resp.data.decode('utf-8')) > 0 )

    def test_poststatus(self):
        with server.app.test_client() as client:
            resp = client.post('/poststatus',
                    data={'text': "Hello" + str(datetime.datetime.now())})
            self.assertTrue('{"status":"ok"}', resp.data.decode('utf-8'))

    def test_welcomemessages(self):
        with server.app.test_client() as client:
            resp = client.get('/welcomemessages',data={})
            self.assertTrue(resp.data.decode('utf-8'))

    def test_collections(self):
        with server.app.test_client() as client:
            resp = client.get('/collections',data={})
            self.assertTrue(resp.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
