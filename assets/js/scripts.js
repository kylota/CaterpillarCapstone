$(document).ready(function() {

    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'div',
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000
    });
  
  });
      function openNav() {
        document.getElementById("mySidenav").style.width = "300px";
      }
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      } 