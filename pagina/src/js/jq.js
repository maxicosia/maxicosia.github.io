$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});

var owl = $(".owl-carousel");
owl.owlCarousel({
  items: 6,
  loop: true,
  margin: 45,
  autoplay: true,
  autoplayTimeout: 1000,
  autoplayHoverPause: true,
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 3,
      nav: false,
    },
    1000: {
      items: 5,
      nav: true,
      loop: false,
    },
  },
});

$(".loop").owlCarousel({
  center: true,
  items: 2,
  loop: true,
  margin: 10,
  responsive: {
    600: {
      items: 4,
    },
  },
});
/* $(".play").on("click", function () {
  owl.trigger("play.owl.autoplay", [1000]);
});
$(".stop").on("click", function () {
  owl.trigger("stop.owl.autoplay");
});
 */
