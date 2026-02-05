// ===== Dont Allow Inspecting the Code =====
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function(e) {
  if (
    e.keyCode == 123 || // F12
    (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.keyCode == 74) || // Ctrl+Shift+J
    (e.ctrlKey && e.keyCode == 85) // Ctrl+U
  ) {
    return false;
  }
};

// ===== DOM ELEMENTS =====
const proposalCard = document.getElementById('proposalCard');
const acceptanceCard = document.getElementById('acceptanceCard');
const giftsCard = document.getElementById('giftsCard');
const letterCard = document.getElementById('letterCard');
const memoriesCard = document.getElementById('memoriesCard');

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const giftsBtn = document.getElementById('giftsBtn');
const gift1 = document.getElementById('gift1');
const gift2 = document.getElementById('gift2');

const backFromGifts = document.getElementById('backFromGifts');
const backFromLetter = document.getElementById('backFromLetter');
const backFromMemories = document.getElementById('backFromMemories');

const proposalHeading = document.getElementById('proposalHeading');
const proposalText = document.getElementById('proposalText');
const buttonContainer = document.getElementById('buttonContainer');
const noSound = document.getElementById('noSound');

const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

// Message form elements
const messageBtn = document.getElementById('messageBtn');
const messageFormContainer = document.getElementById('messageFormContainer');
const messageTextarea = document.getElementById('messageTextarea');
const sendBtn = document.getElementById('sendBtn');
const cancelBtn = document.getElementById('cancelBtn');
const messageStatus = document.getElementById('messageStatus');

// ===== STATE VARIABLES =====
let noClickCount = 0;
let currentCard = 'proposal';

// ===== RESPONSE ARRAYS =====
const noResponses = [
    {
        heading: "Are you sure about that?",
        text: "Think carefully... this could be the best decision of your life! 💕"
    },
    {
        heading: "Really? No?",
        text: "Come on, you know you want to say yes! My heart is waiting... 💗"
    },
    {
        heading: "Please reconsider! 🥺",
        text: "I promise to make every day special and fill your life with love and laughter!"
    },
    {
        heading: "Don't break my heart!",
        text: "Just one 'yes' and we can start our beautiful journey together! 💖"
    },
    {
        heading: "You're making this hard!",
        text: "I've prepared so much for you... won't you give us a chance? 🌹"
    },
    {
        heading: "Still no? 😢",
        text: "Every moment without your 'yes' feels like an eternity... please say yes! 💝"
    },
    {
        heading: "I won't give up!",
        text: "True love never gives up! And I truly, deeply love you! ❤️"
    },
    {
        heading: "One more chance?",
        text: "Let me show you how amazing our life together can be! Just say yes! 💕"
    },
    {
        heading: "You know you want to!",
        text: "Your heart is saying yes, I can feel it! Listen to your heart! 💗"
    },
    {
        heading: "Final plea! 🙏",
        text: "This is it... the moment that could change everything. Will you be mine? 💖"
    }
];

// ===== CARD MANAGEMENT FUNCTIONS =====
function showCard(cardName) {
    // Hide all cards
    [proposalCard, acceptanceCard, giftsCard, letterCard, memoriesCard].forEach(card => {
        card.classList.remove('active');
    });

    // Show selected card
    switch (cardName) {
        case 'proposal':
            proposalCard.classList.add('active');
            currentCard = 'proposal';
            break;
        case 'acceptance':
            acceptanceCard.classList.add('active');
            currentCard = 'acceptance';
            break;
        case 'gifts':
            giftsCard.classList.add('active');
            currentCard = 'gifts';
            break;
        case 'letter':
            letterCard.classList.add('active');
            currentCard = 'letter';
            break;
        case 'memories':
            memoriesCard.classList.add('active');
            currentCard = 'memories';
            break;
    }
}

// ===== NO BUTTON BEHAVIOR =====
function moveNoButton() {
    const container = buttonContainer.getBoundingClientRect();
    const button = noBtn.getBoundingClientRect();

    // Calculate random position within container bounds
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Set volume to 100% for the "fah" sound
    noSound.volume = 1.0;

    // Play sound (if audio source is provided)
    noSound.play().catch(() => {
        // Audio might not play if no source is provided
        console.log('Audio not available');
    });

    // Add shake animation
    noBtn.classList.add('shake');
    setTimeout(() => {
        noBtn.classList.remove('shake');
    }, 500);

    // Move button to random position
    moveNoButton();

    // Update text from response array
    if (noClickCount < noResponses.length) {
        proposalHeading.textContent = noResponses[noClickCount].heading;
        proposalText.textContent = noResponses[noClickCount].text;
        noClickCount++;
    }

    // Make YES button grow
    const currentScale = 1 + (noClickCount * 0.05);
    yesBtn.style.transform = `scale(${currentScale})`;
});

// ===== YES BUTTON BEHAVIOR =====
yesBtn.addEventListener('click', function () {
    createConfetti();
    setTimeout(() => {
        showCard('acceptance');
    }, 500);
});

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const colors = ['#ff4081', '#f50057', '#ff80ab', '#ffb6c1', '#ffc3a0'];
    const container = document.querySelector('.container');

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

// ===== NAVIGATION EVENT LISTENERS =====
giftsBtn.addEventListener('click', function () {
    createConfetti();
    setTimeout(() => {
        showCard('gifts');
    }, 300);
});

