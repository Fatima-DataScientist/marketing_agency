// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate Track Moving Toward the Right
gsap.fromTo(".track-right", 
  { x: "-100px" },
  {
    x: "150px",
    scrollTrigger: {
      trigger: ".work-section",
      start: "top bottom", // Starts animation when the row enters view
      end: "bottom top",   // Ends animation when it leaves the screen
      scrub: 1.2,          // Hardware-accelerated smooth inertia delay
    }
  }
);

// Animate Track Moving Toward the Left
gsap.fromTo(".track-left", 
  { x: "100px" },
  {
    x: "-150px",
    scrollTrigger: {
      trigger: ".work-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,          // Mirror matched easing feel
    }
  }
);



//--------------what we do

// Ensure ScrollTrigger plugin is active
gsap.registerPlugin(ScrollTrigger);

// Target our body text block
// Quick update to match the black background design
gsap.fromTo(".wwd-text", 
  { opacity: 0.15, y: 20 },
  {
    opacity: 1, 
    y: 0,
    scrollTrigger: {
      trigger: ".what-we-do-section",
      start: "top 75%",
      end: "top 35%",
      scrub: 1
    }
  }
);


// -------------services section--------
// Register standard and specialized motion plugins
// Register standard and specialized motion plugins
// Register standard and specialized motion plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Position the tracking diamonds evenly along the SVG Arc path geometry
gsap.set("#node-0", { motionPath: { path: "#arc-path", start: 0.15, end: 0.15 } });
gsap.set("#node-1", { motionPath: { path: "#arc-path", start: 0.50, end: 0.50 } });
gsap.set("#node-2", { motionPath: { path: "#arc-path", start: 0.85, end: 0.85 } });

// Prepare SVG Line Mask for custom draw-in loading behaviors
const progressLine = document.querySelector("#arc-progress");
const pathLength = progressLine.getTotalLength();
gsap.set(progressLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

// 2. Main Master Pin Timeline Execution Setup
const servicesTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".interactive-services",
    start: "top top",      // Pins section to top of screen window frame bounds
    end: "+=2000",         // Duration length multiplier controls scroll pacing speed
    scrub: 1,              // Smoothly links timeline progression directly to the scrollbar
    pin: true,             // Locks view section stable dynamically
    invalidateOnRefresh: true
  }
});

const panels = gsap.utils.toArray(".service-panel");

// 3. Build Sequenced Timeline Stages For Component Swaps
servicesTl
  // Stage 0: Initial First Card state visibility setting
  .to(panels[0], { opacity: 1, y: 0, duration: 0.2 })
  .call(() => setActiveMarker(0), null, 0)

  // Progress Arc filling tracking up to intermediate threshold
  .to(progressLine, { strokeDashoffset: pathLength * 0.5, duration: 0.8 }, "slide1")
  
  // Slide out Panel 0, Slide in Panel 1
  .to(panels[0], { opacity: 0, y: -30, duration: 0.3 }, "slide1")
  .to(panels[1], { opacity: 1, y: 0, duration: 0.4 }, "slide1+=0.2")
  .call(() => setActiveMarker(1), null, "slide1+=0.2")

  // Progress Arc filling tracking up to final section threshold
  .to(progressLine, { strokeDashoffset: pathLength * 0.15, duration: 0.8 }, "slide2")

  // Slide out Panel 1, Slide in Panel 2
  .to(panels[1], { opacity: 0, y: -30, duration: 0.3 }, "slide2")
  .to(panels[2], { opacity: 1, y: 0, duration: 0.4 }, "slide2+=0.2")
  .call(() => setActiveMarker(2), null, "slide2+=0.2")
  
  // Short buffer delay anchor point padding at timeline end sequence
  .to({}, { duration: 0.3 });

// Helper script function managing active diamond highlights dynamically
function setActiveMarker(activeIndex) {
  document.querySelectorAll(".arc-node").forEach((node, idx) => {
    if (idx === activeIndex) {
      node.classList.add("active-node");
    } else {
      node.classList.remove("active-node");
    }
  });
}



// ================= Stats Counting Animation System =================

// Select all target instances configured for digital counters
const counterDigits = document.querySelectorAll(".counter-digit");

counterDigits.forEach((digit) => {
  // Read the targeted numeric integer metric limit directly from the data-target attribute tag
  const targetVal = parseInt(digit.getAttribute("data-target"), 10);

  gsap.fromTo(digit, 
    { textContent: 0 },
    {
      textContent: targetVal,
      duration: 2.5,
      ease: "power3.out",
      // Forces numbers to strictly update as whole numbers (no decimal floats)
      snap: { textContent: 1 }, 
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 75%", // Starts counting upwards when the section enters 75% of browser frame viewport height
        toggleActions: "play none none none" // Plays once cleanly on visibility trigger refresh loops
      }
    }
  );
});


// ================= Continuous Marquee Logo Infini-Scroller =================
const track = document.getElementById("brand MarqueeTrack");

if (track) {
  // Clone the element items twice to generate an seamless infinite carousel runway buffer
  const clone1 = track.innerHTML;
  track.innerHTML = clone1 + clone1 + clone1;

  // Use a standard non-scroll-bound continuous timeline loop
  gsap.to(track, {
    xPercent: -33.333, // Moves down precisely by one setup loop set width length
    duration: 18,       // Control speed (lower value is faster, higher value is slower)
    ease: "none",
    repeat: -1          // Loops infinitely
  });
}


// ================= Testimonials Content Rotation =================

const cards = document.querySelectorAll(".testimonial-card");

// Store only the inner content parts, NOT the card shell itself
const cardContents = Array.from(cards).map(card => card.innerHTML);

let currentOffset = 0;

function rotateTestimonialContent() {
  currentOffset = (currentOffset + 1) % cards.length;

  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 0,
      y: -15,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        const sourceIndex = (i + currentOffset) % cards.length;
        card.innerHTML = cardContents[sourceIndex];

        gsap.fromTo(card,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  });
}

setInterval(rotateTestimonialContent, 2000);