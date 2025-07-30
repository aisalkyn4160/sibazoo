const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

burger.addEventListener("click", () => {
  header.classList.toggle("mobile-header");
  if (header.classList.contains("mobile-header")) {
    mobileMenu.classList.add("active");
    document.body.classList.add("no-scroll");
    burger.classList.add("active");
  } else {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("no-scroll");
    burger.classList.remove("active");
  }
});

const catalogBtn = document.querySelector(".catalog-btn");
const catalogDropdown = document.querySelector(".catalog-dropdown");

catalogBtn.addEventListener("click", () => {
  catalogBtn.classList.toggle("active");
  catalogDropdown.classList.toggle("active");
  if (catalogDropdown.classList.contains("active")) {
  } else {
  }
});


 
// Темная тема
const themeToggles = document.querySelectorAll(".theme-toggle");

// Проверяем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
   const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark-theme');
  }
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    updateThemeToggle(true);
  } else {
    document.documentElement.classList.remove('dark-theme');
    updateThemeToggle(false);
  }
});

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark-theme");
    
    // Сохраняем текущую тему в localStorage
    if (isDark) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    updateThemeToggle(isDark);
  });
});

// Функция для обновления состояния переключателя
function updateThemeToggle(isDark) {
  themeToggles.forEach((toggle) => {
    if (isDark) {
      toggle.querySelector('.theme-icon').innerHTML = `
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0968 15.8333C13.3184 15.8333 15.9301 13.2217 15.9301 10C15.9301 6.77834 13.3184 4.16667 10.0968 4.16667C6.8751 4.16667 4.26343 6.77834 4.26343 10C4.26343 13.2217 6.8751 15.8333 10.0968 15.8333Z" fill="white"/>
          <path d="M10.0968 19.1333C9.63851 19.1333 9.26351 18.7917 9.26351 18.3333V18.2667C9.26351 17.8083 9.63851 17.4333 10.0968 17.4333C10.5552 17.4333 10.9302 17.8083 10.9302 18.2667C10.9302 18.725 10.5552 19.1333 10.0968 19.1333ZM16.0468 16.7833C15.8302 16.7833 15.6218 16.7 15.4552 16.5417L15.3468 16.4333C15.0218 16.1083 15.0218 15.5833 15.3468 15.2583C15.6718 14.9333 16.1968 14.9333 16.5218 15.2583L16.6302 15.3667C16.9552 15.6917 16.9552 16.2167 16.6302 16.5417C16.4718 16.7 16.2635 16.7833 16.0468 16.7833ZM4.14684 16.7833C3.93018 16.7833 3.72184 16.7 3.55518 16.5417C3.23018 16.2167 3.23018 15.6917 3.55518 15.3667L3.66351 15.2583C3.98851 14.9333 4.51351 14.9333 4.83851 15.2583C5.16351 15.5833 5.16351 16.1083 4.83851 16.4333L4.73018 16.5417C4.57184 16.7 4.35518 16.7833 4.14684 16.7833ZM18.4302 10.8333H18.3635C17.9052 10.8333 17.5302 10.4583 17.5302 9.99999C17.5302 9.54166 17.9052 9.16666 18.3635 9.16666C18.8218 9.16666 19.2302 9.54166 19.2302 9.99999C19.2302 10.4583 18.8885 10.8333 18.4302 10.8333ZM1.83018 10.8333H1.76351C1.30518 10.8333 0.930176 10.4583 0.930176 9.99999C0.930176 9.54166 1.30518 9.16666 1.76351 9.16666C2.22184 9.16666 2.63018 9.54166 2.63018 9.99999C2.63018 10.4583 2.28851 10.8333 1.83018 10.8333ZM15.9385 4.99166C15.7218 4.99166 15.5135 4.90833 15.3468 4.74999C15.0218 4.42499 15.0218 3.89999 15.3468 3.57499L15.4552 3.46666C15.7802 3.14166 16.3052 3.14166 16.6302 3.46666C16.9552 3.79166 16.9552 4.31666 16.6302 4.64166L16.5218 4.74999C16.3635 4.90833 16.1552 4.99166 15.9385 4.99166ZM4.25518 4.99166C4.03851 4.99166 3.83018 4.90833 3.66351 4.74999L3.55518 4.63333C3.23018 4.30833 3.23018 3.78333 3.55518 3.45833C3.88018 3.13333 4.40518 3.13333 4.73018 3.45833L4.83851 3.56666C5.16351 3.89166 5.16351 4.41666 4.83851 4.74166C4.68018 4.90833 4.46351 4.99166 4.25518 4.99166ZM10.0968 2.53333C9.63851 2.53333 9.26351 2.19166 9.26351 1.73333V1.66666C9.26351 1.20833 9.63851 0.833328 10.0968 0.833328C10.5552 0.833328 10.9302 1.20833 10.9302 1.66666C10.9302 2.12499 10.5552 2.53333 10.0968 2.53333Z" fill="white"/>
        </svg>
      `;
      toggle.querySelector('p').textContent = 'Светлая тема';
    } else {
      toggle.querySelector('.theme-icon').innerHTML = `
       <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.0386 13.275C17.9053 13.05 17.5303 12.7 16.5969 12.8667C16.0803 12.9583 15.5553 13 15.0303 12.975C13.0886 12.8917 11.3303 12 10.1053 10.625C9.02192 9.41666 8.35526 7.84166 8.34692 6.14166C8.34692 5.19166 8.53026 4.275 8.90526 3.40833C9.27192 2.56666 9.01359 2.125 8.83026 1.94166C8.63859 1.75 8.18859 1.48333 7.30526 1.85C3.89692 3.28333 1.78859 6.7 2.03859 10.3583C2.28859 13.8 4.70526 16.7417 7.90526 17.85C8.67192 18.1167 9.48026 18.275 10.3136 18.3083C10.4469 18.3167 10.5803 18.325 10.7136 18.325C13.5053 18.325 16.1219 17.0083 17.7719 14.7667C18.3303 13.9917 18.1803 13.5 18.0386 13.275Z" fill="#3C3C3B"/>
        </svg>
      `;
      toggle.querySelector('p').textContent = 'Темная тема';
    }
  });
}

