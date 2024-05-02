$(".top-slider__inner").slick({
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
});

$(".star").rateYo({
  starWidth: "17px",
  normalFill: "#ccccce",
  ratedFill: "#ffc35b",
  readOnly: true,
});
