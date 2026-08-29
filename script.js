const balloonImg = 'balloon.png';

let balloonInterval;

function createBalloon(initial = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'balloon-wrapper';

    const balloon = document.createElement('img');
    balloon.src = balloonImg;
    balloon.className = 'balloon';
    balloon.alt = 'Balloon Icon';

    const size = 50 + Math.random() * 150;
    const duration = 8 + Math.random() * 6;
    const delay = initial ? Math.random() * duration : 0;

    wrapper.style.left = Math.random() * 100 + 'vw';
    wrapper.style.width = `${size}px`;
    wrapper.style.animation = `floatUp ${duration}s linear ${-delay}s forwards`;

    balloon.style.width = '100%';
    balloon.style.transformOrigin = 'center bottom';

    const wobbleDuration = 6 + Math.random() * 4; // between 6s and 10s
    balloon.style.animation = `wobble ${wobbleDuration}s ease-in-out infinite`;

    wrapper.appendChild(balloon);
    document.body.appendChild(wrapper);

    setTimeout(() => {
        wrapper.remove();
    }, (duration + 1) * 1000);
}


function startBalloons() {
    if (!balloonInterval) {
        balloonInterval = setInterval(() => {
            const count = Math.floor(Math.random() * 4) + 2; // Random 2 to 5 balloons per wave
            for (let i = 0; i < count; i++) {
                createBalloon();
            }
        }, 12000); // Every 12 seconds, one wave
    }
}

function stopBalloons() {
    clearInterval(balloonInterval);
    balloonInterval = null;
}

window.addEventListener('DOMContentLoaded', () => {
    // Spawn 5 balloons when the website is opened
    for (let i = 0; i < 5; i++) {
        createBalloon(true);
    }
    startBalloons();
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopBalloons();
    } else {
        startBalloons();
    }
});

function updateScale() {
    const vw = window.innerWidth;

    // Only apply scaling if viewport is wider than 300px
    if (vw <= 300) return;

    const container = document.querySelector('.scale-container');
    const vh = window.innerHeight;

    const designWidth = 1200;
    const designHeight = 800;

    const scaleW = vw / designWidth;
    const scaleH = vh / designHeight;

    const scale = Math.min(scaleW, scaleH, 1);

    container.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', updateScale);
window.addEventListener('load', updateScale);

/* ===============================
   Affirmation quote rotator
================================== */
const affirmations = [
    'You are exactly where you need to be.',
    'Your calm is contagious.',
    'Progress, not perfection.',
    'You are allowed to take up space.',
    'Today, be gentle with yourself.',
    'Small steps still move you forward.',
    'You are worthy of the good things coming your way.'
];

function startAffirmationRotator() {
    const quoteText = document.getElementById('quoteText');
    if (!quoteText) return;

    let index = 0;

    setInterval(() => {
        quoteText.classList.add('is-fading');

        setTimeout(() => {
            index = (index + 1) % affirmations.length;
            quoteText.textContent = affirmations[index];
            quoteText.classList.remove('is-fading');
        }, 500);
    }, 4500);
}

window.addEventListener('DOMContentLoaded', startAffirmationRotator);
