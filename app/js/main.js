// slider blog

$(".blog-page__slider").slick({
  prevArrow:
    '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="arrow"><path fill="#134563" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"></path></svg></button>',
  nextArrow:
    '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="arrow"><path fill="#134563" d="m-210.9-289-2-2 11.8-11.7-11.8-11.7 2-2 13.8 13.7-13.8 13.7" transform="translate(237 335)"></path></svg></button>',
  infinite: false,
});

//MENU RWVIEWS AND DESCRIPTION
$(".product-tabs__top-item").on("click", function (e) {
  e.preventDefault();
  $(".product-tabs__top-item").removeClass("product-tabs__top-item--active");
  $(this).addClass("product-tabs__top-item--active");

  $(".product-tabs__content-item").removeClass(
    "product-tabs__content-item--active"
  );
  $($(this).attr("href")).addClass("product-tabs__content-item--active");
});
//SLICK SLIDER TWO
$(".product-slide__thumb").slick({
  asNavFor: ".product-slide__big",
  focusOnSelect: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  vertical: true,
  draggable: false,
});
$(".product-slide__big").slick({
  asNavFor: ".product-slide__thumb",
  draggable: false,
  fade: true,
});
// ON OF SCREEN MAX AND MIN SEE
$(".shop-content__filter-btn").on("click", function () {
  $(".shop-content__filter-btn").removeClass(
    "shop-content__filter-btn--active"
  );
  $(this).addClass("shop-content__filter-btn--active");
});

$(".button-list").on("click", function () {
  $(".product-item").addClass("product-item--list");
});

$(".button-grid").on("click", function () {
  $(".product-item").removeClass("product-item--list");
});
//RANGE SLIDER
$(".select-style, .product-one__num").styler();
$(".filter-price__input").ionRangeSlider({
  type: "double",
  prefix: "$",
  onStart: function (data) {
    $(".filter-price__from").text(data.from);
    $(".filter-price__to").text(data.to);
  },
  onChange: function (data) {
    $(".filter-price__from").text(data.from);
    $(".filter-price__to").text(data.to);
  },
});
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
// REITING Star
$(".star").rateYo({
  starWidth: "17px",
  normalFill: "#ccccce",
  ratedFill: "#ffc35b",
  readOnly: true,
  // starSvg:
  //   ' <svg width="18" height="18" viewBox="0 0 24 24" id="star"> <path fill="#ccccce"d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z"transform="translate(2 2.5)"></path></svg>',
});
//  TIME OUT SLIDE
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.querySelector(".promo__clock");
  const daysSpan = clock.querySelector(".promo__days");
  const hoursSpan = clock.querySelector(".promo__hours");
  const minutesSpan = clock.querySelector(".promo__minutes");
  const secondsSpan = clock.querySelector(".promo__seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = $(".promo__clock").attr("data-time");
initializeClock("promo__clock", deadline);