gift1.addEventListener('click', function () {
    showCard('letter');
});

gift2.addEventListener('click', function () {
    showCard('memories');
});

backFromGifts.addEventListener('click', function () {
    showCard('acceptance');
});

backFromLetter.addEventListener('click', function () {
    showCard('gifts');
});

backFromMemories.addEventListener('click', function () {
    showCard('gifts');
});

// ===== POLAROID CLICK FEEDBACK =====
const polaroids = document.querySelectorAll('.polaroid');
polaroids.forEach(polaroid => {
    polaroid.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ===== INITIALIZATION =====
// Set initial position for NO button
window.addEventListener('load', function () {
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
});

// Add touch feedback for mobile
const allButtons = document.querySelectorAll('.btn, .btn-gifts, .gift-item, .back-btn');
allButtons.forEach(button => {
    button.addEventListener('touchstart', function () {
        this.style.opacity = '0.8';
    });
    button.addEventListener('touchend', function () {
        this.style.opacity = '1';
    });
});

// ===== MESSAGE FORM FUNCTIONALITY =====
// Toggle message form visibility
messageBtn.addEventListener('click', function () {
    messageFormContainer.classList.toggle('active');
    if (messageFormContainer.classList.contains('active')) {
        messageTextarea.focus();
        messageBtn.textContent = 'Hide Message Form';
    } else {
        messageBtn.textContent = 'Send Me a Message 💌';
        messageTextarea.value = '';
        messageStatus.textContent = '';
        messageStatus.className = 'message-status';
    }
});

// Cancel button - hide form
cancelBtn.addEventListener('click', function () {
    messageFormContainer.classList.remove('active');
    messageBtn.textContent = 'Send Me a Message 💌                                                                      ';
    messageTextarea.value = '';
    messageStatus.textContent = '';
    messageStatus.className = 'message-status';
});

// Send message via email
sendBtn.addEventListener('click', function () {
    const message = messageTextarea.value.trim();

    if (message === '') {
        messageStatus.textContent = '⚠️ Please write a message first!';
        messageStatus.className = 'message-status error';
        return;
    }

    // Disable send button while sending
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    messageStatus.textContent = 'Sending your message... �';
    messageStatus.className = 'message-status';

    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Use FormSubmit.co free service to send email
    const formData = new FormData();
    formData.append('_subject', '💌 New Message from Your Special Once! 💖');
    formData.append('Message', `${message}\n\n---\n📅 Sent on: ${dateStr}\n⏰ Time: ${timeStr}\n💝 From: Your GiftForVaishuu Website`);
    formData.append('Date', dateStr);
    formData.append('Time', timeStr);
    formData.append('_captcha', 'false');
    formData.append('_template', 'box');
    formData.append('_autoresponse', 'Thank you for your message! I received it and my heart is filled with joy! 💖');

    // Send to FormSubmit.co which will forward to your email
    fetch('https://formsubmit.co/vedantkokare45@gmail.com', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                messageStatus.textContent = '✓ Message sent successfully! �';
                messageStatus.className = 'message-status success';

                // Clear form after success
                setTimeout(() => {
                    messageTextarea.value = '';
                    messageFormContainer.classList.remove('active');
                    messageBtn.textContent = 'Send Me a Message 💌';
                    messageStatus.textContent = '';
                    messageStatus.className = 'message-status';
                    sendBtn.disabled = false;
                    sendBtn.textContent = 'Send 💖';
                }, 2000);
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            messageStatus.textContent = '❌ Failed to send. Please try again.';
            messageStatus.className = 'message-status error';
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send 💖';
        });
});

// ===== BACKGROUND MUSIC CONTROL =====
let isMusicPlaying = false;

// Music control button toggle
musicControl.addEventListener('click', function () {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicControl.classList.remove('playing');
        musicControl.classList.add('muted');
        musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMusicPlaying = false;
    } else {
        bgMusic.play().catch(err => console.log('Music play failed:', err));
        musicControl.classList.add('playing');
        musicControl.classList.remove('muted');
        musicControl.innerHTML = '<i class="fas fa-music"></i>';
        isMusicPlaying = true;
    }
});

// Auto-play music on page load
window.addEventListener('load', function () {
    // Set volume to 30% (0.3) for pleasant background music
    bgMusic.volume = 0.5;

    // Set start time to 2 minutes 37 seconds (157 seconds)
    bgMusic.currentTime = 156;

    // Try to auto-play music
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicControl.classList.add('playing');
    }).catch(err => {
        // Auto-play blocked by browser, user needs to interact first
        console.log('Auto-play blocked, waiting for user interaction');
        isMusicPlaying = false;
        musicControl.classList.remove('playing');
        musicControl.classList.add('muted');
        musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});

// Fallback: Play music on first user interaction
document.addEventListener('click', function playOnInteraction() {
    if (!isMusicPlaying) {
        // Set volume to 30% (0.3) for pleasant background music
        bgMusic.volume = 0.3;

        // Set start time to 2 minutes 37 seconds (157 seconds)
        bgMusic.currentTime = 156;

        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicControl.classList.add('playing');
            musicControl.classList.remove('muted');
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        }).catch(err => console.log('Music play failed:', err));
    }
    // Remove listener after first interaction
    document.removeEventListener('click', playOnInteraction);

}, { once: true });

