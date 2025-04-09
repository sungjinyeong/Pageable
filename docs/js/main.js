document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelectorAll(".header ul li a");
  var pageable = new Pageable("main", {
      animation: 400,
      onInit: updateAnchorColor,
      onStart: updateAnchorColor,  // 스크롤 시작할 때 색상 변경
      onFinish: updateAnchorColor  // 스크롤 종료 후에도 색상 유지
  });

  function updateAnchorColor(data) {
      var index = data.index + 1;
      var isEven = index % 2 === 0;
      header.forEach(anchor => {
          anchor.style.transition = "color 0.2s ease"; // 부드러운 전환
          anchor.style.color = isEven ? "#000" : "#fff";
      });
  }
});
