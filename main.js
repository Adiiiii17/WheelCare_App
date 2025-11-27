const bpCard = document.getElementById('bpCard');
const gpsCard = document.getElementById('gpsCard');
const cameraCard = document.getElementById('cameraCard');
const overlay = document.getElementById('overlay');
const sosBtn = document.getElementById('sosBtn');
const micBtn = document.getElementById('micBtn');
const settingsBtn = document.getElementById('settingsBtn');

let expandedCard = null;

function expandCard(card) {
    if (expandedCard) return;

    // Get camera section position and dimensions
    const cameraSection = document.getElementById('cameraCard');
    const cameraRect = cameraSection.getBoundingClientRect();
    const rect = card.getBoundingClientRect();
    
    card.style.position = 'fixed';
    card.style.top = `${rect.top}px`;
    card.style.left = `${rect.left}px`;
    card.style.width = `${rect.width}px`;
    card.style.height = `${rect.height}px`;

    overlay.classList.add('active');

    // Smooth transition with requestAnimationFrame
    requestAnimationFrame(() => {
        // Expand to camera section position and size
        card.style.top = `${cameraRect.top}px`;
        card.style.left = `${cameraRect.left}px`;
        card.style.width = `${cameraRect.width}px`;
        card.style.height = `${cameraRect.height}px`;
        card.classList.add('expanded');
    });

    expandedCard = card;
}

function collapseCard() {
    if (!expandedCard) return;

    expandedCard.classList.remove('expanded');
    expandedCard.classList.add('collapsing');

    setTimeout(() => {
        expandedCard.style.position = '';
        expandedCard.style.top = '';
        expandedCard.style.left = '';
        expandedCard.style.width = '';
        expandedCard.style.height = '';
        expandedCard.classList.remove('collapsing');
        expandedCard = null;
    }, 400);

    overlay.classList.remove('active');
}

// Card click handlers with smooth expansion
bpCard.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!expandedCard) {
        expandCard(bpCard);
    }
});

gpsCard.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!expandedCard) {
        expandCard(gpsCard);
    }
});

cameraCard.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!expandedCard) {
        expandCard(cameraCard);
    }
});

overlay.addEventListener('click', collapseCard);

// Enhanced button interactions
function animateButton(button, callback) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
        if (callback) callback();
    }, 200);
}

sosBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    animateButton(sosBtn, () => {
        // Add visual feedback for SOS
        sosBtn.style.animation = 'sosGlow 0.5s ease-in-out 3';
        setTimeout(() => {
            sosBtn.style.animation = '';
        }, 1500);
    });
});

micBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    animateButton(micBtn, () => {
        // Toggle microphone active state
        micBtn.classList.toggle('active');
    });
});

settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    animateButton(settingsBtn);
});

// Add smooth scrolling behavior
document.querySelector('.main-content').style.scrollBehavior = 'smooth';

// Simulate real-time BP updates with smooth transitions
let bpm = 98;
const bpValueElement = document.querySelector('.bp-value');

function updateBPM() {
    const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
    bpm = Math.max(60, Math.min(120, bpm + variation));

    if (bpValueElement) {
        bpValueElement.style.opacity = '0.6';
        setTimeout(() => {
            bpValueElement.innerHTML = `${bpm} <span>BPM</span>`;
            bpValueElement.style.opacity = '1';
        }, 150);
    }
}

// Update BPM every 3 seconds
setInterval(updateBPM, 3000);