// animation-bnt
const animationBtns = document.querySelectorAll(".animation-btn-round");

animationBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});
// region selector
document.addEventListener("DOMContentLoaded", function () {
  // Элементы
  const changeBtn = document.querySelector(".region-selector__change-btn");
  const modal = document.querySelector(".region-selector__modal");
  const closeBtn = document.querySelector(".region-selector__close-btn");
  const cityBtns = document.querySelectorAll(".region-selector__city-btn");
  const shopBtns = document.querySelectorAll(".region-selector__shop-btn");
  const searchInput = document.querySelector(".region-selector__search-input");
  const selectedShopSection = document.querySelector(
    ".region-selector__selected-shop"
  );
  const selectedCitySpan = document.querySelector(
    ".region-selector__selected-city"
  );
  const currentRegionText = document.querySelector(
    ".region-selector__current-text"
  );

  // Текущий выбранный город
  let currentCity = "Москва";

  // Открытие модального окна
  changeBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  // Закрытие модального окна
  closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
    selectedShopSection.classList.add("hidden");
  });

  // Выбор города
  cityBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      currentCity = btn.textContent;
      selectedCitySpan.textContent = currentCity;
      currentRegionText.textContent = `Ваш регион: ${currentCity}`;
      selectedShopSection.classList.remove("hidden");

      // Здесь можно добавить AJAX запрос для получения адресов магазинов
      // или использовать заранее загруженные данные
    });
  });

  // Выбор магазина
  shopBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Здесь можно сохранить выбранный магазин в cookie/localStorage
      modal.classList.add("hidden");
      selectedShopSection.classList.add("hidden");
    });
  });

  // Поиск городов
  // searchInput.addEventListener('input', function() {
  //   const searchTerm = this.value.toLowerCase();

  //   cityBtns.forEach(btn => {
  //     const city = btn.textContent.toLowerCase();
  //     if (city.includes(searchTerm)) {
  //       btn.parentElement.style.display = 'list-item';
  //     } else {
  //       btn.parentElement.style.display = 'none';
  //     }
  //   });
  // });

  // Проверяем, есть ли сохраненный регион в localStorage
  const savedRegion = localStorage.getItem("selectedRegion");
  if (savedRegion) {
    currentRegionText.textContent = `Ваш регион: ${savedRegion}`;
    currentCity = savedRegion;
  }
});

// swiper
document.addEventListener("DOMContentLoaded", function () {
  const bannerSwiper = new Swiper(".banner-swiper", {
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const offersSwiper = new Swiper(".offers-swiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
    },
  });

  const brandsSwiper = new Swiper(".brands-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    grid: {
      rows: 2,
    },

    navigation: {
      nextEl: ".brands-swiper-button-next",
      prevEl: ".brands-swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
      },
    },
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const productThumbs = new Swiper(".product-thumbs", {
    spaceBetween: 10,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      576: {
        slidesPerView: 5,
      },
      900: {
        slidesPerView: 6,
      },
    },
  });

  const productSlider = new Swiper(".product-slider", {
    spaceBetween: 10,
    thumbs: {
      swiper: productThumbs,
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const licensesSwiper = new Swiper(".licenses-swiper", {
    spaceBetween: 20,
    slidesPerView: 2.8,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 2.8,
      },
    },
  });
});

