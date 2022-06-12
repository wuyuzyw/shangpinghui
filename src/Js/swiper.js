import Swiper from 'swiper/js/swiper'
export default function (ref) {
  if (!ref) {
    ref = '#mySwiper'
  }
  const mySwiper = new Swiper(ref, {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      pauseOnMouseEnter: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
  mySwiper.el.onmouseover = function () {
    mySwiper.autoplay.stop()
  }
  mySwiper.el.onmouseout = function () {
    mySwiper.autoplay.start()
  }
  return mySwiper
}
