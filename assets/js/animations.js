document.addEventListener("DOMContentLoaded", () => {
    
  // =============================================================================
  // 1. SETUP & UTILITIES
  // =============================================================================
  
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Handle Window Resize
  // We use a debounce (timer) to prevent the reload from firing 
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Only reload if the width actually changed (ignores mobile address bar vertical resizing)
      if (window.innerWidth !== document.body.clientWidth) {
          window.location.reload();
      }
    }, 250);
  });


  // =============================================================================
  // 2. DATA & CONFIGURATION
  // =============================================================================

  // Data Set A: "Mandate" Section Pattern (49 dots)
  // Used in Phase 1 (Hero -> Mandate)
  const targetDotsData = [
    { x: 124.9, y: 163.6, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 188.4, y: 100.1, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 505.8, y: 163.6, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 289.1, y: 371.9, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 494.0, y: 376.1, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 292.4, y: 241.3, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 515.5, y: 357.9, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 139.8, y: 440.1, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 199.3, y: 151.8, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 98.0, y: 238.9, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 476.2, y: 11.8, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 424.5, y: 156.2, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 530.0, y: 203.3, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 206.0, y: 45.4, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 442.3, y: 417.6, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 330.5, y: 94.0, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 378.8, y: 481.2, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 217.6, y: 459.2, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 80.7, y: 376.1, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 251.6, y: 348.4, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 178.7, y: 305.7, r: 15.0, color: "#808080", blurLevel: 0.5 },
    { x: 599.7, y: 354.1, r: 15.0, color: "#808080", blurLevel: 0.5 },
    { x: 381.6, y: 381.5, r: 15.0, color: "#808080", blurLevel: 0.5 },
    { x: 467.2, y: 513.5, r: 17.1, color: "#808080", blurLevel: 0.5 },
    { x: 244.2, y: 216.9, r: 15.0, color: "#808080", blurLevel: 0.5 },
    { x: 233.2, y: 173.3, r: 17.1, color: "#999999", blurLevel: 0 },
    { x: 188.2, y: 227.1, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 381.8, y: 122.9, r: 17.1, color: "#999999", blurLevel: 0 },
    { x: 542.9, y: 277.5, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 442.3, y: 354.1, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 55.5, y: 156.2, r: 17.1, color: "#999999", blurLevel: 0 },
    { x: 188.2, y: 354.1, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 240.0, y: 284.6, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    { x: 404.2, y: 301.2, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    { x: 535.9, y: 138.7, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    { x: 245.9, y: 399.9, r: 23.8, color: "#B3B3B3", blurLevel: 0 },
    { x: 378.8, y: 227.1, r: 23.8, color: "#B3B3B3", blurLevel: 0 },
    { x: 315.3, y: 417.6, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    { x: 313.0, y: 268.2, r: 23.8, color: "#B3B3B3", blurLevel: 0 },
    { x: 97.9, y: 199.4, r: 8.5, color: "#303030", blurLevel: 0 },
    { x: 305.3, y: 263.6, r: 12.2, color: "#606060", blurLevel: 1 },
    { x: 220.4, y: 388.5, r: 10.8, color: "#404040", blurLevel: 1.5 },
    { x: 157.2, y: 402.6, r: 7.9, color: "#242424", blurLevel: 2.5 },
    { x: 270.1, y: 607.0, r: 15.6, color: "#626262", blurLevel: 0.5 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 }
  ];

  // Data Set B: "GreenTruth Logo" Pattern
  // Used in Phase 4 (Formation of the logo)
  const finaltargetDotsData = [
    { x: 74.0, y: 74.0, r: 12.0, color: "#1AAC66" },
    { x: 51.2, y: 74.0, r: 10.7, color: "#178B53" },
    { x: 28.3, y: 74.0, r: 8.1, color: "#155C3A" },
    { x: 5.4, y: 74.0, r: 5.4, color: "#142D21" },
    { x: 96.8, y: 74.0, r: 10.7, color: "#178B53" },
    { x: 119.7, y: 74.0, r: 8.1, color: "#155C3A" },
    { x: 142.6, y: 74.0, r: 5.4, color: "#142D21" },
    { x: 74.0, y: 28.3, r: 8.1, color: "#155C3A" },
    { x: 51.1, y: 28.3, r: 6.1, color: "#155C3A" },
    { x: 28.2, y: 28.3, r: 4.2, color: "#142D21" },
    { x: 5.4, y: 28.3, r: 2.2, color: "#142D21" },
    { x: 96.9, y: 28.3, r: 6.1, color: "#155C3A" },
    { x: 119.8, y: 28.3, r: 4.2, color: "#142D21" },
    { x: 142.6, y: 28.3, r: 2.2, color: "#142D21" },
    { x: 74.0, y: 5.4, r: 5.4, color: "#142D21" },
    { x: 51.1, y: 5.4, r: 4.2, color: "#142D21" },
    { x: 28.3, y: 5.4, r: 2.2, color: "#142D21" },
    { x: 96.9, y: 5.4, r: 4.2, color: "#142D21" },
    { x: 119.7, y: 5.4, r: 2.2, color: "#142D21" },
    { x: 74.0, y: 51.1, r: 10.7, color: "#178B53" },
    { x: 51.1, y: 51.1, r: 8.5, color: "#155C3A" },
    { x: 28.2, y: 51.1, r: 6.4, color: "#155C3A" },
    { x: 5.4, y: 51.1, r: 4.2, color: "#142D21" },
    { x: 96.9, y: 51.1, r: 8.5, color: "#155C3A" },
    { x: 119.8, y: 51.1, r: 6.4, color: "#155C3A" },
    { x: 142.6, y: 51.1, r: 4.2, color: "#142D21" },
    { x: 74.0, y: 119.7, r: 8.1, color: "#155C3A" },
    { x: 96.9, y: 119.7, r: 6.1, color: "#155C3A" },
    { x: 119.8, y: 119.7, r: 4.2, color: "#142D21" },
    { x: 142.6, y: 119.7, r: 2.2, color: "#142D21" },
    { x: 51.1, y: 119.7, r: 6.1, color: "#155C3A" },
    { x: 28.2, y: 119.7, r: 4.2, color: "#142D21" },
    { x: 5.4, y: 119.7, r: 2.2, color: "#142D21" },
    { x: 74.0, y: 142.6, r: 5.4, color: "#142D21" },
    { x: 96.9, y: 142.6, r: 4.2, color: "#142D21" },
    { x: 119.8, y: 142.6, r: 2.2, color: "#142D21" },
    { x: 28.2, y: 142.6, r: 2.2, color: "#142D21" },
    { x: 51.1, y: 142.6, r: 4.2, color: "#142D21" },
    { x: 74.0, y: 96.9, r: 10.7, color: "#178B53" },
    { x: 96.9, y: 96.9, r: 8.5, color: "#155C3A" },
    { x: 119.8, y: 96.9, r: 6.4, color: "#155C3A" },
    { x: 142.6, y: 96.9, r: 4.2, color: "#142D21" },
    { x: 51.1, y: 96.9, r: 8.5, color: "#155C3A" },
    { x: 28.2, y: 96.9, r: 6.4, color: "#155C3A" },
    { x: 5.4, y: 96.9, r: 4.2, color: "#142D21" },
  ];


  // =============================================================================
  // 3. DOM ELEMENT SELECTION
  // =============================================================================

  const sourceSvg = document.querySelector("#hero-floating-dots");
  const sourceGroup = sourceSvg.querySelector("g");
  const sourcePaths = sourceSvg.querySelectorAll("path");
  const targetContainer = document.querySelector("#mandate-section-target");
  

  // =============================================================================
  // 4. ANIMATION PHASE 1: HERO -> MANDATE
  //    (Move dots from hero to first scattered formation)
  // =============================================================================

  // 4a. Pinning Trigger (Master Controller)
  // Pins the #mandate-section while dots move into place.
  ScrollTrigger.create({
    trigger: "#mandate-section",
    start: "center center",
    end: "+=800",
    pin: true,
    pinSpacing: true,
    id: "pinning"
  });

  // 4b. Animation Timeline
  // scrub: 1 links animation progress directly to scrollbar
  const tlAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-section",
      start: "top top",
      endTrigger: "#mandate-section",
      // Ends exactly when the pinning starts (+ buffer)
      end: () => ScrollTrigger.getById("pinning").start + 400,
      scrub: 1,
      invalidateOnRefresh: true // recalculation on resize
    }
  });

  // 1. Reveal the group
  tlAnimation.to(sourceGroup, { opacity: 1 }, 0);

  // 2. Animate every dot to its "Mandate" position
  sourcePaths.forEach((path, index) => {
    if (index >= targetDotsData.length) return;

    // We use Function-based values for x, y, and scale.
    // This runs the logic inside 'calculateDotValues' FRESH on every resize.
    tlAnimation.to(path, {
      x: () => calculateDotValues(index, path).xMove,
      y: () => calculateDotValues(index, path).yMove,
      scale: () => calculateDotValues(index, path).scale,
      fill: targetDotsData[index].color,
      filter: `blur(${targetDotsData[index].blurLevel}px)`,
      transformOrigin: "center center",
      ease: "power1.inOut"
    }, 0);
  });


  // =============================================================================
  // 5. ANIMATION PHASE 2: MANDATE -> COMPLIANCE ENTRY
  //    (Move dots from scattered mandate to the center of the next section)
  // =============================================================================

  const tlComplianceTransition = gsap.timeline({
    scrollTrigger: {
      trigger: "#compliance-section",
      start: "top bottom", 
      end: "center center",
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  sourcePaths.forEach((path, index) => {
    if (index >= targetDotsData.length) return;

    tlComplianceTransition.to(path, {
      x: () => calculateComplianceCenterValues(index, path).xMove,
      y: () => calculateComplianceCenterValues(index, path).yMove,
      scale: () => calculateComplianceCenterValues(index, path).scale,
      ease: "power1.inOut"
    }, 0);
  });


  // =============================================================================
  // 6. ANIMATION PHASE 3: COMPLIANCE SEQUENCE
  //    (Scale one dot, show content, hide content, scale down)
  // =============================================================================

  // 6a. Main Timeline for the sequence
  const tlComplianceSequence = gsap.timeline({
    scrollTrigger: {
      trigger: "#compliance-section",
      start: "center center",
      end: "+=6000", // Long duration for reading text
      pin: true,    // Pin the section so user sees animation
      scrub: 0.1,   // Responsive scrubbing
      invalidateOnRefresh: true
    }
  });

  // Identify Elements
  // Use the last dot in the list as the "Hero Dot" that expands
  const scalingDot = sourcePaths[sourcePaths.length - 1];
  const otherDots = Array.from(sourcePaths).slice(0, sourcePaths.length - 1);
  const finalCircleTarget = document.querySelector("#compliance-circle-target");
  
  // Text elements to animate
  const contentElements = [
    "#compliance-heading",
    "#compliance-li-1",
    "#compliance-li-2",
    "#compliance-li-3",
    "#compliance-text-1",
    "#compliance-text-2"
  ];

  // Initial State
  tlComplianceSequence.set(scalingDot, { opacity: 1 }, 0);
  gsap.set(contentElements, { y: 20, opacity: 0 });
  
  // --- STEP 1: Scale Up (0% -> 20%) ---
  // Expand the scalingDot to fill the screen/circle
  tlComplianceSequence.fromTo(scalingDot, {
    x: () => calculateComplianceCenterValues(sourcePaths.length - 1, scalingDot).xMove,
    y: () => calculateComplianceCenterValues(sourcePaths.length - 1, scalingDot).yMove,
    scale: () => calculateComplianceCenterValues(sourcePaths.length - 1, scalingDot).scale,
    fill: targetDotsData[sourcePaths.length - 1].color,
    filter: "blur(0px)",
    transformOrigin: "center center"
  }, {
    scale: () => calculateComplianceScalingValues(scalingDot).scale,
    fill: "#142D21",
    filter: "blur(0px)",
    duration: 2,
    ease: "power1.inOut",
    immediateRender: false,
    overwrite: "auto"
  }, 0);

  // Fade out all other dots
  tlComplianceSequence.to(otherDots, {
    opacity: 0,
    duration: 0.5
  }, 0);

  // Fade in the background container circle
  tlComplianceSequence.to(finalCircleTarget, {
    opacity: 1,
    duration: 0.5,
    ease: "power1.in"
  }, 1.5); 

  // --- STEP 2: Content Fade In (20% -> 50%) ---
  tlComplianceSequence.to(contentElements, {
    y: 0,
    opacity: 1,
    duration: 2,
    stagger: 0.3,
    ease: "power2.out"
  }, 2);

  // --- STEP 3: Hold (50% -> 80%) ---
  // A dummy tween to keep text visible while user scrolls
  tlComplianceSequence.to({}, { duration: 1 }, 4);

  // --- STEP 4: Content Fade Out (80% -> 90%) ---
  tlComplianceSequence.to(contentElements, {
    y: -20,
    opacity: 0,
    duration: 2,
    stagger: 0.1,
    ease: "power2.in"
  }, 5);

  // --- STEP 5: Scale Down (90% -> 100%) ---
  // Shrink dot back to original size
  tlComplianceSequence.to(finalCircleTarget, {
    opacity: 0,
    duration: 1,
    ease: "power1.out"
  }, 7);

  tlComplianceSequence.to(scalingDot, {
    scale: () => calculateComplianceCenterValues(sourcePaths.length - 1, scalingDot).scale, 
    duration: 3,
    ease: "power1.inOut"
  }, 7);
  

  // =============================================================================
  // 7. ANIMATION PHASE 4: FORM GREENTRUTH LOGO
  //    (Move dots from center to form the logo shape)
  // =============================================================================

  // 7a. Pinning for the final section
  ScrollTrigger.create({
    trigger: "#greentruth-connects-section",
    start: "center center",
    end: "+=4000",
    pin: true,
    pinSpacing: true,
    id: "greentruth-pin"
  });

  // 7b. Logo Formation Timeline
  const tlLogoFormation = gsap.timeline({
    scrollTrigger: {
      trigger: "#greentruth-connects-section",
      start: "top bottom", 
      end: () => ScrollTrigger.getById("greentruth-pin").end, 
      scrub: 0.5, // Smoother scrub
      invalidateOnRefresh: true
    }
  });

  // Ensure all dots are visible again
  tlLogoFormation.to(sourcePaths, { opacity: 1, duration: 0.1 }, 0);

  // Setup Final Text
  const greentruthText = document.querySelector("#greentruth-connects-text");
  if (greentruthText) gsap.set(greentruthText, { y: 50, opacity: 0 });

  // Move dots to Logo Formation with Stagger
  tlLogoFormation.to(sourcePaths, {
    x: (index, path) => {
      if (index >= finaltargetDotsData.length) return 0;
      return calculateLogoValues(index, path).xMove;
    },
    y: (index, path) => {
      if (index >= finaltargetDotsData.length) return 0;
      return calculateLogoValues(index, path).yMove;
    },
    scale: (index, path) => {
      if (index >= finaltargetDotsData.length) return 0;
      return calculateLogoValues(index, path).scale;
    },
    fill: (index) => {
      if (index >= finaltargetDotsData.length) return "#303030";
      return finaltargetDotsData[index].color;
    },
    filter: "blur(0px)",
    ease: "power1.inOut",
    stagger: {
      amount: 3, 
      from: "random"
    },
    duration: 1 
  }, 0);

  // Animate Final Text In (starts after dots form)
  if (greentruthText) {
    tlLogoFormation.to(greentruthText, {
      y: 0,
      opacity: 1,
      duration: 1.5, 
      ease: "power2.out"
    }, 4); 
  }


  // =============================================================================
  // 8. ANIMATION PHASE 5: DOM REPARENTING (EXIT)
  //    (Move the floating container into the final section to keep it visible)
  // =============================================================================

  ScrollTrigger.create({
    trigger: "#greentruth-connects-section",
    start: () => ScrollTrigger.getById("greentruth-pin").end, 
    onEnter: () => {
      // 1. Get elements
      const container = document.querySelector("#floating-dots-container");
      const section = document.querySelector("#greentruth-connects-section");
      
      // 2. Calculate the position relative to the section before moving
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      
      const relativeTop = containerRect.top - sectionRect.top;
      const relativeLeft = containerRect.left - sectionRect.left;

      // 3. Move the container into the section (Re-parenting)
      // This stops it from being fixed to the viewport and locks it to the section
      section.appendChild(container);

      // 4. Set Absolute Position relative to this new parent
      container.style.position = "absolute";
      container.style.top = relativeTop + "px";
      container.style.left = relativeLeft + "px";
      container.style.bottom = "auto";
      container.style.width = containerRect.width + "px";
      container.style.height = containerRect.height + "px";
    },
    onLeaveBack: () => {
      // Reverse the process if user scrolls back up
      const container = document.querySelector("#floating-dots-container");
      const hero = document.querySelector("#hero-section"); // Original parent
      
      hero.appendChild(container);

      // Clear inline styles to revert to CSS class defaults (fixed positioning)
      container.style.position = "";
      container.style.top = "";
      container.style.left = "";
      container.style.bottom = "";
      container.style.width = "";
      container.style.height = "";
      
      // Sync animation state
      tlLogoFormation.progress(1, true);
    }
  });

    // =============================================================================
  // 9. GET STARTED SECTION ANIMATIONS
  // =============================================================================

  ScrollTrigger.matchMedia({
    // --- Desktop Only (min-width: 768px) ---
    "(min-width: 768px)": function () {
      
      const section = document.querySelector("#get-started-section");
      if (!section) return;

      const steps = section.querySelectorAll(".get-started-step");
      const header = section.querySelector("#get-started-header");
      const footer = section.querySelector("#greenlight-footer");

      // Initial visibility setup
      gsap.set(header, { autoAlpha: 0 });
      if (footer) gsap.set(footer, { autoAlpha: 0 });

      // 1. PIN THE SECTION
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",     
          end: "+=2500",        
          pin: true,            
          scrub: 1,             
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
             if (footer) gsap.to(footer, { autoAlpha: 1, duration: 0.5 });
          },
          onEnterBack: () => {
             if (footer) gsap.to(footer, { autoAlpha: 0, duration: 0.3 });
          }
        }
      });

      // 2. ANIMATION
      
      // Step 1 drops (from -450 up to 0)
      mainTl.fromTo(steps[0], 
        { y: -450 }, 
        { y: 0, duration: 1, ease: "power1.out" }
      );

      // Fade in the header concurrently with Step 1
      mainTl.to(header, { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, "<+0.1");

      // Step 2 drops (from -250 up to 0)
      mainTl.fromTo(steps[1], 
        { y: -250 }, 
        { y: 0, duration: 1, ease: "power1.out" },
        "<+0.2" // Slight overlap
      );

      mainTl.fromTo(steps[2], 
        { y: -90 }, 
        { y: 0, duration: 1, ease: "power1.out" },
        "<+0.2" // Slight overlap
      );

      // Empty buffer
      mainTl.to({}, { duration: 0.5 });
    },

    // --- Mobile Animation ---
    "(max-width: 767px)": function() {
      // Clean up desktop transforms
      const steps = document.querySelectorAll(".get-started-step");
      gsap.set(steps, { clearProps: "all" });

      // Target the text content containers specifically
      const contents = document.querySelectorAll(".step-content");
      
      contents.forEach((content) => {
        gsap.from(content, {
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 0.8
        });
      });
    }
  });
  

 // =============================================================================
  // 10. HELPER FUNCTIONS (MATH)
  // =============================================================================

  // HELPER: Phase 1 Calculations (Hero -> Mandate)
  function calculateDotValues(index, path) {
    const target = targetDotsData[index];

    // FRESH READS: Get current dimensions of Section, Target Container, and SVG
    const sectionRect = document.querySelector("#mandate-section").getBoundingClientRect();
    const targetRect = targetContainer.getBoundingClientRect();
    const svgRect = sourceSvg.getBoundingClientRect();

    // Calculate center coordinates for the Section and the Target Container
    const sectionCenterX = sectionRect.left + sectionRect.width / 2;
    const sectionCenterY = sectionRect.top + sectionRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    // Calculate ratio to convert screen pixels into SVG coordinate units
    const svgUnitScaleX = 608 / svgRect.width;
    const svgUnitScaleY = 735 / svgRect.height;

    // Calculate distances relative to the section, then map to Window Center
    const distFromSectionCenterX = targetCenterX - sectionCenterX;
    const distFromSectionCenterY = targetCenterY - sectionCenterY;
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    // Determine the final X/Y position on screen where the dot should land
    const finalTargetX = windowCenterX + distFromSectionCenterX;
    const finalTargetY = windowCenterY + distFromSectionCenterY;

    // Calculate the offset from the SVG's center in pixels
    const finalPixelDistX = finalTargetX - (svgRect.left + svgRect.width / 2);
    const finalPixelDistY = finalTargetY - (svgRect.top + svgRect.height / 2);

    // Convert that pixel offset into SVG units
    const finalOffsetX = finalPixelDistX * svgUnitScaleX;
    const finalOffsetY = finalPixelDistY * svgUnitScaleY;

    // Get current position of the specific dot within the SVG
    const bbox = path.getBBox();
    const currentX = bbox.x + bbox.width / 2;
    const currentY = bbox.y + bbox.height / 2;

    // Result: Calculate final travel distance (delta) and scale factor
    const xMove = (target.x + finalOffsetX) - currentX;
    const yMove = (target.y + finalOffsetY) - currentY;
    const scale = (target.r * 2) / bbox.width;

    return { xMove, yMove, scale };
  }

  // HELPER: Phase 2 Calculations (Move to Center of Screen)
  function calculateComplianceCenterValues(index, path) {
    // Destination: Exact center of the viewport
    const destX = window.innerWidth / 2;
    const destY = window.innerHeight / 2;
  
    // Create a point and use Matrix Transform to convert Screen Coords -> SVG Coords
    const svgElement = sourceSvg;
    let pt = svgElement.createSVGPoint();
    pt.x = destX;
    pt.y = destY;
    const svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
  
    // Get current dot position
    const bbox = path.getBBox();
    const currentX = bbox.x + (bbox.width / 2);
    const currentY = bbox.y + (bbox.height / 2);
  
    // Calculate difference between Target SVG position and Current SVG position
    const xMove = svgP.x - currentX;
    const yMove = svgP.y - currentY;
  
    // Calculate scale based on the target radius from data
    const target = targetDotsData[index];
    const scale = (target.r * 2) / bbox.width;
  
    return { xMove, yMove, scale };
  }

  // HELPER: Phase 3 Calculations (Scale Dot to fill target)
  function calculateComplianceScalingValues(path) {
    // Get dimensions of the source SVG and the green target circle
    const svgRect = sourceSvg.getBoundingClientRect();
    const targetRect = document.querySelector("#compliance-circle-target").getBoundingClientRect();
    
    // Calculate the ratio of screen pixels to SVG units
    const targetScreenDiameter = targetRect.width; 
    const vWidth = sourceSvg.viewBox.baseVal.width || 608;
    const pixelsPerUnit = svgRect.width / vWidth;
    const bbox = path.getBBox();
    
    // Calculate the scale needed to make the dot fill the target container
    const scale = targetScreenDiameter / (bbox.width * pixelsPerUnit);

    return { scale };
  }

  // HELPER: Phase 4 Calculations (Formation of Logo)
  function calculateLogoValues(index, path) {
    const targetData = finaltargetDotsData[index];
    
    // Get dimensions/positions of the Section and the Logo container
    const section = document.querySelector("#greentruth-connects-section");
    const logo = document.querySelector("#greentruth-connects-logo");
    const sectionRect = section.getBoundingClientRect();
    const logoRect = logo.getBoundingClientRect();
    
    // Calculate Logo's offset relative to the Section's top-left corner
    const logoRelX = logoRect.left - sectionRect.left;
    const logoRelY = logoRect.top - sectionRect.top;
    
    // Project where the Logo will be when the section is pinned (Centered)
    // const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;
    const pinnedSectionTop = windowCenterY - (sectionRect.height / 2);
    const pinnedSectionLeft = sectionRect.left;
    
    // Calculate the absolute screen coordinates of the Logo container
    const destLogoLeft = pinnedSectionLeft + logoRelX;
    const destLogoTop = pinnedSectionTop + logoRelY;
    
    // Define centers: Logo Cluster (internal) and Logo Div (screen)
    const logoCenterX = 74; 
    const logoCenterY = 74; 
    const destDivCenterX = destLogoLeft + logoRect.width / 2;
    const destDivCenterY = destLogoTop + logoRect.height / 2;
    
    // Calculate the specific dot's final screen X/Y position
    const destX = destDivCenterX - logoCenterX + targetData.x;
    const destY = destDivCenterY - logoCenterY + targetData.y;

    // Convert Screen coordinates to SVG coordinates using Matrix Transform
    let pt = sourceSvg.createSVGPoint();
    pt.x = destX;
    pt.y = destY;
    const svgP = pt.matrixTransform(sourceSvg.getScreenCTM().inverse());

    // Calculate translation (delta) from current position
    const bbox = path.getBBox();
    const currentX = bbox.x + bbox.width / 2;
    const currentY = bbox.y + bbox.height / 2;
    const xMove = svgP.x - currentX;
    const yMove = svgP.y - currentY;

    // Calculate scale: Convert target radius (px) to SVG units
    const currentViewBoxWidth = sourceSvg.viewBox.baseVal.width || 608; 
    const svgRect = sourceSvg.getBoundingClientRect();
    const pixelsPerUnit = svgRect.width / currentViewBoxWidth;
    
    const targetDiameterPx = targetData.r * 2;
    const scale = targetDiameterPx / (bbox.width * pixelsPerUnit);

    return { xMove, yMove, scale };
  }
});