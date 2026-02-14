let music, playPauseBtn;

// Floating hearts background
function createFloatingHearts() {
  const container = document.getElementById("bgHearts");
  const hearts = ["💕", "💖", "💗", "💝", "💘", "❤️"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 10 + 10 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 17000);
  }, 3000);
}

// NO button runs away and YES button grows
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noBtnAttempts = 0;

noBtn.addEventListener("mouseenter", () => {
  noBtnAttempts++;

  // First time: make it absolute positioned
  if (noBtnAttempts === 1) {
    const rect = noBtn.getBoundingClientRect();
    const containerRect = noBtn.parentElement.getBoundingClientRect();
    noBtn.classList.add("running");
    noBtn.style.left = rect.left - containerRect.left + "px";
    noBtn.style.top = rect.top - containerRect.top + "px";
  }

  const container = document.getElementById("buttonContainer");
  const containerRect = container.getBoundingClientRect();

  // Make NO button progressively smaller and faster
  const newSize = Math.max(0.3, 1 - noBtnAttempts * 0.15);
  noBtn.style.transform = `scale(${newSize})`;
  noBtn.style.transition = `all ${Math.max(0.1, 0.3 - noBtnAttempts * 0.02)}s ease`;

  // Random position
  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  // Make YES button GROW BIGGER with each attempt
  const yesSize = 1 + noBtnAttempts * 0.2;
  const yesPadding = 20 + noBtnAttempts * 5;
  yesBtn.classList.add("growing");
  yesBtn.style.transform = `scale(${yesSize})`;
  yesBtn.style.padding = `${yesPadding}px ${yesPadding * 2.5}px`;

  // If YES button gets really big, cover most of screen
  if (noBtnAttempts >= 8) {
    yesBtn.style.transform = `scale(${Math.min(yesSize, 3)})`;
    yesBtn.style.fontSize = "2rem";
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
  }
});

// YES button clicked
yesBtn.addEventListener("click", () => {
  const badge = document.getElementById("musicBadge");

  if (music) {
    music
      .play()
      .then(() => {
        badge.classList.add("show");
        playPauseBtn.textContent = "||";
      })
      .catch(() => {});
  }

  // 🔓 Unlock scrolling
  document.body.classList.remove("lock-scroll");

  // Hide buttons
  document.getElementById("buttonContainer").style.display = "none";

  // Show success section
  document.getElementById("successSection").classList.add("show");

  // Create confetti
  createConfetti();

  // Scroll to success section
  setTimeout(() => {
    document.getElementById("successSection").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);
});

// Confetti animation
function createConfetti() {
  const colors = ["#FFB3D9", "#FF8FAB", "#FF6B9D", "#FFE5F1", "#FFD700", "#FFA500"];

  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = "50%";
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 10 + 5 + "px";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 20);
  }
}

// Love letter envelope
const envelope = document.getElementById("envelope");
envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
});

// Photo reveal function
function revealPhoto(card) {
  const placeholder = card.querySelector(".photo-placeholder");
  const content = card.querySelector(".photo-content");

  if (!content.classList.contains("revealed")) {
    placeholder.style.display = "none";
    content.classList.add("revealed");

    // Add sparkle effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.textContent = "✨";
        sparkle.style.position = "absolute";
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 100 + "%";
        sparkle.style.animation = "fadeIn 0.5s ease-out forwards";
        sparkle.style.fontSize = "1.5rem";
        card.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
      }, i * 50);
    }
  }
}

// 💖 LOVE BURST
const sparkleBtn = document.getElementById("loveSparkleBtn");

if (sparkleBtn) {
  sparkleBtn.addEventListener("click", () => {
    const hearts = ["💖", "💕", "💗", "💘", "❤️"];

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div");
      heart.className = "pop-heart";
      heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

      // Random position anywhere on screen
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = Math.random() * window.innerHeight + "px";

      // Random size
      heart.style.fontSize = Math.random() * 20 + 16 + "px";

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1800);
    }
  });
}

// ❤️ WHY I LOVE YOU SECTION
const whyBtn = document.getElementById("whyLoveBtn");
const whyBox = document.getElementById("whyLoveBox");
const whyText = document.getElementById("whyText");
const whyCounter = document.getElementById("whyCounter");

const loveReasons = [
  "I love you because you feel like home somewhere safe only for me.",
  "I love you for the way you support me, calm me, and stand by me no matter what.",
  "I love you because with you, even ordinary moments feel magical.",
];

let loveIndex = 0;

if (whyBtn) {
  whyBtn.addEventListener("click", () => {
    if (loveIndex < loveReasons.length) {
      whyBox.style.display = "block";
      whyCounter.textContent = loveIndex + 1 + "/3";
      whyText.textContent = loveReasons[loveIndex];
      loveIndex++;
    } else {
      loveIndex = 0;
      whyCounter.textContent = "Again? 😉";
      whyText.textContent = "You just wanted to hear it one more time, didn’t you?";
    }
  });
}

// Easter egg surprises
function toggleSurprise(num) {
  const message = document.getElementById("surprise" + num);
  message.classList.toggle("show");
}

// Second NO button (after saying YES) - with consequences!
const noBtn2 = document.getElementById("noBtn2");
let noBtn2Attempts = 0;

