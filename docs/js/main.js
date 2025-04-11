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
  
    const pageable = new Pageable("main", {
      animation: 400,
      onInit: updateHeader,
      onStart: updateHeader,
      onFinish: updateHeader
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
  