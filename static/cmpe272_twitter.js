
var interested_users = ['Jia31759270', 'elonmusk', 'spaceX', 'nasa', 'asdf', 'sanjosetrails', 'YosemiteNPS', 'realDonaldTrump'];
var current_users = [];
var badges = current_users.length;

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
                $('.close_me_x').removeClass('btn-secondary').addClass('btn-primary');
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
        badges = 0;
        current_users = [];
        reload_users(interested_users);
    });
    $('#nav_post_status').click(function(){
        $('#post_status_input').focus();
    });
    reload_users(interested_users);
});
