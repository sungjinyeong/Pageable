// Header font color control
document.addEventListener("DOMContentLoaded", function () {
    const headerLinks = document.querySelectorAll(".header ul li a");
  
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
  
    // 드래그 막기
    const pageable = new Pageable("main", {
      animation: 400,
      onInit: updateHeader,
      onStart: updateHeader,
      onFinish: updateHeader,
      events: {
        mouse: true,
        wheel: true,
        touch: true,
        keydown: true
      }
    });
    
  
    function updateHeader(data) {
      const index = data.index;
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
  });
  
// 스폰 스와이퍼퍼
new Swiper(".spon_swiper", {
  slidesPerView: 6,
  slidesPerGroup: 1,
  loop: false,
  navigation: false,
  pagination: false,
  allowTouchMove: true,
  breakpoints: {
    1000: {
      slidesPerView: 5
    },
    700: {
      slidesPerView: 4
    },
    500: {
      slidesPerView: 3
    },
    0: {
      slidesPerView: 2
    }
  }
});



// 6리스트
let insideSwiper = null;

function initInsideSwiper() {
  const ww = window.innerWidth;

  if (ww < 1200) {
    if (!insideSwiper) {
      insideSwiper = new Swiper(".inside_swiper", {
        slidesPerView: ww <= 500 ? 1 : 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  } else {
    if (insideSwiper) {
      insideSwiper.destroy(true, true);
      insideSwiper = null;
    }
  }
}

window.addEventListener('load', initInsideSwiper);
window.addEventListener('resize', initInsideSwiper);





new Swiper(".keySwiper", {
  loop: true,
  spaceBetween: 20,
  centeredSlides: false,
  slidesPerView: 4,
  slidesPerGroup: 1,
  breakpoints: {
    1000: {
      slidesPerView: 4,
      slidesPerGroup: 1,
      centeredSlides: false
    },
    750: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      centeredSlides: true
    },
    500: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      centeredSlides: true
    },
    0: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      centeredSlides: true
    }
  }
});




// Input select 입력 가능 script
Pageable.prototype._start = function(e) {
  const evt = this._getEvent(e);

  if (this.scrolling || this.dragging) return false;

  // ✅ 입력 필드 클릭 무시 (막지 말 것)
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(evt.target.tagName)) return;

  if (e.type === "touchstart") {
    if (!this.events.touch) {
      if (!evt.target.closest("a")) this._preventDefault(e);
      return false;
    }
  }

  if (e.type === "mousedown") {
    if (!this.events.mouse || e.button !== 0) return false;
  }

  if (!evt.target.closest(this.config.childSelector)) return false;

  this._preventDefault(e);
  this.dragging = this.config.freeScroll;

  if (this.config.slideshow) this.slider.stop();

  this.down = {
    x: evt.clientX,
    y: evt.clientY
  };

  this.startIndex = this.index;
  this.config.onBeforeStart.call(this, this.index);
};




// input active style
$(document).on('input', '.sel .user_data li input, .sel textarea', function () {
  if ($(this).val().trim() !== '') {
    $(this).addClass('active');
  } else {
    $(this).removeClass('active');
  }
});

$(document).on('click', '.sel .choice_list li', function () {
  $(this).addClass('active').siblings().removeClass('active');
});


new Pageable("main", {
  animation: 400,
  onFinish: function(data){
    document.querySelectorAll("input, textarea").forEach(el => {
      el.disabled = false;
    });
  }
});