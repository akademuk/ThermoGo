document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initIntroducingSlider();
  initSmoothScroll();
});

function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal__close');
  const navLinks = document.querySelectorAll('.modal__nav-link');

  if (!burger || !modal) return;

  const openMenu = () => {
    modal.classList.add('is-open');
    burger.classList.add('is-active');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    modal.classList.remove('is-open');
    burger.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  };

  burger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

function initSmoothScroll() {
  const links = document.querySelectorAll('.header__nav-link, .modal__nav-link');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (!href?.startsWith('#') || href === '#') return;

      const target = document.querySelector(href);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    });
  });
}

function initIntroducingSlider() {
  const swiperEl = document.querySelector('.introducing__swiper');

  if (!swiperEl) return;

  const prevBtn = swiperEl.querySelector('.introducing__nav-button--prev');
  const nextBtn = swiperEl.querySelector('.introducing__nav-button--next');

  const updateNavButtons = (swiper) => {
    prevBtn?.classList.toggle('is-disabled', swiper.isBeginning);
    nextBtn?.classList.toggle('is-disabled', swiper.isEnd);
  };

  new Swiper('.introducing__swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    speed: 600,
    watchOverflow: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.introducing__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.introducing__nav-button--next',
      prevEl: '.introducing__nav-button--prev',
    },
    on: {
      init: updateNavButtons,
      slideChange: updateNavButtons,
    },
  });
}
