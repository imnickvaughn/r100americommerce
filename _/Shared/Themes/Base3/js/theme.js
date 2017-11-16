$(document).on("click",".ui-menu, .ui-menu a", function(e){
  //this is so the search dropdown doesn't close when clicking an autocomplete result
  e.stopPropagation();
  e.preventDefault();
});

// used for the dropdown shopping cart "x" button. 
$(".clear-item-link").click(function (e) {
  $(this).closest(".media").find("input[type=text]").val(0).trigger("change");
  
  flashUpdateAttention();
  
  e.preventDefault();
  e.stopPropagation();
});


$("a[href*=TellAFriend]").each(function(){
  var el = $(this);
  el.removeAttr("onclick").addClass("quick-view").attr("data-href", el.attr("href")).append("<span class='hidden product-name'>Tell a Friend</span>");
});

function flashUpdateAttention(callback) {
  
  $(".update-qty-link").addClass("alert alert-warning");
  $(".update-qty-link a").addClass("alert-link");
  
  $(".update-attention").hide().removeClass("hide").fadeIn()
  .animate({
    "margin-right": 50
  }, 250, function () {
    $(this).animate({
      "margin-right": 0
    }, 200, function () {
      $(this).animate({
        "margin-right": 25
      }, 150, function () {
        $(this).animate({
          "margin-right": 0
        }, 50, function () {
          $(this).fadeOut(2000);
        });
      });
    });
  });
}

//set placeholder text for several text boxes
$("#txtRedirectSearchBox").attr("placeholder", "Search");
$(".LoginContinueThemeButton").val("Register");
$("#txtEmailAddress").attr("placeholder", "Affiliate Code");
$("#txtPassword").attr("placeholder", "Password");
$(".EmailAddressTextbox").attr("placeholder", "Email address");
$(".PasswordTextbox").attr("placeholder", "Password");
$(".LoginContinueThemeButton").val("Register");


// quick-view modals.
$(function () {
  //modal's markup is located in the footer.
  
  $(document).on("click", ".quick-view", function (e) {
    var modalZindex = window.parent.modalZindex || 1052;
    var $modal = $("div#iframe-modal:first").clone();
    $modal.appendTo("body");
    
    modalZindex++
    window.parent.$("div#iframe-modal:last").css("z-index", modalZindex);
    window.parent.$("div.modal-backdrop:last").css("z-index", modalZindex - 1);
    window.parent.modalZindex = modalZindex;
    
    $modal.find(".modal-title").text(($(this).find(".product-name").length > 0 ? $(this).find(".product-name").text() : $(this).data("title")));
    $modal.find("#modal-iframe").attr("src", $(this).data("href"));
    $modal.modal();
    $modal.on("hidden.bs.modal", function () {
      $(this).find("#modal-iframe").attr("src", "about:blank").height(400);
      window.parent.$("div.modal:last").remove();
    });
    e.preventDefault();
  });
  
});

if ($(".category-product").length){
  var classList = $(".category-product")[0].classList ? 
      $(".category-product")[0].classList : 
  $(".category-product")[0].className.split(" ");
  
  var colClasses = $.grep(classList, function(cl) { return cl.indexOf("col-") > -1 });
  colClasses = colClasses.join(" ");
}

$(".layout-grid, .layout-list").click(function(e){
  e.preventDefault();
  $(".category-product").toggleClass(colClasses + " grid-view col-xs-12 list-view clearfix left");
  $(".category-product .thumbnail").toggleClass("col-md-4")
  $(".category-product .caption").toggleClass("center left pad-l-20 no-overflow col-md-8");
  $(this).toggleClass("icon-th icon-align-justify");
});


// add bootstrap button classes to buttons.
$('button, input[type=button], :submit').addClass('btn btn-default');
$(".SignInThemeButton, .AddToCartThemeButton, .CheckoutThemeButton, .PlaceOrderThemeButton").removeClass("btn-default").addClass("btn-primary");




//We're in an iframe!!!
//do special stuff to handle stuff
if (window != window.parent && window.name == "modalIframe") {
  
  //makes modals open form posts in main window instead of inside iframe. such as adding to cart from quick view.
  //set dontEscape = true on a page to make it post inside the iframe.
  if (!dontEscape)
    $("form").attr("target", "_top");
  
  //get rid of everything but content.
  $(".page-header").hide();
  $(".LayoutTop, .LayoutBottom, .LayoutLeftColumn, .LayoutRightColumn, p:contains(by AmeriCommerce)").hide();
  $(function(){
    $("p:contains('Ecommerce software by')").hide();
  });
  
  //set iframe height to the height of the page.
  //use window.load to ensure that images and stuff are loaded and other scripts have initialized such as the thumbnail slider
  $(window).load(function () {
    
    //put in a try catch because sometimes the iframe is https and can't access the parent window. :( ex. login page.
    try {
      var pageHeight = $("body").height();
      var modalZindex = window.parent.modalZindex || 1052;
      setInterval(function(){
        var pageHeight = $("body").height();
        if (window.currentHeight != pageHeight){
          window.parent.$("div#iframe-modal:last #modal-iframe").animate({
            "height": pageHeight,
            "opacity": 1
          }, 100);
        }
        window.currentHeight = pageHeight;
      }, 250);
      
      modalZindex++
      window.parent.$("div#iframe-modal:last").css("z-index", modalZindex);
      window.parent.$("div.modal-backdrop:last").css("z-index", modalZindex - 1);
      window.parent.modalZindex = modalZindex;
    } catch (err) {
      $("body,html").css("overflow", "");
    }
    
  });
}