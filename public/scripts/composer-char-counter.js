$(document).ready(function() {
  // --- our code goes here ---
  console.log("hello Franco");


  $("#tweet-text").on("keyup", function() {
    // do something here
    const tweetLength = 140 - ($( this ).val().length)
    //const counterDOM = $( this ).next().children().next()
    if (tweetLength < 0) {
      return $("#number").html(tweetLength).css('color', 'red');
    } else {
      return $("#number").html(tweetLength).css('color', '#545149')
    }

  })
});
