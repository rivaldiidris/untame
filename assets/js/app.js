
(function (window, $, fx) {
    $(function () {
        
    });
}(window, jQuery, FXM));

function myFunction() {
  var x = document.getElementById("menu2");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
};

const navbar1 = document.querySelector('#nav1');
const navbar2 = document.querySelector('#nav2');
const sideMenu= document.querySelector('#menu2');

window.addEventListener('scroll', function(e) {
  const lastPosition = window.scrollY
  if (lastPosition > 100 ) {
    navbar2.classList.remove('hidden')
    sideMenu.classList.remove('hidden')
    navbar1.classList.add('hidden')
  } else {
    navbar2.classList.add('hidden')
    sideMenu.classList.add('hidden')
    navbar1.classList.remove('hidden')
  }
});

$(window).scroll(function() {
    var wScroll = $(this).scrollTop();
    if( wScroll > $('body').offset().top - 50 ){
      $('#section1 header img').css({
        'transform' : 'translate(0px, '+ wScroll/2 +'%)'
      });
    };

    if( wScroll > $('body').offset().top - +100 ){
      $('.rebooting').css({
        'filter' : 'saturate(100%)',
        'transform' : 'translate(0px, -5%) scale(0.4)',
      });
      $('.progress-bar').css({
        'width' : '100%',
      });
      $('.loading-bar').css({
        'opacity' : '0',
      });
      $('.presentation').css({
        'opacity' : '1',
        'transform' : 'scale(1)',
      });
    };

    if( wScroll > $('#section2').offset().top - +600){
      $('#section1 .rebooting').css({
        'transform' : 'translate(0px, '+ wScroll/16 +'%) scale(0.4)',
        'transition-delay' : '0s',
        // 'opacity' : '0',
      });
      $('#section1 .presentation').css({
        'transform' : 'translate(0px, '+ wScroll/24 +'%)',
        'transition-delay' : '0s',
        // 'opacity' : '0',
      });
      $('#section2').css({
        // 'transform' : 'translate(0px, '+ -wScroll/600 +'%)',
        'transition-delay' : '0s',
      });
    };
    if( wScroll > $('#section3').offset().top - +1000){
      $('#section3').css({
        'transform' : 'translate(0px, '+ -wScroll/700 +'%)',
        // 'opacity' : '1',
        'transition-delay' : '0s',
      });
    };
    if( wScroll > $('#section3 .our-games').offset().top - +300){
      $('#section3 .our-games').addClass('muncul');
    };
    if( wScroll > $('#partnership').offset().top - +700){
      $('#partnership').css({
        'transform' : 'translate(0px, '+ -wScroll/100 +'%)',
      });
      $('footer').css({
        'transform' : 'translate(0px, '+ -wScroll/50 +'%)',
      });
    };

    // if( wScroll = $('.rebooting').offset().top - 100 ){
    //   $('.rebooting').css({
    //     'transform' : 'scale(0.5)'
    //   });
    //   $('.loading-bar').css({
    //     'opacity' : '0',
    //   });
    // };
    // console.log(wScroll);    
});

$(function () {
  FXM.backToTop(".back-to-top", {
      duration: 500,
      hideClass: "is-hidden",
  });
});