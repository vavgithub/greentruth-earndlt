document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- 45 dots ---
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
    { x: 240.0, y: 284.6, r: 22.4, color: "#B3B3B3", blurLevel: 2 },
    { x: 404.2, y: 301.2, r: 22.4, color: "#B3B3B3", blurLevel: 2 },
    { x: 535.9, y: 138.7, r: 22.4, color: "#B3B3B3", blurLevel: 2 },
    { x: 245.9, y: 399.9, r: 23.8, color: "#B3B3B3", blurLevel: 2 },
    { x: 378.8, y: 227.1, r: 23.8, color: "#B3B3B3", blurLevel: 2 },
    { x: 315.3, y: 417.6, r: 22.4, color: "#B3B3B3", blurLevel: 2 },
    { x: 313.0, y: 268.2, r: 23.8, color: "#B3B3B3", blurLevel: 2 },
    { x: 97.9, y: 199.4, r: 8.5, color: "#303030", blurLevel: 2 },
    { x: 305.3, y: 263.6, r: 12.2, color: "#606060", blurLevel: 1 },
    { x: 220.4, y: 388.5, r: 10.8, color: "#404040", blurLevel: 1.5 },
    { x: 157.2, y: 402.6, r: 7.9, color: "#242424", blurLevel: 2.5 },
    { x: 270.1, y: 607.0, r: 15.6, color: "#626262", blurLevel: 0.5 },
    { x: 390.0, y: 405.7, r: 11.3, color: "#434343", blurLevel: 1 }
  ];

  const sourceSvg = document.querySelector("#hero-floating-dots");
  const sourceGroup = sourceSvg.querySelector("g");
  const sourcePaths = sourceSvg.querySelectorAll("path");
  const targetContainer = document.querySelector("#mandate-section-target");

  // --- ANIMATION IMPLEMENTATION ---
  // 1. The Pinning Trigger (Master Controller for the Section)
  ScrollTrigger.create({
    trigger: "#mandate-section",
    start: "center center",
    end: "+=800",
    pin: true,
    pinSpacing: true,
    id: "pinning"
  });

  const tlAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-section",
      start: "top top",
      endTrigger: "#mandate-section",
      // end: "center center", // Removed duplicate key
      end: () => ScrollTrigger.getById("pinning").start + 400,
      scrub: 1,
      invalidateOnRefresh: true // <--- IMPORTANT: Forces recalculation on resize
    }
  });

  // Animate the group opacity to 1
  tlAnimation.to(sourceGroup, { opacity: 1 }, 0);

  // 2. APPLY THE ANIMATION
  sourcePaths.forEach((path, index) => {
    if (index >= targetDotsData.length) return;

    // We use Function-based values for x, y, and scale.
    // This runs the calculation logic FRESH every time the user resizes the window.
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

  // --- PHASE 2: Move from Mandate End to Compliance Center ---

  // 1. Pinning is now handled by the tlComplianceSequence ScrollTrigger
  // to ensure synchronization between the pin and the animation timeline.

  // 2. Animate Dots towards Compliance Center
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

  // 3. Scale ONE Dot to fill the Green Circle & Animate Content
  // We combine scaling, content fade-in, and content fade-out into one timeline
  const tlComplianceSequence = gsap.timeline({
    scrollTrigger: {
      trigger: "#compliance-section",
      start: "center center",
      end: "+=6000", // Increased for longer sequence
      pin: true,     // Pinning integrated here
      scrub: 0.1,    // Responsive scrubbing
      invalidateOnRefresh: true
    }
  });

  // Pick the last dot (top-most in SVG) to expand
  const scalingDot = sourcePaths[sourcePaths.length - 1];

  // Ensure scalingDot is visible at start of sequence (fix for glitch)
  tlComplianceSequence.set(scalingDot, { opacity: 1 }, 0);
  const otherDots = Array.from(sourcePaths).slice(0, sourcePaths.length - 1);
  const finalCircleTarget = document.querySelector("#compliance-circle-target");
  
  // Elements to animate inside
  const contentElements = [
    "#compliance-heading",
    "#compliance-li-1",
    "#compliance-li-2",
    "#compliance-li-3",
    "#compliance-text-1",
    "#compliance-text-2"
  ];

  // Initial setup
  gsap.set(contentElements, { y: 20, opacity: 0 });
  
  // --- STEP 1: Scale Up (0% -> 20%) ---
  tlComplianceSequence.to(scalingDot, {
    scale: () => calculateComplianceScalingValues(scalingDot).scale,
    fill: "#142D21",
    filter: "blur(0px)",
    duration: 2, // Relative duration
    ease: "power1.inOut"
  }, 0);

  // Fade out other dots simultaneously
  tlComplianceSequence.to(otherDots, {
    opacity: 0,
    duration: 0.5
  }, 0);

  // Fade in the target container (background circle) near the end of scaling
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

  // --- STEP 3: Hold (Text stays visible) ---
  // We add a dummy tween to create a pause/hold duration.
  // Previous ends at 4. We hold for 4 units (until 8).
  tlComplianceSequence.to({}, { duration: 1 }, 4);

  // --- STEP 4: Content Fade Out ---
  // Starts after Hold (at 8).
  tlComplianceSequence.to(contentElements, {
    y: -20,
    opacity: 0,
    duration: 2,
    stagger: 0.1,
    ease: "power2.in"
  }, 5);

  // --- STEP 5: Scale Down ---
  // Starts after Content Fade Out (8 + 2 = 10).
  // Scale the dot back down to original small size
  // And fade out the container background
  tlComplianceSequence.to(finalCircleTarget, {
    opacity: 0,
    duration: 1, // Quick fade for container
    ease: "power1.out"
  }, 7);

  tlComplianceSequence.to(scalingDot, {
    scale: () => calculateComplianceCenterValues(sourcePaths.length - 1, scalingDot).scale, 
    duration: 3, // Slow scale down (10 to 13)
    ease: "power1.inOut"
  }, 7);
  
  // --- PHASE 4: Form the GreenTruth Logo ---
  
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

  // 1. Combine Pinning and Animation into a single, slower timeline
  const tlLogoFormation = gsap.timeline({
    scrollTrigger: {
      trigger: "#greentruth-connects-section",
      start: "center center",
      end: "+=3000", // Increased duration for slower, clearer movement
      pin: true,
      scrub: 1, // Smooth scrubbing
      invalidateOnRefresh: true
    }
  });

  // Ensure all dots are visible for this phase
  tlLogoFormation.to(sourcePaths, { opacity: 1, duration: 0.1 }, 0);

  // Move dots to Logo Formation with Stagger
  // We use function-based values and a stagger to make them "separate" visually
  tlLogoFormation.to(sourcePaths, {
    x: (index, target) => {
      if (index >= finaltargetDotsData.length) return 0;
      return calculateLogoValues(index, target).xMove;
    },
    y: (index, target) => {
      if (index >= finaltargetDotsData.length) return 0;
      return calculateLogoValues(index, target).yMove;
    },
    scale: (index, target) => {
      if (index >= finaltargetDotsData.length) return 0;
      return calculateLogoValues(index, target).scale;
    },
    fill: (index) => {
      if (index >= finaltargetDotsData.length) return "#303030";
      return finaltargetDotsData[index].color;
    },
    filter: "blur(0px)",
    ease: "power2.inOut",
    stagger: {
      amount: 2, // Spread start times over 2 seconds relative to timeline
      from: "random" // Dots will leave center in a random order, creating separation
    },
    duration: 3 // Each dot takes 3 relative seconds to travel
  }, 0);

  
  // --- HELPER FUNCTION: Contains your original math, but runs dynamically ---
  // --- HELPER for Phase 1 ---
  function calculateDotValues(index, path) {
    const target = targetDotsData[index];

    // 1. FRESH READS of Element Positions (Key to responsiveness)
    const sectionRect = document.querySelector("#mandate-section").getBoundingClientRect();
    const targetRect = targetContainer.getBoundingClientRect();
    const svgRect = sourceSvg.getBoundingClientRect();

    // Calculate the center of the SECTION
    const sectionCenterX = sectionRect.left + sectionRect.width / 2;
    const sectionCenterY = sectionRect.top + sectionRect.height / 2;

    // Calculate the center of the TARGET DIV
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    // Convert to SVG units (Recalculated on resize because svgRect changes)
    const svgUnitScaleX = 608 / svgRect.width;
    const svgUnitScaleY = 735 / svgRect.height;

    // Distance from Section Center to Target Center
    const distFromSectionCenterX = targetCenterX - sectionCenterX;
    const distFromSectionCenterY = targetCenterY - sectionCenterY;

    // When animation ends (Window Center)
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    // Final Target Position
    const finalTargetX = windowCenterX + distFromSectionCenterX;
    const finalTargetY = windowCenterY + distFromSectionCenterY;

    // Compare Final Target Position to SVG's current center
    const finalPixelDistX = finalTargetX - (svgRect.left + svgRect.width / 2);
    const finalPixelDistY = finalTargetY - (svgRect.top + svgRect.height / 2);

    // Convert to "SVG Units"
    const finalOffsetX = finalPixelDistX * svgUnitScaleX;
    const finalOffsetY = finalPixelDistY * svgUnitScaleY;

    // Dot specific calculations
    const bbox = path.getBBox();
    const currentX = bbox.x + bbox.width / 2;
    const currentY = bbox.y + bbox.height / 2;

    // Calculate moves
    const xMove = (target.x + finalOffsetX) - currentX;
    const yMove = (target.y + finalOffsetY) - currentY;
    const scale = (target.r * 2) / bbox.width;

    return { xMove, yMove, scale };
  }

  // --- HELPER for Phase 2 ---
  function calculateComplianceCenterValues(index, path) {
    // 1. Define the Destination (Client Coordinates)
    // Since #compliance-circle-target is absolutely centered (left-1/2 top-1/2),
    // its destination during the pin is exactly the center of the viewport.
    const destX = window.innerWidth / 2;
    const destY = window.innerHeight / 2;
  
    // 2. Convert Screen Coordinates -> SVG Coordinates
    // We use the SVG's own matrix to map the pixel point into SVG units (viewBox space)
    const svgElement = document.querySelector("svg"); // Ensure this selects your specific parent SVG
    
    // Create a point to transform
    let pt = svgElement.createSVGPoint();
    pt.x = destX;
    pt.y = destY;
  
    // Transform the point using the inverse of the Screen CTM
    // This handles all CSS scaling, aspect ratios, and positioning automatically.
    const svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
  
    // 'svgP' is now the exact (x, y) inside the SVG viewBox that aligns with the screen center.
  
    // 3. Calculate the GSAP Move Values
    const bbox = path.getBBox();
    const currentX = bbox.x + (bbox.width / 2);
    const currentY = bbox.y + (bbox.height / 2);
  
    const xMove = svgP.x - currentX;
    const yMove = svgP.y - currentY;
  
    // 4. Calculate Scale (Optional - keeps your existing sizing logic)
    // This calculates how much to scale the dot to reach 15px on screen
    const currentViewBoxWidth = 608; // Your SVG's internal width
    const svgRect = svgElement.getBoundingClientRect();
    const pixelsPerUnit = svgRect.width / currentViewBoxWidth; 
    // Note: This scale logic is rough; for precision, consider checking the CTM.a property.
    
    const targetScreenSize = 15;
    const scale = targetScreenSize / (bbox.width * pixelsPerUnit);
  
    return { xMove, yMove, scale };
  }

  // --- HELPER for Phase 3 (Scaling) ---
  function calculateComplianceScalingValues(path) {
    const svgRect = sourceSvg.getBoundingClientRect();
    const targetRect = document.querySelector("#compliance-circle-target").getBoundingClientRect();
    
    // We want the dot to match the targetRect size on screen.
    // Target is a circle (600px or 680px).
    const targetScreenDiameter = targetRect.width; 
    
    const pixelsPerUnit = svgRect.width / 608;
    const bbox = path.getBBox();
    
    // Calculate required scale
    const scale = targetScreenDiameter / (bbox.width * pixelsPerUnit);

    return { scale };
  }

  // --- HELPER for Phase 4 ---
  function calculateLogoValues(index, path) {
    const targetData = finaltargetDotsData[index];
    const targetDiv = document.querySelector("#greentruth-connects-logo");
    
    // 1. Target Position in Screen Pixels
    const targetRect = targetDiv.getBoundingClientRect();
    
    // Center the 148x148 logo cluster in the target div
    // Logo Data coordinates range from approx 5 to 142. Center is approx 74.
    const logoCenterX = 74;
    const logoCenterY = 74;
    
    const divCenterX = targetRect.left + targetRect.width / 2;
    const divCenterY = targetRect.top + targetRect.height / 2;
    
    // Calculate where this specific dot should be on screen
    const destX = divCenterX - logoCenterX + targetData.x;
    const destY = divCenterY - logoCenterY + targetData.y;

    // 2. Convert Screen Coordinates -> SVG Coordinates
    // Using the sourceSvg to map the point back into the SVG's coordinate space
    let pt = sourceSvg.createSVGPoint();
    pt.x = destX;
    pt.y = destY;
    const svgP = pt.matrixTransform(sourceSvg.getScreenCTM().inverse());

    // 3. Calculate Moves
    const bbox = path.getBBox();
    const currentX = bbox.x + bbox.width / 2;
    const currentY = bbox.y + bbox.height / 2;

    const xMove = svgP.x - currentX;
    const yMove = svgP.y - currentY;

    // 4. Calculate Scale
    // We compare target radius (in screen pixels) to the dot's SVG width
    const currentViewBoxWidth = 608; 
    const svgRect = sourceSvg.getBoundingClientRect();
    const pixelsPerUnit = svgRect.width / currentViewBoxWidth;
    
    const targetRadiusPx = targetData.r;
    const targetDiameterPx = targetRadiusPx * 2;
    
    const scale = targetDiameterPx / (bbox.width * pixelsPerUnit);

    return { xMove, yMove, scale };
  }
});