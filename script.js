// Game State - Only 3 bool variables as requested
let passwordUnlocked = false;
let videoPlayed = false;
let cipherTriggered = false;

// Additional tracking
let passwordFound = false;

// Conversation Data
const conversations = {
    priya: [
        { type: 'received', text: "Hey! Are we still meeting at the cafe?", time: "2 days ago" },
        { type: 'received', text: "Maya?", time: "2 days ago" },
        { type: 'received', text: "You always use your birthday as password 😂", time: "2 days ago" },
        { type: 'received', text: "Remember when you locked yourself out last time?", time: "2 days ago" },
        { type: 'received', text: "Maya, where are you? We're all worried...", time: "Yesterday" }
    ],
    mom: [
        { type: 'received', text: "Beta, don't forget to eat properly", time: "3 days ago" },
        { type: 'received', text: "Are you coming home this weekend?", time: "2 days ago" },
        { type: 'received', text: "Maya, please call me back!", time: "Yesterday" },
        { type: 'received', text: "I'm very worried. The police are looking for you.", time: "Today" }
    ],
    rohan: [
        { type: 'received', text: "The assignment is due tomorrow!", time: "3 days ago" },
        { type: 'received', text: "Did you finish your part?", time: "3 days ago" },
        { type: 'received', text: "Did you get home safe?", time: "3 days ago" },
        { type: 'received', text: "Maya??? Everyone is asking about you", time: "Yesterday" }
    ]
};

// Notes Data
const shoppingNote = `
    <h4>🛒 Shopping List</h4>
    <p style="color: #8e8e93; line-height: 2;">
    • Milk<br>
    • Eggs<br>
    • Bread<br>
    • Coffee<br>
    • Fruits<br>
    • Vegetables<br>
    </p>
`;

const diaryNote = `
    <div class="diary-entry">
        <div class="diary-date">March 14, 2024 - 11:47 PM</div>
        <div class="diary-text">
            I can't shake this feeling. Someone is watching me. Following me.
        </div>
        <div class="diary-text">
            At first, I thought I was being paranoid. But it's been happening for days now. The same car. The same person at the cafe. They're always there.
        </div>
        <div class="diary-text">
            I think someone is accessing my phone remotely. My apps open by themselves. Files I didn't create appear. Messages disappear.
        </div>
        <div class="diary-text">
            If something happens to me, if I disappear... I need someone to know the truth.
        </div>
        <div class="diary-text" style="color: #ff3b30; font-weight: bold;">
            I recorded a video. It explains everything. Check the hidden folder.
        </div>
        <button class="video-button" onclick="openVideo()">
            ▶ Play Video Message
        </button>
    </div>
`;

// Functions
function unlockPhone() {
    switchScreen('lockScreen', 'homeScreen');
    updateProgress("Explore the Messages app to find clues");
}

function switchScreen(from, to) {
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
}

function openApp(appName) {
    const screenMap = {
        'messages': 'messagesScreen',
        'gallery': 'galleryScreen',
        'notes': 'notesScreen'
    };
    
    switchScreen('homeScreen', screenMap[appName]);
}

function goHome() {
    const screens = ['messagesScreen', 'galleryScreen', 'notesScreen', 'conversationScreen', 'noteDetailScreen', 'photoDetailScreen', 'videoScreen'];
    screens.forEach(screen => {
        document.getElementById(screen).classList.remove('active');
    });
    document.getElementById('homeScreen').classList.add('active');
}

