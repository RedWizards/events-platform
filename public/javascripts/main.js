/* Transparent navbar script */

$(window).on('scroll', pd.checkScrollForTransparentNavbar);


/* Easing scroll */

$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});


/* Tooltip - Back to top */

$(document).ready(function(){
  $('#arrow-top').tooltip({title: "BACK TO TOP", animation: true});   
});