// Custom Cursor Logic
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (handled by CSS transition usually, or keyframe)
    // Using simple js update here
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Realtime Clock
function updateClock() {
    const now = new Date();
    document.getElementById("jam").innerText = now.toLocaleTimeString('id-US', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// Typewriter Effect
const typedTextSpan = document.querySelector(".dynamic-text");
const textArray = ["Student", "Web Developer", "Creative Thinker", "Tech Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Tab Switching Logic
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));

        // Add active to clicked
        btn.classList.add("active");

        // Show corresponding pane
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

// Form Handling (Mailto)
function sendMessage() {
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    const status = document.getElementById("form-status");
    const btn = document.querySelector(".submit-btn");

    const name = nameInput.value;
    const message = messageInput.value;

    // Simulate loading briefly
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email...';
    btn.style.opacity = "0.7";

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = "1";

        const emailTujuan = "angulliamysara@gmail.com";

        const subject = `Pesan dari ${name} (Portfolio Website)`;
        const body = `Nama: ${name}\n\nPesan:\n${message}`;

        // Redirect to mailto link
        window.location.href = `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        status.style.color = "#4ade80";
        status.innerText = "Silakan kirim melalui aplikasi email yang terbuka!";

        setTimeout(() => {
            status.innerText = "";
        }, 5000);
    }, 800);
}

// Scroll Reveal Observer
const revealElements = document.querySelectorAll(".section-title, .skill-card, .timeline-item, .interest-card");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    // Keep internal delay logic if set in inline style (skill cards)
    // or just observe
    revealObserver.observe(el);
});
