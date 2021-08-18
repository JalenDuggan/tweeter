/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function() {

  $('#submit-tweet').submit(function (event) {
    event.preventDefault();
    const tweet = $( this ).serialize()
    if (tweet === 'text=' || tweet === null) {
      $( "#text-amount-error" ).hide();
      if ( $( "#empty-tweet-error" ).is( ":hidden" ) ) {
        $( "#empty-tweet-error" ).slideDown( "slow" );
      }
    } else if (tweet.length > 145) {
      $( "#empty-tweet-error" ).hide();
      if ( $( "#text-amount-error" ).is( ":hidden" ) ) {
        $( "#text-amount-error" ).slideDown( "slow" );
      } 
    } else {

      $( "#empty-tweet-error" ).hide();
      $( "#text-amount-error" ).hide();

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $( this ).serialize(),
      });
      return loadTweets();
      
    }
  })

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetData) {
      renderTweets(tweetData);
    });
  }
  
  loadTweets()

  // Test / driver code (temporary)
  

});

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {

    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $tweet =  createTweetElement(tweet)
    const container = $("#tweets-container");
    container.prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }

}

const escapeX = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function (tweetObj) {
  return `<article class="full-tweet">
  <div class="other-tweets">
    <div>
      <img class="avatar" src=${escapeX(tweetObj.user.avatars)} alt="avatar">
      <h4>${escapeX(tweetObj.user.name)}</h4> 
    </div>
    <h4 class="tag">${escapeX(tweetObj.user.handle)}</h4>
  </div>
  <div>
    <p>
      <b>${escapeX(tweetObj.content.text)}</b>
    </p>
  </div>
  <hr>
  <div class="reaction">
    <h5>
      ${timeago.format(tweetObj.created_at)}
    </h5>
    <div class="test">
      <i class="fas fa-flag react"></i>
      <i class="fas fa-retweet react"></i>
      <i class="fas fa-heart react"></i>
    </div>
    
  </div>
</article>`;
  
}