// review video
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".review-video");

  videos.forEach((video) => {
    const playBtn = video.parentElement.querySelector(".play-btn");
    video.addEventListener("click", togglePlay);
    playBtn.addEventListener("click", togglePlay);

    function togglePlay() {
      if (video.paused) {
        video.play();
        playBtn.innerHTML = `
                                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                                                  <rect x="0" y="0" width="5" height="17" fill="#FFA0A0"/>
                                                  <rect x="7" y="0" width="5" height="17" fill="#FFA0A0"/>
                                              </svg>`;
      } else {
        video.pause();
        playBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M17.49 9.60014L5.6 16.7701C4.9 17.1901 4 16.6901 4 15.8701V7.87014C4 4.38014 7.77 2.20014 10.8 3.94014L15.39 6.58014L17.48 7.78014C18.17 8.19014 18.18 9.19014 17.49 9.60014Z" fill="white"/>
                                          <path d="M18.0898 15.4601L14.0398 17.8001L9.99981 20.1301C8.54981 20.9601 6.90981 20.7901 5.71981 19.9501C5.13981 19.5501 5.20981 18.6601 5.81981 18.3001L18.5298 10.6801C19.1298 10.3201 19.9198 10.6601 20.0298 11.3501C20.2798 12.9001 19.6398 14.5701 18.0898 15.4601Z" fill="white"/>
                                      </svg>`;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const reviewItems = document.querySelectorAll(".review-item");

  reviewItems.forEach((item) => {
    const reviewText = item.querySelector("p");
    const showMoreButton = item.querySelector(".review-show-more");

    reviewText.style.webkitLineClamp = "2";
    reviewText.dataset.expanded = "false";

    checkTextOverflow(reviewText, showMoreButton);

    if (showMoreButton && showMoreButton.style.display !== "none") {
      showMoreButton.addEventListener("click", function () {
        const isExpanded = reviewText.dataset.expanded === "true";

        if (isExpanded) {
          reviewText.style.webkitLineClamp = "2";
          this.textContent = "Показать полностью";
          reviewText.dataset.expanded = "false";
        } else {
          reviewText.style.webkitLineClamp = "unset";
          this.textContent = "Скрыть";
          reviewText.dataset.expanded = "true";
        }
      });
    }
  });

  function checkTextOverflow(textElement, button) {
    if (!textElement || !button) return;

    const originalClamp = textElement.style.webkitLineClamp;

    textElement.style.webkitLineClamp = "unset";
    const fullHeight = textElement.scrollHeight;

    textElement.style.webkitLineClamp = "2";
    const clampedHeight = textElement.clientHeight;

    textElement.style.webkitLineClamp = originalClamp;

    if (fullHeight <= clampedHeight) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  }
});

// back to top
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".tooltip");
  if (window.pageYOffset > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

// Плавная прокрутка вверх
document.querySelector(".back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// cookie
document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");

  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "block";
  }

  acceptButton.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  });
});

// mobile-menu

document.addEventListener("DOMContentLoaded", function () {
  const subMenuParents = document.querySelectorAll(".has-sub-menu");

  subMenuParents.forEach((parent) => {
    const arrow = parent.querySelector(".sub-menu-arrow");
    const subMenu = parent.querySelector(".sub-menu");

    const clickHandler = (e) => {
      if (
        e.target.closest("a") &&
        e.target.closest("a").getAttribute("href") !== "#"
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const parentList = parent.closest("ul");
      if (parentList) {
        parentList.querySelectorAll(".has-sub-menu").forEach((sibling) => {
          if (sibling !== parent) {
            sibling.querySelector(".sub-menu")?.classList.remove("active");
            sibling
              .querySelector(".sub-menu-arrow")
              ?.classList.remove("active");
          }
        });
      }

      subMenu.classList.toggle("active");
      arrow?.classList.toggle("active");
    };

    parent.addEventListener("click", clickHandler);
    arrow?.addEventListener("click", clickHandler);
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-sub-menu")) {
      subMenuParents.forEach((parent) => {
        parent.querySelector(".sub-menu")?.classList.remove("active");
        parent.querySelector(".sub-menu-arrow")?.classList.remove("active");
      });
    }
  });
});

// filters-popup
document.addEventListener("DOMContentLoaded", function () {
  const filtersBtn = document.querySelector(".filters-btn");
  const filtersPopup = document.querySelector(".filters-popup");
  const applyFilters = document.querySelector(".apply-filters");

  filtersBtn.addEventListener("click", function () {
    filtersPopup.classList.toggle("active");
    if (filtersPopup.classList.contains("active")) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  });
  applyFilters.addEventListener("click", function () {
    filtersPopup.classList.remove("active");
    document.body.classList.remove("no-scroll");
  })
  filtersPopup.addEventListener("click", function (e) {
    if (e.target === filtersPopup) {
      filtersPopup.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
});
// sorter

document.addEventListener("DOMContentLoaded", function () {
  const sortBtn = document.querySelector(".sort-btn");
  const sortContent = document.querySelector(".sort-content");

  sortBtn.addEventListener("click", function () {
    sortContent.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sortPopular = document.getElementById("sort-popular");
  const sortPrice = document.getElementById("sort-price");
  const sortAlphabet = document.getElementById("sort-alphabet");
  const productsList = document.querySelector(".products-list");

  // Объект для хранения текущего состояния сортировки
  const sortState = {
    criteria: null,
    direction: 1 // 1 для возрастающего, -1 для убывающего
  };

  function sortProducts(criteria) {
    const productCards = Array.from(productsList.querySelectorAll(".product-card"));

    // Если кликаем по тому же критерию, меняем направление
    if (sortState.criteria === criteria) {
      sortState.direction *= -1;
    } else {
      // Если критерий другой, сбрасываем направление
      sortState.criteria = criteria;
      sortState.direction = 1;
    }

    // Обновляем активные кнопки
    sortPopular.classList.remove("active", "asc", "desc");
    sortPrice.classList.remove("active", "asc", "desc");
    sortAlphabet.classList.remove("active", "asc", "desc");

    const activeButton = document.getElementById(`sort-${criteria}`);
    activeButton.classList.add("active");
    activeButton.classList.add(sortState.direction === 1 ? "asc" : "desc");

    productCards.sort((a, b) => {
      let comparison = 0;

      switch (criteria) {
        case "price":
          const priceA = parseInt(a.querySelector(".product-price").textContent.replace(/\D/g, ""));
          const priceB = parseInt(b.querySelector(".product-price").textContent.replace(/\D/g, ""));
          comparison = priceA - priceB;
          break;

        case "alphabet":
          const titleA = a.querySelector(".product-card-title").textContent.toLowerCase();
          const titleB = b.querySelector(".product-card-title").textContent.toLowerCase();
          comparison = titleA.localeCompare(titleB);
          break;

        case "popular":
          // Здесь нужно использовать данные о популярности из базы данных
          comparison = 0;
          break;

        default:
          comparison = 0;
      }

      return comparison * sortState.direction;
    });

    productsList.innerHTML = "";
    productCards.forEach((card) => productsList.appendChild(card));
  }

  sortPopular.addEventListener("click", () => sortProducts("popular"));
  sortPrice.addEventListener("click", () => sortProducts("price"));
  sortAlphabet.addEventListener("click", () => sortProducts("alphabet"));
});

document.addEventListener("DOMContentLoaded", function () {
  // ползунок цен
  const slider = document.getElementById("price-range");
  const minInput = document.querySelector(".min-price");
  const maxInput = document.querySelector(".max-price");

  noUiSlider.create(slider, {
    start: [200, 35999],
    connect: true,
    step: 100,
    range: {
      min: 1000,
      max: 10000,
    },
    format: {
      to: function (value) {
        return Math.round(value);
      },
      from: function (value) {
        return Number(value);
      },
    },
  });

  slider.noUiSlider.on("update", function (values, handle) {
    if (handle === 0) {
      minInput.value = values[0];
    } else {
      maxInput.value = values[1];
    }
  });

  minInput.addEventListener("change", function () {
    slider.noUiSlider.set([this.value, null]);
  });

  maxInput.addEventListener("change", function () {
    slider.noUiSlider.set([null, this.value]);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const catalogBtn = document.querySelector(".catalog-button");
  const categoryContentLeft = document.querySelector(".category-content-left");
  const subMenuArrow = document.querySelector(
    ".catalog-button .sub-menu-arrow"
  );

  catalogBtn.addEventListener("click", function () {
    categoryContentLeft.classList.toggle("active");
    subMenuArrow.classList.toggle("active");
  });
});


// product-card-like

document.addEventListener("DOMContentLoaded", function () {
  const productCardLikes = document.querySelectorAll(".product-card-like");

  productCardLikes.forEach((like) => {
    like.addEventListener("click", function () {
      like.classList.toggle("active");
    });
  });
});

//  product-content height

document.addEventListener("DOMContentLoaded", function () {
  const productContent = document.querySelector(".product-content");
  const productInfo = document.querySelectorAll(".product-info");

  productContent.style.minHeight = `${productInfo[0].offsetHeight}px`;
});

// review-popup
document.addEventListener("DOMContentLoaded", function () {
  const reviewBtn = document.querySelector(".review-btn");
  const reviewPopup = document.querySelector(".reviews-popup");
  const reviewPopupClose = document.querySelector(".reviews-popup-close");
  const reviewForm = document.querySelector(".reviews-popup form");
  const successMessage = document.querySelector(".success-message");

  reviewBtn.addEventListener("click", function () {
    reviewPopup.classList.add("active");
    body.classList.add("no-scroll");
  });

  reviewPopupClose.addEventListener("click", function () {
    reviewPopup.classList.remove("active");
    body.classList.remove("no-scroll");
  });

  // Обработчик отправки формы
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Предотвращаем реальную отправку для примера

      // Здесь обычно AJAX-запрос на сервер
      // После успешной отправки:

      // 1. Показываем сообщение
      successMessage.style.display = "flex";

      // 2. Очищаем форму (опционально)
      reviewForm.reset();
      reviewForm.style.display = "none";
      // 3. Закрываем попап через 2 секунды (опционально)
      setTimeout(function () {
        reviewPopup.classList.remove("active");
        body.classList.remove("no-scroll");
        successMessage.style.display = "none";
      }, 2000);
    });
  }
});

// product-characteristics show-more
document.addEventListener("DOMContentLoaded", function () {
  const productCharacteristicsText = document.querySelector(
    ".product-characteristics-text"
  );
  const showMoreBtn = productCharacteristicsText.querySelector(".show-more");

  showMoreBtn.addEventListener("click", function () {
    productCharacteristicsText.classList.toggle("active");

    if (productCharacteristicsText.classList.contains("active")) {
      showMoreBtn.textContent = "Скрыть";
    } else {
      showMoreBtn.textContent = "Показать все";
    }
  });
});
// pagination
document.addEventListener('DOMContentLoaded', function() {
  const productsList = document.querySelector('.products-list');
  const products = Array.from(productsList.children);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);
  let currentPage = 1;

  // Функция показа товаров текущей страницы
  function showPage(page) {
    // Скрываем все товары
    products.forEach(product => {
      product.style.display = 'none';
    
    });

    // Показываем только товары текущей страницы
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      products[i].style.display= 'block';
  
    }
  }

  // Создаем пагинацию
  function createPagination() {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = '';

    // Кнопка "Назад"
    if (currentPage > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.textContent = '←';
      prevBtn.addEventListener('click', () => {
        currentPage--;
        showPage(currentPage);
        createPagination();
      });
      paginationContainer.appendChild(prevBtn);
    }

    // Номера страниц
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      if (i === currentPage) {
        pageBtn.classList.add('active');
      }
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
        createPagination();
      });
      paginationContainer.appendChild(pageBtn);
    }

    // Кнопка "Вперед"
    if (currentPage < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = '→';
      nextBtn.addEventListener('click', () => {
        currentPage++;
        showPage(currentPage);
        createPagination();
      });
      paginationContainer.appendChild(nextBtn);
    }
  }

  // Инициализация
  showPage(1);
  createPagination();
});
//  sidebar scroll

document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebarLinks.forEach((otherLink) => {
        otherLink.classList.remove("active");
        const submenu = otherLink.nextElementSibling;
        if (submenu) {
          submenu.style.maxHeight = "0";
          submenu.style.overflow = "hidden";
          submenu.style.visibility = "hidden";
        }
      });

      if (link.classList.contains("active")) {
        link.classList.remove("active");
        if (link.nextElementSibling) {
          link.nextElementSibling.style.maxHeight = "0";
          link.nextElementSibling.style.overflow = "hidden";
          link.nextElementSibling.style.visibility = "hidden";
        }
      } else {
        link.classList.add("active");
        if (link.nextElementSibling) {
          link.nextElementSibling.style.maxHeight = `${link.nextElementSibling.scrollHeight}px`;
          link.nextElementSibling.style.overflow = "visible";
          link.nextElementSibling.style.visibility = "visible";
        }
      }
    });
  });
});

// register

document.addEventListener("DOMContentLoaded", function () {
  const loginrBtns = document.querySelectorAll(".login-btn");
  const register = document.querySelector("#register");
  const registerClose = document.querySelectorAll(".register-close");

  loginrBtns.forEach(function (loginrBtn) {
    loginrBtn.addEventListener("click", function (e) {
      e.preventDefault();
      register.style.visibility = "visible";
      register.style.opacity = "1";
      document.body.classList.add("no-scroll");
    });
  })
 




  const alreadyAccount = document.querySelector(".already-account");
  const login = document.querySelector("#login");
  alreadyAccount.addEventListener("click", function (e) {
    e.preventDefault();
    login.style.visibility = "visible";
    login.style.opacity = "1";
    document.body.classList.add("no-scroll");
    register.style.visibility = "hidden";
    register.style.opacity = "0";
  });


  registerClose.forEach(function (registerClose) {
    registerClose.addEventListener("click", function () {
    registerClose.parentElement.parentElement.style.visibility = "hidden";
    registerClose.parentElement.parentElement.style.opacity = "0";
    document.body.classList.remove("no-scroll");
  });
  })
    

  const forgotPassword = document.querySelector(".forgot-password");
  const resetPassword = document.querySelector("#reset-password");
  forgotPassword.addEventListener("click", function (e) {
    e.preventDefault();
    resetPassword.style.visibility = "visible";
    resetPassword.style.opacity = "1";
    document.body.classList.add("no-scroll");
    login.style.visibility = "hidden";
    login.style.opacity = "0";
  });
});


// profile tabs

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    
    const tabId = btn.getAttribute('data-tab');
    document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
  });
});

// avatar
document.addEventListener('DOMContentLoaded', function() {
  const editBtn = document.querySelector('.edit-avatar-btn');
  const avatarUpload = document.getElementById('avatar-upload');
  const avatarImage = document.getElementById('user-avatar');

  editBtn.addEventListener('click', function() {
    avatarUpload.click();
  });

  avatarUpload.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        avatarImage.src = event.target.result;
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  });
});

function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);
  
  fetch('/api/upload-avatar', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Аватар обновлен', data);
  })
  .catch(error => {
    console.error('Ошибка загрузки', error);
  });
}

// Выбор питомца

document.addEventListener('DOMContentLoaded', function() {
  const addPetBtn = document.querySelector('.add-pets-btn');
  const chooseYourPet = document.querySelector('#choose-your-pet');
  
  addPetBtn.addEventListener('click', function() {
    chooseYourPet.style.opacity = '1';
    chooseYourPet.style.visibility = 'visible';
  });

  const choosePetItems = document.querySelectorAll('.choose-pet-item');
  const petsData = document.querySelector('#pets-data');

  choosePetItems.forEach(item => {
    item.addEventListener('click', function() {
      petsData.style.opacity = '1';
      petsData.style.visibility = 'visible';
      chooseYourPet.style.opacity = '0';
      chooseYourPet.style.visibility = 'hidden';
      document.body.classList.add('no-scroll');
    });
  });

  
});


// Обработка нескольких select
document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
  const trigger = wrapper.querySelector('.custom-select-trigger');
  const options = wrapper.querySelector('.custom-options');
  const originalSelect = wrapper.querySelector('.original-select');
  
  // Установка начального значения
  trigger.textContent = originalSelect.options[originalSelect.selectedIndex].text;
  
  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    trigger.classList.toggle('active');
    // Закрываем все открытые select
    document.querySelectorAll('.custom-options').forEach(opt => {
      if (opt !== options) opt.style.display = 'none';
    });
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });
  
  wrapper.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      trigger.textContent = value;
      originalSelect.value = value;
      options.style.display = 'none';
    });
  });
});

// Закрытие при клике вне select
document.addEventListener('click', function() {
  document.querySelectorAll('.custom-options').forEach(options => {
    options.style.display = 'none';
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const petEditBtn = document.querySelector('.pet-card .edit-avatar-btn');
  const petAvatarUpload = document.getElementById('pet-avatar-upload');
  const petAvatarImage = document.getElementById('pet-avatar');

  petEditBtn.addEventListener('click', function() {
    petAvatarUpload.click();
  });

  petAvatarUpload.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        petAvatarImage.src = event.target.result;
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  });
});




// Добавление питомца

document.addEventListener('DOMContentLoaded', function() {
  const petForm = document.querySelector('.pet-filters-form');
  const yourPetsInfo = document.querySelector('.your-pets-info');
  const petFiltersBtn = document.querySelector('.btn.pet-filters-btn');
  const petsData =document.getElementById('pets-data');



  // Обработчик отправки формы
  petForm.addEventListener('submit', function(e) {
    e.preventDefault();
     
    petsData.style.opacity = '0';
    petsData.style.visibility = 'hidden';
    document.body.classList.remove('no-scroll');
  
    // Проверка выбранного пола
    const genderRadio = document.querySelector('input[name="radio-group"]:checked');
    if (!genderRadio) {
      alert('Пожалуйста, выберите пол питомца');
      return;
    }
    
    // Собираем данные из формы
    const petType = document.querySelector('.pet-filters-item .custom-select-trigger').textContent;
    const breed = document.querySelectorAll('.pet-filters-item .custom-select-trigger')[1].textContent;
    const name = document.getElementById('pet-name').value || 'Не указано';
    const birthday = document.getElementById('pet-birthday').value || 'Не указано';
    const weight = document.getElementById('pet-weight').value || '0';
    const gender = genderRadio.nextElementSibling.nextElementSibling.textContent;
    const castration = document.getElementById('castration').checked ? 'Да' : 'Нет';
    const rationButtons = document.querySelectorAll('.rations .btn.active');
    const rations = Array.from(rationButtons).map(btn => btn.textContent).join('</br> ') || 'Не указано';
    
    // Создаем объект с данными питомца
    const petData = {
      type: petType,
      breed: breed,
      name: name,
      birthday: birthday,
      weight: weight,
      gender: gender,
      castration: castration,
      ration: rations,
      avatar: './assets/icons/user_icon.png' // дефолтный аватар
    };
    
    // Сохраняем данные
    savePetData(petData);
    
    // Создаем и отображаем карточку
    displayPetCard(petData);
    
    
    // Очищаем форму
    petForm.reset();
  });
  
  // Обработчики для кнопок рациона
document.addEventListener('click', function(e) {
  if (e.target.closest('.rations .btn')) {
    e.preventDefault();
    e.target.classList.toggle('active');
  }
});
  
  // Обработчик для кнопки закрытия
  document.querySelector('.register-close').addEventListener('click', function() {
    document.querySelector('.pet-filters').style.display = 'none';
  });
  
  // Обработчик для кнопки редактирования аватара
  document.addEventListener('click', function(e) {
    if (e.target.closest('.edit-avatar-btn')) {
      e.target.closest('.profile-avatar').querySelector('input[type="file"]').click();
    }
  });
  
  // Обработчик загрузки аватара
  document.addEventListener('change', function(e) {
    if (e.target.matches('input[type="file"]')) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const avatar = e.target.closest('.profile-avatar').querySelector('img');
          avatar.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  });
  
  // Функция сохранения данных
  function savePetData(petData) {
    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(petData);
    localStorage.setItem('pets', JSON.stringify(pets));
  }
  
  // Функция отображения карточки
  function displayPetCard(petData) {
    const petCard = document.createElement('div');
    petCard.className = 'pet-card';
    petCard.innerHTML = `
      <div class="profile-avatar">
        <img src="${petData.avatar}" id="pet-avatar" class="avatar-image" alt="Аватар">
        <button class="edit-avatar-btn pet-edit-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="#FFA0A0"/>
											<rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="white"/>
											<path d="M14.5 15H5.5C5.295 15 5.125 14.83 5.125 14.625C5.125 14.42 5.295 14.25 5.5 14.25H14.5C14.705 14.25 14.875 14.42 14.875 14.625C14.875 14.83 14.705 15 14.5 15Z" fill="white"/>
											<path d="M13.5103 5.74002C12.5403 4.77002 11.5903 4.74502 10.5953 5.74002L9.99028 6.34502C9.94028 6.39502 9.92028 6.47502 9.94028 6.54502C10.3203 7.87002 11.3803 8.93002 12.7053 9.31002C12.7253 9.31502 12.7453 9.32002 12.7653 9.32002C12.8203 9.32002 12.8703 9.30002 12.9103 9.26002L13.5103 8.65502C14.0053 8.16502 14.2453 7.69002 14.2453 7.21002C14.2503 6.71502 14.0103 6.23502 13.5103 5.74002Z" fill="white"/>
											<path d="M11.8052 9.76502C11.6602 9.69502 11.5202 9.62502 11.3852 9.54502C11.2752 9.48002 11.1702 9.41002 11.0652 9.33502C10.9802 9.28002 10.8802 9.20002 10.7852 9.12002C10.7752 9.11502 10.7402 9.08502 10.7002 9.04502C10.5352 8.90502 10.3502 8.72502 10.1852 8.52502C10.1702 8.51502 10.1452 8.48002 10.1102 8.43502C10.0602 8.37502 9.97516 8.27502 9.90016 8.16002C9.84016 8.08502 9.77016 7.97502 9.70516 7.86502C9.62516 7.73002 9.55516 7.59502 9.48516 7.45502C9.39338 7.25835 9.13525 7.19993 8.98179 7.35339L6.17016 10.165C6.10516 10.23 6.04516 10.355 6.03016 10.44L5.76016 12.355C5.71016 12.695 5.80516 13.015 6.01516 13.23C6.19516 13.405 6.44516 13.5 6.71516 13.5C6.77516 13.5 6.83516 13.495 6.89516 13.485L8.81516 13.215C8.90516 13.2 9.03016 13.14 9.09016 13.075L11.9064 10.2588C12.0568 10.1084 12.0003 9.84959 11.8052 9.76502Z" fill="white"/>
					</svg>
        </button>
        <input type="file" accept="image/*" hidden>
      </div>
      <div class="pet-info-items">
        <div class="pet-name profile-info-item">
          <span>Имя</span>
          <span class="pet-name-value">${petData.name}</span>
        </div>
        <div class="pet-breed profile-info-item">
          <span>Порода</span>
          <span class="pet-breed-value">${petData.breed}</span>
        </div>
        <div class="pet-birthday profile-info-item">
          <span>Дата рождения</span>
          <span class="pet-birthday-value">${petData.birthday}</span>
        </div>
        <div class="pet-weight profile-info-item">
          <span>Вес</span>
          <span class="pet-weight-value">${petData.weight} кг</span>
        </div>
        <div class="pet-gender profile-info-item">
          <span>Пол</span>
          <span class="pet-gender-value">${petData.gender}</span>
        </div>
        <div class="pet-ration profile-info-item">
          <span>Рацион</span>
          <span class="pet-ration-value">${petData.ration}</span>
        </div>
        <div class="pet-castration profile-info-item">
          <span>Кастрация</span>
          <span class="pet-castration-value">${petData.castration}</span>
        </div>
      </div>
      <button class="pet-profile-edit-btn">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.05 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.05 17.8417 18.3333 17.5 18.3333Z" fill="#3C3C3B"/>
										<path d="M15.8505 2.89999C14.2338 1.28332 12.6505 1.24166 10.9921 2.89999L9.9838 3.90832C9.90047 3.99166 9.86714 4.12499 9.90047 4.24166C10.5338 6.44999 12.3005 8.21666 14.5088 8.84999C14.5421 8.85832 14.5755 8.86666 14.6088 8.86666C14.7005 8.86666 14.7838 8.83332 14.8505 8.76666L15.8505 7.75832C16.6755 6.94166 17.0755 6.14999 17.0755 5.34999C17.0838 4.52499 16.6838 3.72499 15.8505 2.89999Z" fill="#3C3C3B"/>
										<path d="M13.0079 9.60835C12.7663 9.49169 12.5329 9.37502 12.3079 9.24169C12.1246 9.13335 11.9496 9.01669 11.7746 8.89169C11.6329 8.80002 11.4663 8.66669 11.3079 8.53335C11.2913 8.52502 11.2329 8.47502 11.1663 8.40835C10.8913 8.17502 10.5829 7.87502 10.3079 7.54169C10.2829 7.52502 10.2413 7.46669 10.1829 7.39169C10.0996 7.29169 9.95795 7.12502 9.83295 6.93335C9.73295 6.80835 9.61628 6.62502 9.50795 6.44169C9.37461 6.21669 9.25795 5.99169 9.14128 5.75835C8.98832 5.43057 8.5581 5.3332 8.30233 5.58897L3.61628 10.275C3.50795 10.3834 3.40795 10.5917 3.38295 10.7334L2.93295 13.925C2.84961 14.4917 3.00795 15.025 3.35795 15.3834C3.65795 15.675 4.07461 15.8334 4.52461 15.8334C4.62461 15.8334 4.72461 15.825 4.82461 15.8084L8.02461 15.3584C8.17461 15.3334 8.38295 15.2334 8.48295 15.125L13.1767 10.4312C13.4274 10.1806 13.3332 9.7493 13.0079 9.60835Z" fill="#3C3C3B"/>
										</svg>
									Изменить данные о питомце
			</button>
    `;
    
    if (yourPetsInfo.innerHTML.includes('У вас нет питомцев')) {
      yourPetsInfo.innerHTML = '';
    }

      yourPetsInfo.appendChild(petCard);
    }
    
 
 

 
  // Загрузка сохраненных питомцев при старте
  const savedPets = JSON.parse(localStorage.getItem('pets')) || [];
  if (savedPets.length > 0) {
    yourPetsInfo.innerHTML = '';
    savedPets.forEach(pet => displayPetCard(pet));
  }
});



