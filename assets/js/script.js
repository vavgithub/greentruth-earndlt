document.addEventListener("DOMContentLoaded", () => {
  // Disable browser scroll restoration
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // top-of-page on refresh/load
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  const byId = (id) => document.getElementById(id);

  // Hero tab logic (only on pages that define the tab elements)
  const tabs = [
    { id: "tab-overview", content: "content-overview", type: "overview" },
    { id: "tab-mint", content: "content-mint", type: "middle" },
    { id: "tab-acquire", content: "content-acquire", type: "middle" },
    { id: "tab-discover", content: "content-discover", type: "middle" },
    { id: "tab-integrate", content: "content-integrate", type: "last" },
  ];

  const tabsExist = tabs.every(
    (t) => byId(t.id) !== null && byId(t.content) !== null
  );

  if (tabsExist) {
    function setActive(activeId) {
      const activeTab = tabs.find((t) => t.id === activeId);
      if (!activeTab) return;

      tabs.forEach((tab) => {
        const content = byId(tab.content);
        const button = byId(tab.id);
        const isActive = tab.id === activeId;

        content.classList.toggle("hidden", !isActive);

        button.classList.remove(
          "active-overview",
          "inactive-overview",
          "active-middle",
          "inactive-middle",
          "active-last",
          "inactive-last"
        );

        let activeClass, inactiveClass;
        switch (tab.type) {
          case "overview":
            activeClass = "active-overview";
            inactiveClass = "inactive-overview";
            break;
          case "middle":
            activeClass = "active-middle";
            inactiveClass = "inactive-middle";
            break;
          case "last":
            activeClass = "active-last";
            inactiveClass = "inactive-last";
            break;
        }

        button.classList.add(isActive ? activeClass : inactiveClass);
      });

      const overviewTabContainer = byId("overview-tab-container");
      if (overviewTabContainer) {
        const isOverviewActive = activeTab.type === "overview";
        overviewTabContainer.classList.toggle("bg-[#F5F5ED]", isOverviewActive);
        overviewTabContainer.classList.toggle("bg-white", !isOverviewActive);
      }

      // Mint & Acquire tab background position handling
      const bg1 = byId("hexagon-bg-1"); // 2xl version
      const bg2 = byId("hexagon-bg-2"); // lg–xl version
      if (bg1 && bg2) {
        const isMint = activeTab.id === "tab-mint";
        const isAcquire = activeTab.id === "tab-acquire";
        bg1.classList.toggle("mint-active", isMint);
        bg2.classList.toggle("mint-active", isMint);
        bg1.classList.toggle("acquire-active", isAcquire);
        bg2.classList.toggle("acquire-active", isAcquire);
      }
    }

    tabs.forEach((t) =>
      byId(t.id).addEventListener("click", () => setActive(t.id))
    );
    setActive("tab-overview");
  }

  // Accordion logic
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("hidden");
      header.classList.toggle("is-open");
    });
  });

  // Mobile Menu Toggle
  const mobileMenu = byId("mobile-menu");
  const menuButton = byId("menu-button");
  const closeMenuButton = byId("close-menu");
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  const toggleMenu = (show) => {
    mobileMenu.classList.toggle("hidden", !show);
    if (menuButton) menuButton.classList.toggle("hidden", show);
    if (closeMenuButton) closeMenuButton.classList.toggle("hidden", !show);
    document.body.style.overflow = show ? "hidden" : "";
  };

  menuButton?.addEventListener("click", () => toggleMenu(true));
  closeMenuButton?.addEventListener("click", () => toggleMenu(false));
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Scroll Spy & Smooth Scroll
  const navLinks = document.querySelectorAll(".nav-link");

  // Smooth Scroll using scrollIntoView so scroll-mt works
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.substring(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;
      if (targetSection) {
        if (targetId === "compliance-section") {
          // Wait for ScrollTrigger to be ready
          setTimeout(() => {
            // Check if ScrollTrigger is available
            if (typeof ScrollTrigger === "undefined") {
              // Fallback if ScrollTrigger not loaded
              targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              return;
            }

            // Find the ScrollTrigger for compliance sequence
            const allSTs = ScrollTrigger.getAll();
            const complianceST = allSTs.find(
              (st) => st.trigger === targetSection && st.vars?.pin === true
            );

            if (complianceST) {
              // The ScrollTrigger starts at "center center" and has end: "+=6000"
              // We want 55% progress (where text is about to fade out)
              // 80% of 6000 = 4800 pixels past the start point

              // Get the start scroll position (where section reaches center center)
              const startScroll = complianceST.start;

              // Calculate target scroll position (start + 55% of the scroll distance)
              const scrollDistance = complianceST.end - complianceST.start;
              const targetProgress = 0.55; // 55%
              const targetScroll =
                startScroll + scrollDistance * targetProgress;

              // Scroll to that position
              window.scrollTo({
                top: targetScroll,
                behavior: "smooth",
              });
            } else {
              // Fallback: calculate manually if ScrollTrigger not found
              const sectionTop = targetSection.offsetTop;
              const viewportHeight = window.innerHeight;
              const centerPoint = sectionTop - viewportHeight / 2;
              const scrollDistance = 6000; // From end: "+=6000"
              const targetScroll = centerPoint + scrollDistance * 0.55;

              window.scrollTo({
                top: targetScroll,
                behavior: "smooth",
              });
            }
          }, 100); // Small delay to ensure ScrollTrigger is initialized
        } else {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Scroll Spy Observer
  const sections = Array.from(navLinks)
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href) return null;
      const id = href.substring(1);
      return document.getElementById(id);
    })
    .filter((section) => section !== null);

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Lottie Animation Control (Play only when visible)
  const lottieObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const player = entry.target;
        // Ensure player is ready and has methods
        if (entry.isIntersecting) {
          if (typeof player.play === "function") {
            player.play();
          }
        } else {
          if (typeof player.stop === "function") {
            player.stop();
          }
        }
      });
    },
    { threshold: 0.1 }
  ); // Trigger when 10% visible

  // Observe all lottie-players
  // Wait a tick to ensure custom elements might be upgraded, though usually fine on DOMContentLoaded
  setTimeout(() => {
    document.querySelectorAll("lottie-player").forEach((player) => {
      lottieObserver.observe(player);
    });
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.getElementById("proof-tabs-container");
  const prevBtn = document.getElementById("prev-tab-btn");
  const nextBtn = document.getElementById("next-tab-btn");

  if (!tabsContainer) return;

  const tabs = Array.from(tabsContainer.querySelectorAll("button"));
  let currentIndex = 0; // State to track which tab is active
  let hasInitialized = false; // prevent page scroll on initial render

  // Configuration for class mappings
  const tabConfigs = [
    { active: "active-overview", inactive: "inactive-overview" },
    { active: "active-middle", inactive: "inactive-middle" },
    { active: "active-middle", inactive: "inactive-middle" },
    { active: "active-last", inactive: "inactive-last" },
  ];

  const scrollTabIntoView = (btn) => {
    // Only adjust the tabs container horizontal scroll, avoid page scrolling
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;
    const containerRect = tabsContainer.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const offsetLeft =
      btn.offsetLeft - (tabsContainer.clientWidth / 2 - btn.offsetWidth / 2);
    tabsContainer.scrollTo({
      left: Math.max(0, offsetLeft),
      behavior: "smooth",
    });
  };

  const updateTabUI = (index, { suppressScroll = false } = {}) => {
    tabs.forEach((btn, idx) => {
      const config = tabConfigs[idx];
      const targetId = `proof-content-${idx + 1}`;
      const contentPane = document.getElementById(targetId);

      // Reset classes
      btn.classList.remove(config.active, config.inactive);

      if (idx === index) {
        // Active
        btn.classList.add(config.active);
        if (contentPane) {
          contentPane.classList.remove("hidden");
          contentPane.classList.add("block");
        }
        // Avoid page jumps on initial load; afterwards scroll only the tabs container
        if (!suppressScroll) {
          scrollTabIntoView(btn);
        }
      } else {
        // Inactive
        btn.classList.add(config.inactive);
        if (contentPane) {
          contentPane.classList.add("hidden");
          contentPane.classList.remove("block");
        }
      }
    });
  };

  // Main Switch Function
  const switchTab = (index) => {
    currentIndex = index;
    updateTabUI(currentIndex, { suppressScroll: false });
  };

  // 1. Tab Click Event (Event Delegation)
  tabsContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest("button");
    if (!clickedBtn || !tabsContainer.contains(clickedBtn)) return;

    const newIndex = tabs.indexOf(clickedBtn);
    if (newIndex !== -1) switchTab(newIndex);
  });

  // 2. Next Button Click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let nextIndex = currentIndex + 1;
      // Loop back to start if at end
      if (nextIndex >= tabs.length) nextIndex = 0;
      switchTab(nextIndex);
    });
  }

  // 3. Prev Button Click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let prevIndex = currentIndex - 1;
      // Loop to end if at start
      if (prevIndex < 0) prevIndex = tabs.length - 1;
      switchTab(prevIndex);
    });
  }

  // Initialize without auto-scrolling the tab or page
  currentIndex = 0;
  updateTabUI(currentIndex, { suppressScroll: true });
  hasInitialized = true;
});
