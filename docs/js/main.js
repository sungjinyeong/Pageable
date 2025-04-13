// preventDefault를 호출하지 않음 – 클릭(터치) 차단 기능 제거
Pageable.prototype._start = function(e) {
  const evt = this._getEvent(e);

  if (this.scrolling || this.dragging) return false;

  // 폼(form) 내부 요소 터치 여부와 상관없이 바로 return하지 않고,
  // 이벤트 차단 로직 자체를 아예 제거합니다.
  // 만약 폼 영역에 대해서는 별도로 터치가 전달되게 하려면, 아래 if는 삭제하거나 주석 처리합니다.
  // if (evt.target.closest('form, input, textarea, select, button')) return;

  if (e.type === "touchstart") {
    if (!this.events.touch) {
      // if (!evt.target.closest("a")) this._preventDefault(e);
      return false;
    }
  }

  if (e.type === "mousedown") {
    if (!this.events.mouse || e.button !== 0) return false;
  }

  if (!evt.target.closest(this.config.childSelector)) return false;

  // 이벤트 차단을 완전히 제거!
  // this._preventDefault(e);

  this.dragging = this.config.freeScroll;

  if (this.config.slideshow) this.slider.stop();

  this.down = {
    x: evt.clientX,
    y: evt.clientY
  };

  this.startIndex = this.index;
  this.config.onBeforeStart.call(this, this.index);
};


// 2. 단일 Pageable 인스턴스 생성 (다른 Pageable 호출은 주석 처리)
const pageable = new Pageable("main", {
  animation: 400,
  onInit: updateHeader,
  onStart: updateHeader,
  onFinish: function(data) {
    updateHeader(data);
    // 모든 input, textarea 활성화 (혹은 disabled를 재설정)
    document.querySelectorAll("input, textarea").forEach(el => {
      el.disabled = false;
    });
  },
  events: {
    mouse: true,
    wheel: true,
    touch: true,
    keydown: true
  }
});

// Header 폰트 컬러 제어 함수
function updateHeader(data) {
  const headerLinks = document.querySelectorAll(".header ul li a");
  const index = data ? data.index : 0;
  const sectionColors = [
    "#ffffff", // Page 1
    "#000000", // Page 2
    "#ffffff", // Page 3
    "#000000", // Page 4
    "#ffffff", // Page 5
    "#ffffff", // Page 6
    "#000000", // Page 7
    "#000000", // Page 8
    "#000000", // Page 9
  ];
  const currentColor = sectionColors[index] || "#ffffff";

  headerLinks.forEach(link => {
    const li = link.closest("li");
    if (!li.classList.contains("active")) {
      link.style.color = currentColor;
    }
  });

  const whiteLogo = document.querySelector(".logo img.wh_logo");
  const redLogo = document.querySelector(".logo img.rd_logo");

  if (whiteLogo && redLogo) {
    if (currentColor === "#000000") {
      redLogo.style.opacity = "1";
      whiteLogo.style.opacity = "0";
    } else {
      redLogo.style.opacity = "0";
      whiteLogo.style.opacity = "1";
    }
  }
}

// 스폰서 슬라이더 등 다른 Swiper 인스턴스들
new Swiper(".spon_swiper", {
  slidesPerView: 6,
  slidesPerGroup: 1,
  loop: false,
  navigation: false,
  pagination: false,
  allowTouchMove: true,
  breakpoints: {
    1000: { slidesPerView: 5 },
    700: { slidesPerView: 4 },
    500: { slidesPerView: 3 },
    0: { slidesPerView: 2 }
  }
});

new Swiper(".keySwiper", {
  loop: true,
  spaceBetween: 20,
  centeredSlides: false,
  slidesPerView: 4,
  slidesPerGroup: 1,
  breakpoints: {
    1000: { slidesPerView: 4, slidesPerGroup: 1, centeredSlides: false },
    750: { slidesPerView: 3, slidesPerGroup: 1, centeredSlides: true },
    500: { slidesPerView: 2, slidesPerGroup: 1, centeredSlides: true },
    0: { slidesPerView: 1.5, slidesPerGroup: 1, centeredSlides: true }
  }
});

console.log("터치 대상:", evt.target, evt.target.closest('form, input, textarea, select, button'));
document.querySelector('.form_data .sel form')
  .addEventListener('touchstart', function(e) {
    e.stopPropagation(); // 터치 이벤트가 부모로 전파되지 않도록
  });
