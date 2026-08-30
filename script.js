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

    const maxLeft = Math.max(window.innerWidth - size, 0);
    wrapper.style.left = `${Math.random() * maxLeft}px`;
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

/* ===============================
   Affirmation rotator (widget mockup)
================================== */
const affirmations = [
    'You are exactly where you need to be.',
    'Something good can happen today.',
    'Progress, not perfection.',
    'Trust yourself and keep going.',
    'Today, be gentle with yourself.',
    'Small steps still move you forward.',
    'You deserve a moment to breathe.',
    'Keep going. You are closer than you think.',
    'Let yourself enjoy the moment.',
    'Trust your own timing.',
];

function startAffirmationRotator() {
    const quoteText = document.getElementById('quoteText');
    const quoteMark = document.getElementById('quoteMark');
    if (!quoteText || !quoteMark) return;

    let index = 0;

    setInterval(() => {
        quoteText.classList.add('is-fading');
        quoteMark.classList.add('is-fading');

        setTimeout(() => {
            index = (index + 1) % affirmations.length;
            quoteText.textContent = affirmations[index];
            quoteText.classList.remove('is-fading');
            quoteMark.classList.remove('is-fading');
        }, 500);
    }, 4500);
}

window.addEventListener('DOMContentLoaded', startAffirmationRotator);

/* ===============================
   Widget time updater
================================== */

function updateWidgetTime() {
    const now = new Date();

    const parts = new Intl.DateTimeFormat([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).formatToParts(now);

    const hour = parts.find(part => part.type === 'hour').value;
    const minute = parts.find(part => part.type === 'minute').value;

    document.getElementById('widgetTime').textContent = `${hour}:${minute}`;
}

updateWidgetTime();
setInterval(updateWidgetTime, 1000);

