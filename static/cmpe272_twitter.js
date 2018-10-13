// Yuhua He Start
// Define constants for different views
const USER_TIMELINE = 'USER_TIMELINE';
const POST_STATUS = 'POST_STATUS';
const GET_FOLLOWERS = 'GET_FOLLOWERS';
const GET_FRIENDS = 'GET_FRIENDS';

var current_view = POST_STATUS;
// Yuhua He End

// Jia Ma Start
var interested_users = ['elonmusk', 'spaceX', 'nasa', 'asdf', 'sanjosetrails', 'YosemiteNPS', 'realDonaldTrump'];
var current_users = [];
// to fetch last status with frequency of TIME_INTERVAL.
var time_count = 0;
var TIME_INTERVAL = 6000;
var badges = current_users.length;

// user account profile with current API key.
// it verifies current API key. nothing will be loaded if credential verification failure.
function get_account_profile()
{
  $.getJSON('/getself', function(data) {
    // current API key works.
    if ('screen_name' in data) {
      var name = data['name'] || data['screen_name'];
      $('#self_account').text(name);
      if (interested_users[0] != data['screen_name']) {
        interested_users.splice(0, 0, data['screen_name']);
      }
      reload_users(interested_users);
    }
  });
}

function reload_users(arr)
{
    current_users = [];
    badges = 0;
    $('.twitter_item').remove();
    for (var i = 0; i < arr.length; i++) {
        update_recent(arr[i]);
    }
}

// fetch latest twitters for user:name then display most recent one in page.
// if no such user, it will be simply ignored.
function update_recent(name) {
    navigateTo(USER_TIMELINE);

    $.ajax({
        method: 'POST',
        url: "/timeline",
        data: {screenname: name},
        dataType: "json"
      }).done(function(data){
          if (data.length > 0) {
            var template = $('#user_update').html();
            var el = $(template.replace('@username', '@' + name).replace('@text', data[0]))

            var pre_exist = $('.twitter_item_' + name)
            if (pre_exist.length > 0) {
                // update pre existing element to keep the order.
                pre_exist[0].innerHTML = el.html();

            } else {
                // new one, build from hidden template.
                el.addClass('twitter_item');
                el.addClass('twitter_item_' + name);
                el.insertAfter('#user_update');
                if (name == interested_users[0]) {
                    // highlight self
                    el.addClass('border border-success');
                }
            }
            if (undefined == current_users.find(function(n) { return n == name;})) {
                current_users.push(name);
                badges = current_users.length;
                $('#update_badge').text(badges);
                if (badges == 1) {
                    $('.close_me_x').removeClass('btn-secondary').addClass('btn-primary');
                }
            }
          }
      });
}

function post_status(status_text) {
    $.ajax({
        method: 'POST',
        url: "/poststatus",
        data: {text: status_text},
        dataType: "json"
      }).done(function(s){
          if (s.status == 'ok') {
              // give twitter server a while to return new result..
              window.setTimeout(function() {
                  update_recent(interested_users[0]);
              }, 1000);
          } else {
              console.log('oops...');
          }
      });
}

$(document).ready(function() {

    // search recent twitter for specified user.
    $( "#start" ).on( "keydown", function(event) {
        if(event.which == 13) {
            name = this.value;
            //undefined == current_users.find(function(n) { return n == name;})) {
            update_recent(name);
            $(this).val('');
        }
      });

      // post status
      $( "#post_status_input" ).on( "keydown", function(event) {
        if(event.which == 13) {
            post_status(this.value);
            $(this).val('');
        }
      });

    $('.close_me_x').click(function(){
      $('.twitter_item').remove();
      badges = 0;
      current_users = [];
      $('#update_badge').text(badges);
      $('.close_me_x').removeClass('btn-primary').addClass('btn-secondary');
    });
    $('#dashboard').click(function(){
      updateCurrentView(USER_TIMELINE);
      badges = 0;
      current_users = [];
      reload_users(interested_users);
    });
    $('#nav_post_status').click(function(){
      updateCurrentView(POST_STATUS);
      $('#post_status_input').focus();
    });

    $('#get_followers').click(function(){
      updateCurrentView(GET_FOLLOWERS);
      getFollowers();
    });

    $('#get_firends').click(function(){
      updateCurrentView(GET_FRIENDS);
      getFriends();
    });
  
    $('#get_welcomemessages').click(function(){
      updateCurrentView(GET_WELCOMEMESSAGES);
      getWelcomeMessages();
    });

    get_account_profile();
    getFollowers();
    getFriends();
    getWelcomeMessages();

    window.setInterval(function() {
      if (current_users.length > 0 && [USER_TIMELINE, POST_STATUS].includes(current_view)) {
        var l = time_count % current_users.length;
        update_recent(current_users[l]);
      }
      time_count += 1;
    }, TIME_INTERVAL);
});
//Jia Ma End

// Yuhua He  Start
function navigateTo(view) {
  hidePostStatus();
  hideUserTimeline();
  hideFollowersPanel();
  hideFriendsPanel();

  switch (view) {
    case USER_TIMELINE:
    case POST_STATUS:
      showPostStatus();
      showUserTimeline();
      break;
    case GET_FOLLOWERS:
      showFollowersPanel();
      break;
    case GET_FRIENDS:
      showFriendsPanel();
      break;
    default: break;
  }
};

function updateCurrentView(val) {
  current_view = val;
  navigateTo(val);
};

function hidePostStatus() {
  $('#post-status').addClass('hide-post-status');
};

