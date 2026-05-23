(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  /* Scroll reveal */
  var revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach(function (el) {
      if (prefersReducedMotion) {
        el.classList.add("is-visible");
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Hero: show content immediately */
  var heroContent = document.querySelector(".hero__content");
  if (heroContent && !heroContent.classList.contains("is-visible")) {
    requestAnimationFrame(function () {
      heroContent.classList.add("is-visible");
    });
  }

  /* Sticky RSVP bar (mobile only) */
  var stickyBar = document.querySelector("[data-rsvp-sticky]");
  var detailsSection = document.getElementById("details");
  var mobileQuery = window.matchMedia("(max-width: 767px)");

  var stickyObserver = null;

  function initStickyRsvp() {
    if (stickyObserver) {
      stickyObserver.disconnect();
      stickyObserver = null;
    }

    if (
      !stickyBar ||
      !detailsSection ||
      !mobileQuery.matches ||
      !("IntersectionObserver" in window)
    ) {
      if (stickyBar) {
        stickyBar.classList.remove("is-shown");
        stickyBar.setAttribute("hidden", "");
      }
      return;
    }

    stickyBar.removeAttribute("hidden");

    stickyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stickyBar.classList.remove("is-shown");
          } else if (entry.boundingClientRect.top < 0) {
            stickyBar.classList.add("is-shown");
          } else {
            stickyBar.classList.remove("is-shown");
          }
        });
      },
      { threshold: 0 }
    );

    stickyObserver.observe(detailsSection);
  }


  initStickyRsvp();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", initStickyRsvp);
  }
})();
