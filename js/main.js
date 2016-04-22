$(function(){
  var h1 = $('.default-header h1');

  $(window).on('load resize', function() {
    var top = h1.position().top;
    var bottom = $(window).height() - top - (h1.height());
    var adj = 25;

    $('.traits').css('margin-bottom', (bottom - adj)+'px');
  });


  function locationHash(arg){
    if(arg && locationHash() != arg) window.location.hash = arg;
    return window.location.hash;
  };

  function scrollTo(sectionId){
    var target = $(sectionId);
    if(target.length < 1) return;

    if(locationHash() != sectionId)
      locationHash(sectionId);

    var h1Top = h1.position().top;
    var targetTop = target.offset().top;

    $(window).scrollTop(targetTop - h1Top);
  };


  $(window).on('load hashchange', function(){
    if(locationHash()) scrollTo(locationHash());
  });


  $('nav a').click(function(e){
    e.preventDefault();
    scrollTo($(this).attr('href'));
  });
});
