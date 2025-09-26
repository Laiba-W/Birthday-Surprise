// STEP 1: Bulb
const bulb = document.getElementById("bulb");
const glow = bulb.querySelector(".glow");
const clickText = document.getElementById("click-text");
const body = document.body;
const cakeContainer = document.querySelector(".cake-container");

let isOn = false;
//document.body.style.background = "black";
bulb.addEventListener("click", () => {
  if (!isOn) {
    isOn = true;

    // Glow the bulb
    bulb.style.background = "#fff59d";
    bulb.style.boxShadow = "0 0 40px #fff176";
    glow.style.opacity = 1;
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(to bottom, #ffb6c1, #d8b0ff)";
    clickText.style.display = "none";
    //document.body.style.background = "white";
    

    // Fade out bulb after glowing
    setTimeout(() => {
      bulb.style.transition = "opacity 1s ease";
      bulb.style.opacity = 0;

      setTimeout(() => {
        document.querySelector(".bulb-container").style.display = "none";
        cakeContainer.classList.remove("hidden");
        startCakeAnimation();
      }, 1000);
    }, 1500);
  }
});

// STEP 2: Cake animation
function startCakeAnimation() {
    const parts = document.querySelectorAll('.layer, .cream, .candle');
    const flame = document.querySelector('.flame');
    const text = document.querySelector('.text');
  
    parts.forEach((part, index) => {
      setTimeout(() => {
        part.style.animation = "drop 0.7s forwards";
      }, index * 700);
    });
  
    // Show flame + text after cake is built
    setTimeout(() => {
      flame.style.display = "block";
      text.style.opacity = "1";
      startFireworks();
    }, parts.length * 700 + 500);
  }

// STEP 3 : FireWork
// ====================== FIREWORKS ======================

// setup canvas
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: x,
        y: y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        radius: 2,
        life: 100,
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;
    });
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colors;
      ctx.fill();
    });
  }
}

let fireworks = [];
let fireworksInterval;

function animateFireworks() {
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#ffb6c1"); // pink
  gradient.addColorStop(1, "#d8b0ff"); // lilac
  /*ctx.fillStyle = "rgba(0,0,0,0.2)";*/
  /*ctx.fillStyle = "#C4A484";*/
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((f, i) => {
    f.update();
    f.draw(ctx);
    if (f.particles.every(p => p.life <= 0)) {
      fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animateFireworks);
}

function launchFirework() {
  let x = Math.random() * canvas.width;
  let y = Math.random() * (canvas.height / 2);
  let colors = `hsl(${Math.random() * 360}, 100%, 50%)`;
  fireworks.push(new Firework(x, y, colors));
}


// STEP 4 : Button
function startFireworks() {
  if (!fireworksInterval) {
    fireworksInterval = setInterval(launchFirework, 800);
    animateFireworks();

    // Show button 5 seconds later
    setTimeout(() => {
      document.getElementById("surprise-btn").style.display = "block";
    }, 5000);
  }
}

// STEP 5 : popup
const btn = document.getElementById("surprise-btn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const popupMessage = document.getElementById("popup-message");
const nextTaskBtn = document.getElementById("nextTaskBtn"); // 🎁 new button

const message = "On your special day, I just want to remind you how amazing you are ✨. Wishing you happiness, love, and all the wonderful moments you truly deserve 💖.";

function typeMessage(text, element, speed = 50, callback) {
  let i = 0;
  element.innerHTML = "";
  let interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback(); // 👉 run callback when don
    }
  }, speed);
}

// Show popup
btn.addEventListener("click", () => {
  popup.style.display = "flex";
  nextTaskBtn.style.display = "none"; // hide before typing starts
  typeMessage(message, popupMessage, 50, () => {
    // show button after typing finishes
    nextTaskBtn.style.display = "inline-block";
  });
});

// Close popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// ---------------------STEP 6: Text Part----------------

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".stanley-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

nextTaskBtn.addEventListener("click", () => {
  // 🎂 Remove cake
  cakeContainer.innerHTML = ""; 
  cakeContainer.style.display = "none";

  if (fireworksInterval) {
    clearInterval(fireworksInterval);
    fireworksInterval = null;
  }

  // 🎇 Stop fireworks
  //const canvas = document.getElementById("fireworksCanvas");
  const canvas = document.getElementById("fireworks");
  if (canvas) {
     const ctx = canvas.getContext("2d");
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     canvas.remove(); // completely remove fireworks canvas
  }

  // Hide popup after action
  popup.style.display = "none";
  const surBtn = document.getElementById("surprise-btn");
  if (surBtn) {
  surBtn.style.display = "none";
} else {
  console.warn("surprise-btn not found in DOM");
}


  try {
    animationTimeline();
  } catch (err) {
    console.error("Animation failed:", err);
  }
  
  // 👉 Ready for next task (you can trigger anything else here)
  console.log("Cake removed & fireworks stopped — ready for next step!");
  
   
});

//animationTimeline()








