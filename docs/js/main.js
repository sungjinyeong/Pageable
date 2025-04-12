// Header font color control
document.addEventListener("DOMContentLoaded", function () {
    const headerLinks = document.querySelectorAll(".header ul li a");
  
    const sectionColors = [
      "#ffffff", // Page 1
      "#000000", // Page 2
      "#ffffff", // Page 3
      "#000000", // Page 4
      "#ffffff", // Page 5
      "#000000", // Page 6
      "#ffffff", // Page 7
      "#ffffff", // Page 8
      "#000000", // Page 9
      "#000000"  // Page 10
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
  spaceBetween: 10,
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


// Input select 입력 가능 script
Pageable.prototype._start = function(e) {
  const evt = this._getEvent(e);

  if (this.scrolling || this.dragging) return false;

  // 🛠 입력 필드에서 클릭은 무시하고 패스시킴
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(evt.target.tagName)) return;

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

  this._preventDefault(e);  // ← 여전히 기타 요소는 막음

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
$(document).on('input', '.sec11 .sel .user_data li input, .sec11 .sel textarea', function () {
  if ($(this).val().trim() !== '') {
    $(this).addClass('active');
  } else {
    $(this).removeClass('active');
  }
});

$(document).on('click', '.sec11 .sel .choice_list li', function () {
  $(this).addClass('active').siblings().removeClass('active');
});
