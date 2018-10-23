import requests
from requests_oauthlib import OAuth1


class Cmpe272_Twitter_API(object):
    def __init__(self, consumer_key, consumer_secret, access_key, access_secret):
        self._auth = OAuth1(consumer_key, consumer_secret, access_key, access_secret)
        self._timeout = 30 # 30 seconds http read timeout.
# Jia Ma Start
    def GetUserTimeline(self, **kwargs):
        '''
        https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html
        GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2
        '''
        url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
        res = requests.get(url, params=kwargs, auth=self._auth, timeout=self._timeout)
        res.raise_for_status()
        return res.json()

    def PostUpdate(self, **kwargs):
        '''
        https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update
        https://api.twitter.com/1.1/statuses/update.json
        '''
        assert 'status' in kwargs, "status is required!"

        url = 'https://api.twitter.com/1.1/statuses/update.json'
        res = requests.post(url, data=kwargs, auth=self._auth, timeout=self._timeout)
        res.raise_for_status()
        return res.json()
    
    def PostProfileImage(self, **kwargs):
        '''
        https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference
        https://api.twitter.com/1.1/account/update_profile_image.json
        '''
        assert 'image' in kwargs, "image is required!"

        url = 'https://api.twitter.com/1.1/account/update_profile_image.json'
        res = requests.post(url, data=kwargs, auth=self._auth, timeout=self._timeout)
        res.raise_for_status()
        return res.json()
# Jia Ma End

# Yuhua He Start
    def GetFollowers(self, **kwargs):
        '''
        https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-followers-list
        https://api.twitter.com/1.1/followers/list.json
        '''

        url = 'https://api.twitter.com/1.1/followers/list.json'
        res = requests.get(url, auth=self._auth, timeout=self._timeout)
        res.raise_for_status()
        return res.json()

    def GetFriends(self, **kwargs):
        '''
        https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-list
        https://api.twitter.com/1.1/friends/list.json
        '''

        url = 'https://api.twitter.com/1.1/friends/list.json'
        res = requests.get(url, auth=self._auth, timeout=self._timeout)
        res.raise_for_status()
        return res.json()
# Yuhua He End
