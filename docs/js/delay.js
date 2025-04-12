const pageable = new Pageable("main", {
	animation: 400,
	delay: 300,
	onBeforeStart: function () {
	  this.pages.forEach((page, i) => {
		page.classList.remove("pg-active");
	  });
	},
	events: {
	  mouse: true,     // ✅ 마우스 클릭·드래그 허용
	  wheel: true,
	  touch: true,
	  keydown: true
	}
  });
  