// Small progressive enhancements. The site works without JavaScript.
(function () {
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Remember the visitor's language choice for the root redirect.
  document.querySelectorAll('.langs a[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('mep-lang', a.getAttribute('data-lang')); } catch (e) {}
    });
  });

  // Login page: show an error when ?error=1.
  if (/[?&]error=1/.test(location.search)) {
    var err = document.querySelector('[data-login-error]');
    if (err) err.hidden = false;
  }
})();
