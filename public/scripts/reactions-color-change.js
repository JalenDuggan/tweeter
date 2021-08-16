
$(document).ready(function() {
  
  $("i.react")
  .on("mouseenter", function() {
    $( this ).css({
      "color": "#c7982c",
    });
  })
  .on( "mouseleave", function() {
    const styles = {
      color : "#39589d",
    };
    $( this ).css( styles );
  });


});