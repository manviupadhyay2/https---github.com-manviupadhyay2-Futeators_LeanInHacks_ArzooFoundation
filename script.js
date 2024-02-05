document.addEventListener("DOMContentLoaded", function() {
    // Slider
    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');
    let lengthItems = items.length - 1;
    let active = 0;
    let refreshInterval = setInterval(() => { next.click() }, 5000);
  
    next.onclick = function() {
      active = active + 1 <= lengthItems ? active + 1 : 0;
      reloadSlider();
    }
  
    prev.onclick = function() {
      active = active - 1 >= 0 ? active - 1 : lengthItems;
      reloadSlider();
    }
  
    function reloadSlider() {
      slider.style.left = -items[active].offsetLeft + 'px';
  
      let last_active_dot = document.querySelector('.slider .dots li.active');
      last_active_dot.classList.remove('active');
      dots[active].classList.add('active');
      clearInterval(refreshInterval);
      refreshInterval = setInterval(() => { next.click() }, 5000);
    }
  
    dots.forEach((li, key) => {
      li.addEventListener('click', () => {
        active = key;
        reloadSlider();
      })
    })
  
    window.onresize = function(event) {
      reloadSlider();
    };
  
    // Carousel
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];
  
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
  
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
  
    carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
  
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  
    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
      });
    });
  
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    }
  
    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
  
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    }
  
    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
  
      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlay();
    }
  
    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
  });
  let valueDisplays = document.querySelectorAll(".counter-numbers");
  let interval = 10000;
  
  valueDisplays.forEach((valueDisplay) => {
    let startValue = 4000;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function() {
      startValue += 2;
      valueDisplay.textContent = startValue;
      if (startValue >= endValue) { // Change the condition to stop when startValue is equal to or greater than endValue
        clearInterval(counter);
      }
    }, duration);
  });
  
  window.addEventListener('scroll', function() {
    var nav = document.querySelector('.navigationbar');
    if (window.scrollY > 0) {
      nav.classList.add('fixed-nav');
    } else {
      nav.classList.remove('fixed-nav');
    }
  });
  
  
  function openDonationPage() {
      window.location.href = 'donation.html';
  }
  
  
  function openApproachPage() {
      window.location.href = 'approach.html';
  }
  
  