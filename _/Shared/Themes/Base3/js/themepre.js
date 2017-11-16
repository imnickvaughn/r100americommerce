var inIframe = false;
//in an  iframe, hide scroll bar.
if (window != window.parent && window.name == "modalIframe") {
  inIframe = true;
  $("body,html").css("overflow", "hidden");
  $("body").hide();
}

//global scope variable to keep popstate from firing on a normal page load.
var popState = false;

//global scope variable to allow certain modal pages to not post out to the parent.
var dontEscape = false;


//modification to the way bootstrap dropdowns work. this makes them work on hover at normal rez and on click/touch on phone/tablet
$(function () {
  
  if(inIframe){
    var styleSheets = $("link");
    styleSheets.each(function(){
      var qs = "&";
      if (this.href.indexOf("?") == -1)
        qs = "?";
      this.href = this.href + qs + "iframe=1";
    });
    setTimeout(function(){
      $("body").fadeIn();
    }, 250);
  }
  
  var $win = $(window);
  $win.resize(function () {
    if ($win.width() > 768)
      $(".navbar-nav > .dropdown > a").attr("data-toggle", "");
    else
      $(".navbar-nav > .dropdown > a").attr("data-toggle", "dropdown");
  }).resize();
  $(".dropdown-menu").find("input, button").each(function () {
    $(this).click(function (e) {
      e.stopPropagation();
    });
  });
});