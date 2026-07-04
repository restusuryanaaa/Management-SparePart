(function () {
    'use strict';

    // Auto-close the mobile navbar collapse after a link is tapped.
    var navCollapseEl = document.getElementById('wmNavbar');
    if (navCollapseEl && window.bootstrap) {
        var collapse = new bootstrap.Collapse(navCollapseEl, { toggle: false });
        navCollapseEl.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (navCollapseEl.classList.contains('show')) {
                    collapse.hide();
                }
            });
        });
    }

    // Highlight the nav link for the section currently in view.
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.wm-nav-link[href^="#"]'));
    var sections = navLinks
        .map(function (link) {
            return document.querySelector(link.getAttribute('href'));
        })
        .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
        var setActive = function (id) {
            navLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        };

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // Back-to-top button visibility and click behaviour.
    var backToTop = document.getElementById('wmBackToTop');
    if (backToTop) {
        var toggleVisibility = function () {
            backToTop.classList.toggle('is-visible', window.scrollY > 480);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();

        var prefersReducedMotion = window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    // Current year in the footer.
    var yearEl = document.getElementById('wmYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