noBtn2.addEventListener("mouseenter", () => {
  noBtn2Attempts++;

  const parent = noBtn2.parentElement;
  const parentRect = parent.getBoundingClientRect();

  const randomX = Math.random() * (parentRect.width - noBtn2.offsetWidth);
  const randomY = Math.random() * 100 - 50;

  noBtn2.style.left = randomX + "px";
  noBtn2.style.top = randomY + "px";
  noBtn2.style.transform = `scale(${Math.max(0.5, 1 - noBtn2Attempts * 0.1)}) rotate(${Math.random() * 360}deg)`;

  if (noBtn2Attempts >= 3) {
    showConsequence();
  }
});

noBtn2.addEventListener("click", showConsequence);

function showConsequence() {
  document.getElementById("noBtn2").style.display = "none";

  const msg = document.getElementById("consequenceMsg");
  msg.style.display = "block";
  msg.style.animation = "bounceIn 0.6s ease-out";

  //  createConfetti();
}

// Add hover effects to date items
const dateItems = document.querySelectorAll(".date-item");
dateItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.background = "linear-gradient(135deg, var(--coral) 0%, var(--soft-red) 100%)";
    item.style.color = "white";
    setTimeout(() => {
      item.style.background = "linear-gradient(135deg, var(--soft-pink) 0%, var(--beige) 100%)";
      item.style.color = "var(--text)";
    }, 300);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 🔒 Lock scroll
  document.body.classList.add("lock-scroll");
  createFloatingHearts();

  // 🎵 MUSIC SETUP
  music = document.getElementById("bgMusic");
  playPauseBtn = document.getElementById("playPauseBtn");
  const progressSlider = document.getElementById("progressSlider");
  const muteBtn = document.getElementById("muteBtn");

  // Stop if essentials missing
  if (!music || !playPauseBtn || !progressSlider) return;

  music.volume = 0.25;

  // ▶️ PLAY / ⏸️PAUSE
  playPauseBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playPauseBtn.textContent = "⏸";
    } else {
      music.pause();
      playPauseBtn.textContent = "▷";
    }
  });

  // 🔇Mute / 🔊UnMute
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      music.muted = !music.muted;
      muteBtn.textContent = music.muted ? "🔇" : "🔊";
    });
  }

  // ⏱️ UPDATE SLIDER
  music.addEventListener("timeupdate", () => {
    if (music.duration) {
      progressSlider.value = (music.currentTime / music.duration) * 100;
    }
  });

  // 🎚️ SEEK
  progressSlider.addEventListener("input", () => {
    if (music.duration) {
      music.currentTime = (progressSlider.value / 100) * music.duration;
    }
  });

  // 🌙 DAY / NIGHT TOGGLE
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("night");
      toggle.textContent = document.body.classList.contains("night") ? "☀️" : "🌙";
    });
  }

  // Vault Keyboard
  const vaultInput = document.getElementById("vaultInput");

  if (vaultInput) {
    vaultInput.addEventListener("input", () => {
      vaultInput.value = vaultInput.value.replace(/\D/g, "");

      if (vaultInput.value.length === 8) {
        unlockVault();
      }
    });
  }

  // Add 👁 Show / Hide Password
  const toggleVaultView = document.getElementById("toggleVaultView");

  if (toggleVaultView && vaultInput) {
    toggleVaultView.addEventListener("click", () => {
      const isHidden = vaultInput.type === "password";
      vaultInput.type = isHidden ? "text" : "password";
      toggleVaultView.textContent = isHidden ? "👁" : "🙈";
    });
  }

  // 🐣 SECRET EASTER EGG
  let heartTaps = 0;
  const heart = document.getElementById("secretHeart");

  if (heart) {
    heart.addEventListener("click", () => {
      heartTaps++;

      if (heartTaps === 1) {
        heart.style.transform = "scale(1.15)";
        heart.style.transition = "transform 0.2s ease";
      }

      if (heartTaps === 3) {
        // visual reward
        heart.innerText = "💘";
        heart.style.transform = "scale(1.5)";

        // popup message (optional)
        setTimeout(() => {
          alert("You found the secret 😌\nYou officially own my heart forever 💘");
        }, 300);

        const hint = document.getElementById("heartHint");
        if (hint) hint.style.display = "none";

        // lock so it triggers only once
        heartTaps = -999;
      }
    });
  }
});

function addDigit(num) {
  const input = document.getElementById("vaultInput");
  if (input.value.length < 8) {
    input.value += num;
  }
}

function clearDigit() {
  const input = document.getElementById("vaultInput");
  input.value = input.value.slice(0, -1);
}

function unlockVault() {
  const correct = "18092001";
  const input = document.getElementById("vaultInput");
  const entered = input.value;

  if (entered === correct) {
    document.getElementById("vaultScreen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("vaultScreen").style.display = "none";
    }, 500);
  } else {
    input.style.borderColor = "red";
    input.value = "";

    const card = document.querySelector(".vault-card");
    card.classList.add("shake");

    setTimeout(() => {
      card.classList.remove("shake");
      input.style.borderColor = "#f3c7cf";
    }, 500);
  }
}
