document.addEventListener("DOMContentLoaded", () => {
  // =============================================================================
  // 1. SETUP & UTILITIES
  // =============================================================================

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // OPTIMIZATION: Disconnect animation time from system time if CPU lags
  // This prevents massive "jumps" to catch up if the browser freezes for a moment
  gsap.ticker.lagSmoothing(1000, 16);

  // Handle Window Resize
  let resizeTimer;
  let lastWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    // Always refresh ScrollTrigger immediately
    ScrollTrigger.refresh();

    resizeTimer = setTimeout(() => {
      const currentWidth = window.innerWidth;

      // Only reload if width changed significantly (more than 50px)
      // This prevents reloads from minor address bar show/hide on mobile
      if (Math.abs(currentWidth - lastWidth) > 50) {
        lastWidth = currentWidth;
        window.location.reload();
      } else {
        // For minor changes, just refresh ScrollTrigger again
        ScrollTrigger.refresh();
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
    {
      x: 505.8,
      y: 203.6,
      r: 40,
      color: "#999999",
      blurLevel: 0,
      imagePattern: "url(#img-dot-1)",
    },
    { x: 289.1, y: 371.9, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 494.0, y: 376.1, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 292.4, y: 241.3, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 515.5, y: 357.9, r: 6.1, color: "#303030", blurLevel: 2 },
    { x: 139.8, y: 440.1, r: 6.1, color: "#303030", blurLevel: 2 },
    {
      x: 349.3,
      y: 131.8,
      r: 46,
      color: "#B3B3B3",
      blurLevel: 0,
      imagePattern: "url(#img-dot-2)",
    },
    { x: 98.0, y: 238.9, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 476.2, y: 11.8, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 424.5, y: 156.2, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 530.0, y: 203.3, r: 11.8, color: "#606060", blurLevel: 1 },
    { x: 206.0, y: 45.4, r: 11.8, color: "#606060", blurLevel: 1 },
    {
      x: 140.3,
      y: 310.6,
      r: 50,
      color: "#B3B3B3",
      blurLevel: 0,
      imagePattern: "url(#img-dot-3)",
    },
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
    {
      x: 373.2,
      y: 273.3,
      r: 38,
      color: "#B3B3B3",
      blurLevel: 0,
      imagePattern: "url(#img-dot-4)",
    },
    { x: 188.2, y: 227.1, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 381.8, y: 122.9, r: 17.1, color: "#999999", blurLevel: 0 },
    { x: 542.9, y: 277.5, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 442.3, y: 354.1, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 55.5, y: 156.2, r: 17.1, color: "#999999", blurLevel: 0 },
    { x: 188.2, y: 354.1, r: 17.8, color: "#999999", blurLevel: 0 },
    { x: 240.0, y: 284.6, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    {
      x: 550.2,
      y: 421.2,
      r: 50,
      color: "#B3B3B3",
      blurLevel: 0,
      imagePattern: "url(#img-dot-5)",
    },
    { x: 535.9, y: 138.7, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    { x: 245.9, y: 399.9, r: 23.8, color: "#B3B3B3", blurLevel: 0 },
    { x: 378.8, y: 207.1, r: 23.8, color: "#B3B3B3", blurLevel: 0 },
    { x: 315.3, y: 417.6, r: 22.4, color: "#B3B3B3", blurLevel: 0 },
    { x: 313.0, y: 318.2, r: 23.8, color: "#B3B3B3", blurLevel: 0 },
    { x: 97.9, y: 199.4, r: 8.5, color: "#303030", blurLevel: 0 },
    { x: 305.3, y: 263.6, r: 12.2, color: "#606060", blurLevel: 1 },
    {
      x: 340.4,
      y: 488.5,
      r: 49,
      color: "#B3B3B3",
      blurLevel: 0,
      imagePattern: "url(#img-dot-6)",
    },
    { x: 57.2, y: 402.6, r: 7.9, color: "#242424", blurLevel: 2.5 },
    { x: 270.1, y: 607.0, r: 15.6, color: "#626262", blurLevel: 0.5 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 },
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
  // Leader/scaling references (last dot on top)
  const scalingDot = sourcePaths[sourcePaths.length - 1];
  const otherDots = Array.from(sourcePaths).slice(0, sourcePaths.length - 1);

  // Create Image Clones
  const imageClones = [];

  targetDotsData.forEach((data, index) => {
    if (data.imagePattern) {
      // Find corresponding path
      const original = sourcePaths[index];
      if (!original) return;

      // Clone it
      const clone = original.cloneNode(true);
      // Set new styles
      clone.style.fill = data.imagePattern;
      clone.style.opacity = 0; // Start hidden

      // Append image to group (It is now on top of the dots)
      sourceGroup.appendChild(clone);

      // Store reference
      imageClones.push({ index, element: clone });
    }
  });

  // --- LAYERING FIX ---
  // Currently, the images we just added are "on top" of everything.
  // We need the Leader Dot (the last dot) to be on top of the images.
  // We grab the last dot and append it again. This physically moves it
  // to the very end of the DOM, making it the highest layer.

  const leaderDotRef = sourcePaths[sourcePaths.length - 1];
  sourceGroup.appendChild(leaderDotRef);

  // =============================================================================
  // 3b. PULSE ANIMATION (Alive State) - Gentle Opacity
  // =============================================================================

  // Store pulse tweens so we can kill them when Phase 2 starts
  const pulseTweens = [];

  // Helper function to start pulse animation
  function startPulse() {
    // Clear any existing pulse tweens first
    pulseTweens.forEach((tween) => tween.kill());
    pulseTweens.length = 0;

    sourcePaths.forEach((path, index) => {
      if (index >= targetDotsData.length) return;

      // Skip image clone dots
      if (targetDotsData[index].imagePattern) return;

      // Smooth timing - not too fast, not too slow
      const duration = 1.5 + Math.random() * 1; // 1.5-2.5 seconds
      const delay = Math.random() * 0.5; // 0-0.5 second offset

      const tween = gsap.to(path, {
        opacity: 0.4,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut", // Smoother easing
      });
      pulseTweens.push(tween);
    });
  }

  // Start pulse immediately on page load
  startPulse();

  // =============================================================================
  // 4. ANIMATION PHASE 1: HERO -> MANDATE
  //    (Move dots from hero to first scattered formation)
  // =============================================================================

  // Keep scalingDot hidden in hero; will fade in near the end of mandate arrival
  gsap.set(scalingDot, { opacity: 0 });

  // 4a. Pinning Trigger (Master Controller)
  // Pins the #mandate-section while dots move into place.
  ScrollTrigger.create({
    trigger: "#mandate-section",
    start: "center center",
    end: "+=800",
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    id: "pinning",
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
      invalidateOnRefresh: true, // recalculation on resize
      fastScrollEnd: true,
      preventOverlaps: true,
    },
  });

  tlAnimation.set(sourcePaths, { force3D: true });

  // 1. Reveal the group
  tlAnimation.to(sourceGroup, { opacity: 1 }, 0);

  // 2. Animate every dot to its "Mandate" position
  sourcePaths.forEach((path, index) => {
    if (index >= targetDotsData.length) return;

    // We use Function-based values for x, y, and scale.
    // This runs the logic inside 'calculateDotValues' FRESH on every resize.

    // -- Original Dot (Background/Underlay) --
    tlAnimation.to(
      path,
      {
        x: () => calculateDotValues(index, path).xMove,
        y: () => calculateDotValues(index, path).yMove,
        scale: () => calculateDotValues(index, path).scale,
        fill: targetDotsData[index].color,
        filter: `blur(${targetDotsData[index].blurLevel}px)`,
        transformOrigin: "center center",
        ease: "power1.inOut",
      },
      0
    );

    // -- Image Clone (Overlay) --
    const cloneObj = imageClones.find((c) => c.index === index);
    if (cloneObj) {
      tlAnimation.to(
        cloneObj.element,
        {
          x: () => calculateDotValues(index, path).xMove,
          y: () => calculateDotValues(index, path).yMove,
          scale: () => calculateDotValues(index, path).scale,
          autoAlpha: 1, // Fade IN the image
          filter: "blur(0px)",
          transformOrigin: "center center",
          ease: "power1.inOut",
        },
        0
      );
    }
  });

  // 3. Fade in scalingDot only near the end of mandate arrival
  const mandateFadeInTime = Math.max(tlAnimation.duration() - 0.2, 0);
  tlAnimation.to(
    scalingDot,
    { opacity: 1, duration: 0.2, ease: "power1.inOut" },
    mandateFadeInTime
  );

  // =============================================================================
  // 5. ANIMATION PHASE 2: FLOCK MERGE (MOVEMENT ONLY)
  //    (Dots simply fly to the center. No scaling yet.)
  // =============================================================================

  // A. Define Actors (SWITCHED TO LAST DOT)
  // The last dot in the DOM is always visually "on top" in SVG.
  const leaderIndex = sourcePaths.length - 1;
  const leaderDot = sourcePaths[leaderIndex];

  // The flock is everyone ELSE (indices 0 to length-1)
  let flockDots = Array.from(sourcePaths).slice(0, leaderIndex);

  // B. Timing Configuration
  const flockStartTime = 1.0;
  const streamDuration = 8.0;

  // C. Sort Flock by Distance
  const windowCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  flockDots.sort((a, b) => {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    const distA = Math.hypot(
      rectA.x - windowCenter.x,
      rectA.y - windowCenter.y
    );
    const distB = Math.hypot(
      rectB.x - windowCenter.x,
      rectB.y - windowCenter.y
    );
    return distA - distB;
  });

  // D. FLOCK ANIMATION TIMELINE (Define first)
  // -------------------------------------------------------------------------
  // IMPORTANT: Start Phase 2 only after Phase 1 is completely done
  // Use "top center" instead of "top bottom" to ensure mandate section is past before starting
  const tlComplianceTransition = gsap.timeline({
    scrollTrigger: {
      trigger: "#compliance-section",
      start: "top center", // Start later to ensure Phase 1 is complete
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      preventOverlaps: true,
      onEnter: () => {
        // KILL PULSE: Stop all pulse animations so dots can flock cleanly
        pulseTweens.forEach((tween) => tween.kill());
        pulseTweens.length = 0;
        // Reset opacity to full
        gsap.set(sourcePaths, { opacity: 1 });
      },
      onLeaveBack: () => {
        // RESTART PULSE: When scrolling back to mandate/hero section
        // Reset opacity for all dots EXCEPT the scaling dot (leader)
        otherDots.forEach((dot) => gsap.set(dot, { opacity: 1 }));
        // Keep scaling dot hidden in hero
        gsap.set(scalingDot, { opacity: 0 });
        startPulse();
      },
    },
  });

  // E. LEADER DOT ANIMATION (Phase 2)
  tlComplianceTransition.to(
    leaderDot,
    {
      x: () => calculateComplianceCenterValues(leaderIndex, leaderDot).xMove,
      y: () => calculateComplianceCenterValues(leaderIndex, leaderDot).yMove,
      fill: "#142D21",

      // FIX: Force the leader to be sharp as it arrives at the center
      filter: "blur(0px)",

      duration: 50,
      ease: "none",
      overwrite: "auto",
    },
    0.1
  );

  // E. FLOCK ANIMATION (Just Movement)
  // -------------------------------------------------------------------------

  flockDots.forEach((dot, i) => {
    const originalIndex = Array.from(sourcePaths).indexOf(dot);
    const dest = calculateComplianceCenterValues(originalIndex, dot);

    const progress = i / flockDots.length;
    const arrivalDelay = progress * streamDuration * 5.0;
    const travelDuration = 40.0 + Math.random() * 16.0;
    let startTime = flockStartTime + arrivalDelay;

    tlComplianceTransition.to(
      dot,
      {
        x: () => dest.xMove,
        y: () => dest.yMove,
        fill: "#142D21",

        // FIX: Remove blur as they fly to the center.
        // This prevents the "shadow cluster" effect.
        filter: "blur(0px)",

        duration: travelDuration,
        ease: "power2.in",
        overwrite: "auto",
      },
      startTime
    );

    // Image Clone Handling
    const cloneObj = imageClones.find((c) => c.index === originalIndex);
    if (cloneObj) {
      tlComplianceTransition.to(
        cloneObj.element,
        {
          x: () => dest.xMove,
          y: () => dest.yMove,
          autoAlpha: 0,
          duration: travelDuration,
          ease: "power2.in",
          overwrite: "auto",
        },
        startTime
      );
    }
  });

  // =============================================================================
  // 6. ANIMATION PHASE 3: COMPLIANCE SEQUENCE
  // =============================================================================

  // 6a. Main Timeline
  const tlComplianceSequence = gsap.timeline({
    scrollTrigger: {
      trigger: "#compliance-section",
      start: "center center",
      end: "+=6000",
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      preventOverlaps: true,
    },
  });

  const finalCircleTarget = document.querySelector("#compliance-circle-target");

  // Text elements
  const contentElements = [
    "#compliance-heading",
    "#compliance-li-1",
    "#compliance-li-2",
    "#compliance-li-3",
    "#compliance-text-1",
    "#compliance-text-2",
  ];

  // --- CRITICAL FIX: CLEAN SLATE ---
  // Instantly remove 'blur' filters from EVERY dot (Leader + Flock).
  // This prevents the flock behind the leader from looking like a "shadow" or "glow".
  tlComplianceSequence.set(
    sourcePaths,
    {
      filter: "none",
      force3D: true,
    },
    0
  );

  gsap.set(contentElements, { y: 20, opacity: 0 });

  // --- STEP 1: Absorb & Scale Up (0% -> 20%) ---
  // FIX: Removed x/y from 'from' vars to prevent jumping back to previous calculated positions.
  // We trust Phase 2 has successfully moved it to the center.
  tlComplianceSequence.fromTo(
    scalingDot,
    {
      scale: () =>
        calculateComplianceCenterValues(sourcePaths.length - 1, scalingDot)
          .scale,
      fill: "#142D21",
      transformOrigin: "center center",
    },
    {
      scale: () => calculateComplianceScalingValues(scalingDot).scale,
      fill: "#142D21",
      duration: 2,
      ease: "power1.inOut",
      immediateRender: false,
      overwrite: "auto", // Ensures Phase 1 stops fighting
    },
    0
  );

  // B. "Absorb" the flock
  tlComplianceSequence.to(
    otherDots,
    {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "power1.in",
      stagger: { amount: 0.5, from: "center" },
    },
    0
  );

  // C. Reveal Green Background
  tlComplianceSequence.to(
    finalCircleTarget,
    {
      opacity: 1,
      duration: 0.01,
      ease: "power1.in",
    },
    1.8
  );

  // --- STEP 2: Content Fade In (20% -> 50%) ---
  tlComplianceSequence.to(
    contentElements,
    {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.3,
      ease: "power2.out",
    },
    2
  );

  // --- STEP 3: Hold (50% -> 80%) ---
  tlComplianceSequence.to({}, { duration: 2 }, 4);

  // --- STEP 4: Content Fade Out (80% -> 90%) ---
  tlComplianceSequence.to(
    contentElements,
    {
      y: -20,
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      ease: "power2.in",
    },
    6
  );

  // Fade out container
  tlComplianceSequence.to(
    finalCircleTarget,
    {
      opacity: 0,
      duration: 0.01,
      ease: "power2.in",
    },
    8
  );

  // --- STEP 5: Scale Down & Logo Formation Transition (90% -> 100%) ---

  // 5a. Scaling Dot: Shrinks FIRST (Stays in center)
  tlComplianceSequence.to(
    scalingDot,
    {
      scale: () =>
        calculateLogoValues(sourcePaths.length - 1, scalingDot).scale, // Scale to final logo size
      // x & y stay at center for now
      duration: 2,
      ease: "power1.inOut",
    },
    8.5
  );

  // 5b. Flock: Moves OUT while leader is shrinking
  // The flock leaves the center to form the logo while the leader stays put & shrinks.
  tlComplianceSequence.set(otherDots, { opacity: 1 }, 8.5);

  tlComplianceSequence.to(
    otherDots,
    {
      x: (index, path) => calculateLogoValues(index, path).xMove,
      y: (index, path) => calculateLogoValues(index, path).yMove,
      scale: (index, path) => calculateLogoValues(index, path).scale,
      fill: (index) => finaltargetDotsData[index]?.color ?? "#303030",
      filter: "blur(0px)",
      duration: 2.5,
      ease: "power2.inOut",
      stagger: {
        amount: 1,
        from: "random",
      },
    },
    8.5
  );

  // 5c. Scaling Dot: Moves LAST
  // After it has finished shrinking (at 8.5 + 2 = 10.5), it moves to its final spot.
  tlComplianceSequence.to(
    scalingDot,
    {
      x: () => calculateLogoValues(sourcePaths.length - 1, scalingDot).xMove,
      y: () => calculateLogoValues(sourcePaths.length - 1, scalingDot).yMove,
      fill: () =>
        finaltargetDotsData[sourcePaths.length - 1]?.color ?? "#303030",
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power1.inOut",
    },
    10.5
  );

  // =============================================================================
  // 7. ANIMATION PHASE 4: FORM GREENTRUTH LOGO
  //    (Move dots from center to form the logo shape)
  // =============================================================================

  // 7a. Pinning for the final section
  ScrollTrigger.create({
    trigger: "#greentruth-connects-section",
    start: "center center",
    end: "+=800", // Reduced from 1100 to 600 for faster exit
    pin: true,
    pinSpacing: true,
    id: "greentruth-pin",
  });

  // 7b. Logo Formation Timeline (Text Reveal Only)
  // Movement is now handled in the previous phase for continuous flow.
  const tlLogoFormation = gsap.timeline({
    scrollTrigger: {
      trigger: "#greentruth-connects-section",
      start: "center center", // Changed from "top bottom" to fix "coming from bottom" visual
      end: () => ScrollTrigger.getById("greentruth-pin").end,
      scrub: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      preventOverlaps: true,
    },
  });

  // Setup Final Text
  const greentruthText = document.querySelector("#greentruth-connects-text");
  if (greentruthText) gsap.set(greentruthText, { y: 20, opacity: 0 });

  // Animate Final Text In (starts after dots form)
  if (greentruthText) {
    tlLogoFormation.to(
      greentruthText,
      {
        y: 0,
        opacity: 1,
        duration: 0.2, // Faster duration relative to scroll distance
        ease: "power2.out",
      },
      0
    );

    // Add buffer to timeline so animation completes early
    tlLogoFormation.to({}, { duration: 0.7 });
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
    },
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
      const logo = section.querySelector("#sticky-logo");

      // --- 1. INITIAL SETUP ---
      // We want to align the bottoms of the orange content initially.
      // PLUS a small base amount so they can "move up" a bit even for Step 1.
      const baseShift = 50;
      // DYNAMIC CALCULATION based on actual DOM height (since we now use CSS clamp)
      const step2Spacer = steps[1].querySelector(".bg-white");
      const step3Spacer = steps[2].querySelector(".bg-white");

      const spacer2 = step2Spacer ? step2Spacer.offsetHeight : 0;
      const spacer3 = step3Spacer ? step3Spacer.offsetHeight : 0;

      const startY1 = baseShift;
      const startY2 = baseShift + spacer2;
      const startY3 = baseShift + spacer3;

      // Set initial positions
      // Note: (Step 1, 2, 3)
      gsap.set(steps[0], { y: startY1 });
      gsap.set(steps[1], { y: startY2 });
      gsap.set(steps[2], { y: startY3 });

      // Ensure Logo starts at 20% opacity
      if (logo) gsap.set(logo, { opacity: 0.2 });

      // --- 2. TIMELINE CONFIGURATION ---
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top+50px top+=15px",
          end: () => (window.innerWidth < 1280 ? "+=1200" : "+=2300"),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // --- 3. ANIMATION LOGIC ---
      // All move UP together (same speed) to y:0.
      // Step 1 travels 'startY1', Step 2 'startY2', Step 3 'startY3'.
      // Step 3 (Longest distance)
      mainTl.to(
        steps[2],
        {
          y: 0,
          duration: startY3,
          ease: "none",
        },
        0
      );

      // Step 2 (Middle distance)
      mainTl.to(
        steps[1],
        {
          y: 0,
          duration: startY2,
          ease: "none",
        },
        0
      );

      // Step 1 (Shortest distance)
      mainTl.to(
        steps[0],
        {
          y: 0,
          duration: startY1,
          ease: "none",
        },
        0
      );

      // --- 4. LOGO ANIMATION ---
      // "only step-3 starts scrolling up... and while logo will become 1 opacity"
      if (logo) {
        mainTl.to(
          logo,
          {
            opacity: 1,
            duration: 150, // Fixed duration for fade in
            ease: "none",
          },
          startY3
        ); // Starts exactly when Step 3 FINISHES moving
      }

      // --- 5. Get started FOOTER ANIMATION ---
      // Initially opacity 0.
      // Appears AFTER logo becomes opacity 1.
      const footer = section.querySelector("#greenlight-footer");
      if (footer) {
        gsap.set(footer, { opacity: 0 }); // Ensure it starts hidden

        mainTl.to(
          footer,
          {
            opacity: 1,
            duration: 150, // Arbitrary duration for fade-in
            ease: "none",
          },
          startY3 + 150
        ); // Starts after Logo finishes fading in (startY3 + 150)
      }

      // Add a substantial buffer at the end so the user can read the content
      // before the footer scrolls into view.
      mainTl.to({}, { duration: 200 }); // Large buffer for a "hold" phase
    },

    // --- Mobile Animation ---
    "(max-width: 767px)": function () {
      const steps = document.querySelectorAll(".get-started-step");
      const logo = document.querySelector("#sticky-logo");
      gsap.set([steps, logo], { clearProps: "all" });

      const contents = document.querySelectorAll(".step-content");
      contents.forEach((content) => {
        gsap.from(content, {
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 15,
          opacity: 0,
          duration: 0.8,
        });
      });
    },
  });

  // =============================================================================
  // 10. HELPER FUNCTIONS (MATH)
  // =============================================================================

  // HELPER: Phase 1 Calculations (Hero -> Mandate)
  function calculateDotValues(index, path) {
    const target = targetDotsData[index];

    // FRESH READS: Get current dimensions of Section, Target Container, and SVG
    const sectionRect = document
      .querySelector("#mandate-section")
      .getBoundingClientRect();
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
    const xMove = target.x + finalOffsetX - currentX;
    const yMove = target.y + finalOffsetY - currentY;
    const scale = (target.r * 2) / bbox.width;

    return { xMove, yMove, scale };
  }

  // HELPER: Phase 2 Calculations (Move to Center of Screen)
  function calculateComplianceCenterValues(index, path) {
    // Destination: Exact center of the viewport
    // We use window dimensions because the target section IS pinned to the center of the viewport.
    // Measuring the DOM element directly (getBoundingClientRect) causes jitters/drift if calculated during scroll.
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
    const currentX = bbox.x + bbox.width / 2;
    const currentY = bbox.y + bbox.height / 2;

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
    const targetRect = document
      .querySelector("#compliance-circle-target")
      .getBoundingClientRect();

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
    // FIX: Handle index out of bounds (if sourcePaths > finaltargetDotsData)
    // Map excess dots to existing logo positions (using modulo to cycle through)
    let targetData = finaltargetDotsData[index];
    if (!targetData) {
      targetData = finaltargetDotsData[index % finaltargetDotsData.length];
    }

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
    const pinnedSectionTop = windowCenterY - sectionRect.height / 2;
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