function openConversation(contact) {
    const messages = conversations[contact];
    const convContent = document.getElementById('conversationContent');
    
    // Set contact name
    const names = {
        'priya': 'Priya',
        'mom': 'Mom',
        'rohan': 'Rohan'
    };
    document.getElementById('conversationName').textContent = names[contact];
    
    // Display messages
    convContent.innerHTML = '';
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}`;
        msgDiv.innerHTML = `${msg.text}<div class="message-time">${msg.time}</div>`;
        convContent.appendChild(msgDiv);
    });
    
    switchScreen('messagesScreen', 'conversationScreen');
    
    // Update progress after reading Priya's message
    if (contact === 'priya' && !passwordFound) {
        passwordFound = true;
        updateProgress("You found a clue! Check the Gallery for Maya's birthday");
        markStepComplete(1);
    }
}

function backToMessages() {
    switchScreen('conversationScreen', 'messagesScreen');
}

function viewPhoto(photoNum) {
    const detail = document.getElementById('photoDetail');
    
    if (photoNum === 4) {
        // Birthday photo with the password
        detail.innerHTML = `
            <div class="photo-display" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                <div class="birthday-cake">🎂</div>
                <div class="birthday-date">07-13</div>
            </div>
            <div class="photo-info">
                <h4>Birthday Party 🎉</h4>
                <p>My 21st birthday celebration! Best day ever. Can't believe I'm finally 21!</p>
                <p style="color: #ff9500; margin-top: 10px;">📅 Date: July 13</p>
            </div>
        `;
        
        if (!passwordUnlocked) {
            updateProgress("Found the password! Go to Notes and unlock the Private Diary");
        }
    } else {
        const photos = {
            1: { emoji: '🌆', title: 'Campus View', desc: 'Beautiful sunset at the university campus', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            2: { emoji: '👥', title: 'With Friends', desc: 'Hanging out with Priya and Rohan at the quad', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            3: { emoji: '☕', title: 'Coffee Shop', desc: 'My favorite spot to study and relax', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
        };
        
        const photo = photos[photoNum];
        detail.innerHTML = `
            <div class="photo-display" style="background: ${photo.bg};">
                <div style="font-size: 120px;">${photo.emoji}</div>
            </div>
            <div class="photo-info">
                <h4>${photo.title}</h4>
                <p>${photo.desc}</p>
            </div>
        `;
    }
    
    switchScreen('galleryScreen', 'photoDetailScreen');
}

function backToGallery() {
    switchScreen('photoDetailScreen', 'galleryScreen');
}

function openNote(noteId) {
    const noteContent = document.getElementById('noteContent');
    
    if (noteId === 'shopping') {
        document.getElementById('noteTitle').textContent = 'Shopping List';
        noteContent.innerHTML = shoppingNote;
        switchScreen('notesScreen', 'noteDetailScreen');
    } else if (noteId === 'diary') {
        if (!passwordUnlocked) {
            // Show password input
            document.getElementById('noteTitle').textContent = 'Private Diary';
            noteContent.innerHTML = `
                <div class="password-container">
                    <h4>🔒 This diary is password protected</h4>
                    <input type="text" class="password-input" id="passwordInput" placeholder="____" maxlength="4" />
                    <button class="unlock-diary-btn" onclick="checkPassword()">Unlock Diary</button>
                    <div class="password-hint">Hint: Maya's birthday (MMDD format)</div>
                </div>
            `;
            switchScreen('notesScreen', 'noteDetailScreen');
        } else {
            // Already unlocked, show diary
            document.getElementById('noteTitle').textContent = 'Private Diary';
            noteContent.innerHTML = diaryNote;
            switchScreen('notesScreen', 'noteDetailScreen');
        }
    }
}

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    
    if (input === '0713' || input === '713') {
        // Password correct!
        passwordUnlocked = true;
        
        // Show success message
        showModal('✅ Diary Unlocked', 'Password accepted! Reading Maya\'s private diary...');
        
        setTimeout(() => {
            closeModal();
            // Show diary content
            document.getElementById('noteContent').innerHTML = diaryNote;
            updateProgress("Diary unlocked! Read the entry and watch the video");
            markStepComplete(2);
        }, 2000);
        
    } else {
        // Wrong password
        showModal('❌ Wrong Password', 'Incorrect password. Try again.<br><br>Hint: Check the birthday photo in Gallery');
    }
}

function backToNotes() {
    switchScreen('noteDetailScreen', 'notesScreen');
}

function openVideo() {
    if (!videoPlayed) {
        switchScreen('noteDetailScreen', 'videoScreen');
        updateProgress("Click play to watch Maya's video message");
    }
}

function playVideo() {
    const videoContent = document.getElementById('videoContent');

    // Insert real video
    videoContent.innerHTML = `
        <video id="realVideo" width="100%" controls autoplay>
            <source src="video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    const video = document.getElementById("realVideo");

    // When video ends
    video.onended = function() {
        videoContent.innerHTML = `
            <div class="video-frame glitch">
                <div style="font-size: 60px;">⚠️</div>
                <div class="video-text" style="color:#ff3b30;">
                    SIGNAL LOST
                </div>
            </div>
        `;

        videoPlayed = true;
        markStepComplete(3);

        setTimeout(() => {
            triggerCipherMessage();
        }, 2000);
    };
}

function triggerCipherMessage() {
    if (!cipherTriggered) {
        cipherTriggered = true;
        document.getElementById('cipherNotification').classList.add('active');
        markStepComplete(4);
        updateProgress("🎮 LEVEL COMPLETE! You uncovered the mystery.");
    }
}

