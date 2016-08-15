var $body, $slideNavList;

$(document).ready(function() {
  $body = $('body');
  $slideNavList = $('.slide-nav-list');

  $('.slide-nav-link').click(function(event) {
    event.preventDefault();

    var currentIndex = $body.attr('data-active-slide');
    var newIndex = $(this).parent().index();

    if (newIndex < currentIndex || newIndex > currentIndex) {
      goToSlide(newIndex, currentIndex);
    }
  });
});

var goToSlide = function(newIndex, currentIndex) {
  var currentSlideData = 'data-slide="' + currentIndex + '"'
  var $currentSlideBackground = $('.slide-background-container[' + currentSlideData + ']');
  var $currentSlideContent = $('.slide-content', '.slide[' + currentSlideData + ']');

  var newSlideData = 'data-slide="' + newIndex + '"'
  var $newSlideBackground = $('.slide-background-container[' + newSlideData + ']');
  var $newSlide = $('.slide[' + newSlideData + ']');
  var $newSlideContent = $('.slide-content', '.slide[' + newSlideData + ']');
  var $newSlideContentContainer = $('.slide-content-container', '.slide[' + newSlideData + ']');

  $newSlideBackground.addClass('is-opaque');
  $slideNavList.removeClass('is-opaque');

  // Wait times are based off css transition speeds.
  setTimeout(function() {
    $body.attr('data-active-slide', newIndex);
    $body.removeClass('theme-light theme-dark').addClass('theme-' + $newSlide.attr('data-theme'));
    $currentSlideContent.removeClass('is-opaque');

    setTimeout(function() {
      $newSlideContent.addClass('is-opaque');
      $slideNavList.appendTo($newSlideContentContainer);

      setTimeout(function() {
        $('.slide-nav-link.is-opaque').removeClass('is-opaque');
        $('.slide-nav-link:eq(' + newIndex + ')').addClass('is-opaque');
        $slideNavList.addClass('is-opaque');
        $currentSlideContent.removeClass('is-opaque');
        $currentSlideBackground.removeClass('is-opaque');
      }, 700); // wait for slide content to finish
    }, 300); // wait for slide background to start
  }, 250); // wait for slide nav
};