function showPostStatus() {
  $('#post-status').removeClass('hide-post-status');
};

function hideUserTimeline() {
  $('#recent-updates').addClass('hide-recent-updates');
};

function showUserTimeline() {
  $('#recent-updates').removeClass('hide-recent-updates');
};

function hideFollowersPanel() {
  $('#followers-panel').addClass('hide-followers-panel');
};

function showFollowersPanel() {
  $('#followers-panel').removeClass('hide-followers-panel');
};

function hideFriendsPanel() {
  $('#friends-panel').addClass('hide-friends-panel');
};

function showFriendsPanel() {
  $('#friends-panel').removeClass('hide-friends-panel');
};

function createTableHeader() {
  return document.createElement('th');
}

function createTableRow() {
  return document.createElement('tr');
}

function createTableData() {
  return document.createElement('td');
}

function createImgTag() {
  return document.createElement('img');
}

function getFollowersTableBody() {
  return $('#followers-panel > table > tbody');
};

function emptyFollowersTable() {
  getFollowersTableBody().empty();
};

function getFriendsTableBody() {
  return $('#friends-panel > table > tbody');
};

function emptyFriendsTable() {
  getFriendsTableBody().empty();
};

function createFollowersTable(followers) {
  followers.users.forEach((user, i) => {
    const tr = createTableRow();
    const th = createTableHeader();
    const td_name = createTableData();
    const td_screen_name = createTableData();
    const td_description = createTableData();

    th.textContent = i + 1;
    td_name.textContent = user.name;
    td_screen_name.textContent = user.screen_name;
    td_description.textContent = user.description;

    tr.append(th, td_name, td_screen_name, td_description)

    getFollowersTableBody().append(tr);
  });
};

function createFriendsTable(friends) {
  friends.users.forEach((friend, i) => {
    const tr = createTableRow();
    const th = createTableHeader();
    const img = createImgTag();
    const td_profile = createTableData();
    const td_name = createTableData();
    const td_screen_name = createTableData();
    const td_description = createTableData();

    th.textContent = i + 1;
    img.setAttribute('src', friend.profile_image_url);
    td_name.textContent = friend.name;
    td_screen_name.textContent = friend.screen_name;
    td_description.textContent = friend.description;

    td_profile.append(img);
    tr.append(th, td_profile, td_name, td_screen_name, td_description);

    getFriendsTableBody().append(tr);
  });
};

function getFollowers() {
  $.ajax({
      method: 'GET',
      url: "/followers",
      dataType: "json"
    }).done(function(response) {
      emptyFollowersTable();
      createFollowersTable(response);
    }).fail((error) => {
      console.warn('error', error);
    });
};

function getFriends() {
  $.ajax({
      method: 'GET',
      url: "/firends",
      dataType: "json"
    }).done(function(response) {
      emptyFriendsTable();
      createFriendsTable(response);
    }).fail((error) => {
      console.warn('error', error);
    });
};
// Yuhua He End

// Ying Liu Start

function getWelcomeMessagesTableBody() {
    return $('#welcomemessages-panel > table > tbody');
};

function emptyWelcomeMessagesTable() {
    getWelcomeMessagesTableBody().empty();
};

function createWelcomeMessagesTable(welcomemessages) {
    welcomemessages.users.forEach((welcomemessage, i) => {
                          const tr = createTableRow();
                          const th = createTableHeader();
                          const img = createImgTag();
                          const td_profile = createTableData();
                          const td_name = createTableData();
                          const td_screen_name = createTableData();
                          const td_description = createTableData();
                          
                          th.textContent = i + 1;
                          img.setAttribute('src', welcomemessage.profile_image_url);
                          td_name.textContent = welcomemessage.name;
                          td_screen_name.textContent = welcomemessage.screen_name;
                          td_description.textContent = welcomemessage.description;
                          
                          td_profile.append(img);
                          tr.append(th, td_profile, td_name, td_screen_name, td_description);
                          
                          getWelcomeMessagesTableBody().append(tr);
                          });
};

function getWelcomeMessages() {
    $.ajax({
           method: 'GET',
           url: "/welcomemessages",
           dataType: "json"
           }).done(function(response) {
                   emptyWelcomeMessagesTable();
                   createWelcomeMessagesTable(response);
                   }).fail((error) => {
                           console.warn('error', error);
                           });
};

function getCollectionsTableBody() {
    return $('#collections-panel > table > tbody');
};
                  
function emptyCollectionsTable() {
    getCollectionsTableBody().empty();
};
                  
function createCollectionsTable(collections) {
    collections.users.forEach((collection, i) => {
                          const tr = createTableRow();
                          const th = createTableHeader();
                          const img = createImgTag();
                          const td_profile = createTableData();
                          const td_name = createTableData();
                          const td_screen_name = createTableData();
                          const td_description = createTableData();
                                                
                          th.textContent = i + 1;
                          img.setAttribute('src', collection.profile_image_url);
                          td_name.textContent = collection.name;
                          td_screen_name.textContent = collection.screen_name;
                          td_description.textContent = collection.description;
                                                
                          td_profile.append(img);
                          tr.append(th, td_profile, td_name, td_screen_name, td_description);
                                                
                          getCollectionsTableBody().append(tr);
                          });
};
                  
function getCollections() {
    $.ajax({
           method: 'GET',
           url: "/collections",
           dataType: "json"
           }).done(function(response) {
                   emptyCollectionsTable();
                   createCollectionsTable(response);
                   }).fail((error) => {
                            console.warn('error', error);
                            });
};

// Ying Liu End

