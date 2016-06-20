$(function(){
  var h1 = $('.default-header h1');
  var focusableEls =  $('ul li, h2', $('section'));


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


  function scrollTo(target){
    target = $(target);

    var h1Top = h1.position().top;
    var targetTop = target.offset().top;

    $(window).scrollTop(targetTop - h1Top);

    target.addClass('active');
  };


  function scrollToSection(sectionId){
    var section = $(sectionId);
    if(section.length < 1) return;

    if(locationHash() != sectionId)
      locationHash(sectionId);

    scrollTo(section);
  };


  $(window).on('load hashchange', function(){
    if(locationHash()) scrollToSection(locationHash());
  });


  $(document).on('keydown', function(e){
    var key = e.keyCode;

    if(key == 38 || key == 40 || key == 32) {
      e.stopPropagation();
      e.preventDefault();

      var index = focusableEls.index(focusableEls.filter('.active'));

      if(key == 38) // Up
        index -= 1;

      else if(key == 40 || key == 32) // Down or Space
        elem = index += 1;

      if(index > -1 && index < focusableEls.length)
        scrollTo(focusableEls.get(index));

      return false;
    }
  });


  $('nav a').click(function(e){
    e.preventDefault();
    scrollToSection($(this).attr('href'));
  });


  var setActive = function() {
    var closest = {dist: 10000, elem: null};

    focusableEls.each(function(i, v){
      v = $(v);

      var diff = Math.abs($(v).offset().top - h1.offset().top);

      if(diff < closest.dist){
        closest.dist = diff
        closest.elem = v;
      }
    });

    focusableEls.filter('.active').removeClass('active');
    closest.elem.addClass('active');
  };


  $(window).scroll(setActive);
  setActive();
});