function closeCipher() {
    document.getElementById('cipherNotification').classList.remove('active');
    showModal('🎉 Game Complete!', 
        'You successfully:<br>✓ Found the password (0713)<br>✓ Unlocked Maya\'s diary<br>✓ Watched the secret video<br>✓ Received Cipher\'s warning<br><br>Maya is missing. Someone is watching. The mystery continues...<br><br><strong>Thanks for playing!</strong>');
}

function showModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = message;
    document.getElementById('messageModal').classList.add('active');
}

function closeModal() {
    document.getElementById('messageModal').classList.remove('active');
}

function markStepComplete(stepNum) {
    const step = document.getElementById(`step${stepNum}`);
    if (step) {
        step.classList.add('completed');
        step.querySelector('.step-status').textContent = '✅';
    }
}

function updateProgress(message) {
    document.getElementById('progressStatus').textContent = message;
}

function showHint(hintNum) {
    const hints = {
        1: 'Start by exploring the Messages app. Read all conversations carefully.',
        2: 'Priya mentions something about Maya\'s passwords. What does she always use?',
        3: 'Look for Maya\'s birthday in the Gallery app. Check the birthday party photo carefully!'
    };
    
    showModal(`💡 Hint ${hintNum}`, hints[hintNum]);
}

// Initialize game
window.onload = function() {
    console.log('Maya\'s Phone - Game Initialized');
    console.log('Goal: Find 4-digit password → Unlock diary → Watch video → Get Cipher message');
};

// Reply data (separate from existing conversations — nothing removed)
const replyData = {
    priya: {
        choices: [
            { text: "What do you mean about the password?", id: "p1" },
            { text: "I'm fine. Stop worrying.", id: "p2" }
        ],
        responses: {
            p1: [
                { type: "sent", text: "What do you mean about the password?", time: "Now" },
                { type: "received", text: "Your birthday! You ALWAYS use it 😂", time: "Now" }
            ],
            p2: [
                { type: "sent", text: "I'm fine. Stop worrying.", time: "Now" },
                { type: "received", text: "Then answer your phone?? This isn't like you.", time: "Now" }
            ]
        }
    },

    mom: {
        choices: [
            { text: "I'm okay, Mom.", id: "m1" },
            { text: "Call the police.", id: "m2" }
        ],
        responses: {
            m1: [
                { type: "sent", text: "I'm okay, Mom.", time: "Now" },
                { type: "received", text: "Then please come home. I'm scared.", time: "Now" }
            ],
            m2: [
                { type: "sent", text: "Call the police.", time: "Now" },
                { type: "received", text: "What?? Maya what is going on??", time: "Now" }
            ]
        }
    },

    rohan: {
        choices: [
            { text: "What project?", id: "r1" },
            { text: "Delete everything.", id: "r2" }
        ],
        responses: {
            r1: [
                { type: "sent", text: "What project?", time: "Now" },
                { type: "received", text: "The surveillance one… You said it was dangerous.", time: "Now" }
            ],
            r2: [
                { type: "sent", text: "Delete everything.", time: "Now" },
                { type: "received", text: "Maya you're scaring me.", time: "Now" }
            ]
        }
    }
};


// Store current open chat
let currentContact = null;


// Extend existing openConversation WITHOUT removing it
const originalOpenConversation = openConversation;

openConversation = function(contact) {
    currentContact = contact;

    // Call original function (keeps your logic intact)
    originalOpenConversation(contact);

    // Add reply buttons after slight delay (so messages render first)
    setTimeout(() => {
        addReplyChoices(contact);
    }, 200);
};


// Create reply buttons
function addReplyChoices(contact) {
    if (!replyData[contact]) return;

    const container = document.getElementById("conversationContent");

    const choiceBox = document.createElement("div");
    choiceBox.className = "reply-choices";

    replyData[contact].choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "reply-btn";
        btn.textContent = choice.text;

        btn.onclick = function() {
            handleReply(choice.id);
        };

        choiceBox.appendChild(btn);
    });

    container.appendChild(choiceBox);
}


// Handle reply click
function handleReply(choiceId) {
    const container = document.getElementById("conversationContent");

    // Remove old reply buttons
    const oldChoices = document.querySelector(".reply-choices");
    if (oldChoices) oldChoices.remove();

    const responses = replyData[currentContact].responses[choiceId];

    responses.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${msg.type}`;
        msgDiv.innerHTML = `${msg.text}<div class="message-time">${msg.time}</div>`;
        container.appendChild(msgDiv);
    });

    // Auto scroll
    container.scrollTop = container.scrollHeight;
}
