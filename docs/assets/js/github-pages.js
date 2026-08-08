(function () {
    'use strict';

    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('site-navigation');
    const desktopQuery = window.matchMedia('(min-width: 54rem)');

    function setMenu(open) {
        if (!menuButton || !navigation) return;

        menuButton.setAttribute('aria-expanded', String(open));
        navigation.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-open', open && !desktopQuery.matches);
    }

    if (menuButton && navigation) {
        menuButton.addEventListener('click', function () {
            setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
        });

        navigation.addEventListener('click', function (event) {
            if (event.target.closest('a')) setMenu(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setMenu(false);
                menuButton.focus();
            }
        });

        desktopQuery.addEventListener('change', function () {
            setMenu(false);
        });
    }

    const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
    const sections = sectionLinks
        .map(function (link) {
            return document.querySelector(link.getAttribute('href'));
        })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                sectionLinks.forEach(function (link) {
                    const active = link.getAttribute('href') === '#' + entry.target.id;
                    if (active) link.setAttribute('aria-current', 'true');
                    else link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-35% 0px -58% 0px' });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function (event) {
            event.preventDefault();
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }
})();
