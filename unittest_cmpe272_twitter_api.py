import datetime
import unittest
from cmpe272_twitter_api import Cmpe272_Twitter_API as twitter
import api_key as t

class Test_Twitter_API(unittest.TestCase):
    def setUp(self):
        pass

    def test_Init(self):
        api = twitter(t.CONSUMER_KEY, t.CONSUMER_SECRET, t.ACCESS_KEY, t.ACCESS_SECRET)
        self.assertEqual(api._timeout, 30)
        self.assertIsNotNone(api._auth)


    def test_GetUserTimeline(self):
        api = twitter(t.CONSUMER_KEY, t.CONSUMER_SECRET, t.ACCESS_KEY, t.ACCESS_SECRET)
        timeline = api.GetUserTimeline(screen_name='twitterapi', count=2)
        self.assertIsNotNone(timeline)
        self.assertEqual(len(timeline), 2)
        self.assertTrue('created_at' in timeline[0])
        self.assertTrue('text' in timeline[0])
        self.assertTrue(len(timeline[0]['text']) > 0)

    def test_PostUpdate(self):
        api = twitter(t.CONSUMER_KEY, t.CONSUMER_SECRET, t.ACCESS_KEY, t.ACCESS_SECRET)
        status = api.PostUpdate(status="Hello" + str(datetime.datetime.now()))
        self.assertIsNotNone(status)
        self.assertTrue('created_at' in status)

if __name__ == '__main__':
    unittest.main()

