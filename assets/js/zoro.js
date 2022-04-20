setTimeout(() => {
  const preloader = document.getElementById('preload-section');
  preloader.classList.add('hidden');
  preloader.classList.remove('flex');
  document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
}, 1500);

window.onload = () => {
  const refs = [
    ...document.querySelectorAll(`[class*="animate__"]:not(.preloader)`),
  ];
  const handleFade = (windowOffset) => {
    refs.forEach((ele) => {
      const eleOffset = ele.offsetTop;
      if (windowOffset > eleOffset - screen.height) {
        ele.classList.add('animate__fadeInUp');
        ele.classList.remove('animate__fadeOut');
      }
    });
  };
  const initWindow = window.pageYOffset;
  handleFade(initWindow);

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    handleFade(currentScroll);

    // header sticky
    const header = document.getElementById('header');
    currentScroll > 0
      ? header.classList.add('header-sticky')
      : header.classList.remove('header-sticky');
  });

  // img-token position
  const tokenImgs = document.querySelectorAll('.img-token');
  const handlePositionToken = () => {
    tokenImgs.forEach((img) => {
      const nextDiv = img.nextElementSibling;
      const thisHeight = img.height;

      img.style.top = -(thisHeight / 2) + 'px';
      nextDiv.style.paddingTop = thisHeight / 2 + 'px';
    });
  };
  handlePositionToken();

  window.addEventListener('resize', handlePositionToken);

  const splide = new Splide('.splide', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 3,
    resolve: {
      left: true,
    },
    autoScroll: {
      speed: 2,
      rewind: true,
    },
  });

  splide.mount(window.splide.Extensions);
};
