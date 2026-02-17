// Game State
let gameState = {
    cluesFound: 0,
    totalClues: 15,
    unlockedApps: [],
    conversationProgress: {},
    playerChoices: []
};

// Conversation Data
const conversations = {
    cipher: {
        name: "Unknown - Cipher",
        messages: [
            { type: 'received', text: "I see you found Maya's phone.", time: "14:30" },
            { type: 'received', text: "Good. You're the only one who can help her now.", time: "14:30" },
            { type: 'received', text: "She's in danger. Real danger.", time: "14:31" },
            { type: 'received', text: "Look through her messages, her notes, her photos. Everything is connected.", time: "14:31" }
        ],
        choices: [
            { text: "Who are you?", response: "Someone who wants to help. That's all you need to know right now." },
            { text: "Where is Maya?", response: "That's what you need to find out. Check her research files. The answer is in the project she was working on." },
            { text: "I don't trust you", response: "Smart. Don't trust anyone. But I'm your best chance at finding the truth." }
        ]
    },
    priya: {
        name: "Priya (Best Friend)",
        messages: [
            { type: 'received', text: "Maya? Is that you?", time: "13:15" },
            { type: 'received', text: "We're all so worried. Your mom called me crying.", time: "13:16" },
            { type: 'received', text: "Please just let us know you're okay", time: "13:20" },
            { type: 'received', text: "I know something was bothering you. You can tell me.", time: "13:25" }
        ],
        choices: [
            { text: "This isn't Maya", response: "What? Who is this? Why do you have her phone?!" },
            { text: "Do you know where she might be?", response: "No... but she was acting strange lately. Paranoid. She kept saying someone was watching her." },
            { text: "What was bothering her?", response: "She wouldn't tell me everything. Just that the research project at uni wasn't what she thought it was." }
        ]
    },
    rohan: {
        name: "Rohan (Classmate)",
        messages: [
            { type: 'received', text: "Did you tell anyone about the project?", time: "09:42" },
            { type: 'received', text: "Maya, answer me. This is serious.", time: "10:15" },
            { type: 'received', text: "They know we found out. We need to be careful.", time: "10:30" },
            { type: 'received', text: "Meet me at the lab tonight. We'll figure this out.", time: "11:00" }
        ],
        choices: [
            { text: "What project?", response: "The surveillance system. Professor Sharma's project. Don't play dumb with me." },
            { text: "Who knows?", response: "I don't know who exactly, but someone high up. Maya, if you're reading this, don't go to the lab alone." },
            { text: "Are you involved?", response: "We're ALL involved now. The moment we saw what they were really building, we became targets." }
        ]
    },
    mom: {
        name: "Mom",
        messages: [
            { type: 'received', text: "Beta, where are you?", time: "Yesterday 22:30" },
            { type: 'received', text: "You didn't come home. I'm very worried.", time: "Yesterday 23:15" },
            { type: 'received', text: "Please call me back immediately.", time: "Yesterday 23:45" },
            { type: 'received', text: "I've filed a missing person report. The police are looking for you.", time: "Today 08:00" }
        ],
        choices: [
            { text: "I'm not Maya", response: "WHAT? Who are you?! What have you done with my daughter?!" },
            { text: "Don't worry, I'm trying to help", response: "Help?! How?! Where is she?! Tell me everything you know!" },
            { text: "Did she say anything unusual recently?", response: "She was stressed about her studies. But she always is during exam season... Nothing seemed wrong..." }
        ]
    }
};

// Notes Data
const notes = {
    diary: {
        title: "Personal Diary",
        content: `
            <div class="date">March 10, 2024</div>
            <p>I can't shake this feeling that I'm being followed. It started three days ago. A black car with tinted windows. Same car at the university, at the coffee shop, even near my apartment.</p>
            <p>I told Priya, but she thinks I'm being paranoid. Maybe I am. But after what I discovered in the lab...</p>
            <p>Professor Sharma said it was just a research project on behavioral patterns. But the scope of the surveillance system is massive. It's not just tracking behavior. It's predicting it. Manipulating it.</p>
            <div class="date">March 12, 2024</div>
            <p>Rohan agrees with me. We found encrypted files on the lab server. We shouldn't have looked. But we did. And now we know.</p>
            <p>This isn't a university project. It's funded by someone much bigger. And they're testing it on students without consent.</p>
            <p>I need to expose this. But I need evidence first.</p>
        `
    },
    suspicious: {
        title: "People Watching Me",
        content: `
            <h4>List of Suspicious Encounters:</h4>
            <p><strong>March 8:</strong> Black sedan, license plate partially visible: MH02-XX23. Spotted outside campus library at 6 PM.</p>
            <p><strong>March 9:</strong> Same car at coffee shop on MG Road. Driver stayed inside, engine running.</p>
            <p><strong>March 10:</strong> Different car, grey SUV. Followed me from university to apartment. Lost it in traffic.</p>
            <p><strong>March 11:</strong> Man in dark suit at campus. Wearing sunglasses indoors. Took photo of me with phone. When I approached, he left quickly.</p>
            <p><strong>March 12:</strong> My apartment was searched. Nothing taken, but things moved. Laptop files accessed while I was out. They're looking for what I found.</p>
            <p style="color: #ff3b30; font-weight: bold;">NOTE: Keep evidence in hidden folder. Use encryption. Trust no one at the university.</p>
        `
    },
    encrypted: {
        title: "Encrypted Notes",
        content: `
            <p style="color: #ff9500;">🔐 This note requires a password.</p>
            <p>Hint: The answer lies in the surveillance project name.</p>
            <input type="text" id="encryptedPassword" placeholder="Enter password" style="width: 100%; padding: 10px; margin: 20px 0; background: #2c2c2e; border: 1px solid #ff9500; color: white; border-radius: 5px;">
            <button onclick="decryptNote()" style="background: #ff9500; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Decrypt</button>
            <div id="decryptedContent" style="display: none; margin-top: 20px; padding: 20px; background: #1a3a1a; border-radius: 10px;">
                <h4 style="color: #00ff00;">DECRYPTED SUCCESSFULLY</h4>
                <p><strong>Project NEXUS - What I Discovered:</strong></p>
                <p>The surveillance system isn't just monitoring. It's using AI to predict student behavior, influence decisions, and test compliance mechanisms. They're essentially mind-controlling us.</p>
                <p>Professor Sharma is just a puppet. The real funding comes from a private tech company - NexGen Analytics. They want to sell this system to governments.</p>
                <p>Evidence stored in: server IP 192.168.50.100, folder /classified/nexus_trials/</p>
                <p><strong>My Plan:</strong> Download evidence, send to media contacts, then disappear until it goes public. If you're reading this and I'm gone - the evidence is hidden in my cloud storage. Password: "TheEyeSeesAll2024"</p>
            </div>
        `
    }
};

// Photo Data
const photos = {
    campus: {
        title: "University Campus",
        emoji: "🏫",
        description: "Taken on March 5. This was a happy day. Before everything changed. You can see the research lab building in the background - the place where I discovered the truth."
    },
    friends: {
        title: "With Friends",
        emoji: "👥",
        description: "Me, Priya, and Rohan at the cafe last week. Rohan took this. We look happy, but I was already suspecting something. Notice how I'm looking over my shoulder? I thought I saw that black car again."
    },
    lab: {
        title: "Research Lab",
        emoji: "🔬",
        description: "Inside the lab. This is where we work on Project NEXUS. Or where we THOUGHT we were working on behavioral research. The servers in this room hold the truth. Photo taken the day before I found the encrypted files."
    },
    corrupted: {
        title: "Corrupted Image",
        emoji: "⚠️",
        description: "ERROR: Image data corrupted. This photo was taken the night I broke into the lab to get evidence. Someone deleted it remotely. But I remember what it showed - surveillance equipment hidden throughout campus."
    }
};

// File Data
const files = {
    project: {
        title: "Project_Surveillance.pdf",
        content: `
            <h3 style="color: #007aff;">PROJECT NEXUS - Behavioral Surveillance System</h3>
            <p><strong>Objective:</strong> Develop advanced AI-driven surveillance and behavioral prediction technology for educational institutions.</p>
            <p><strong>Principal Investigator:</strong> Prof. Vikram Sharma</p>
            <p><strong>Funding:</strong> NexGen Analytics Pvt. Ltd.</p>
            <p><strong>Phase 1:</strong> Install monitoring devices across campus</p>
            <p><strong>Phase 2:</strong> Collect behavioral data from 2,000+ students</p>
            <p><strong>Phase 3:</strong> Train AI models for prediction and influence</p>
            <p style="color: #ff3b30;"><strong>CONFIDENTIAL:</strong> Participants unaware of monitoring. IRB approval bypassed through classified government exemption.</p>
            <p><strong>Applications:</strong> Student tracking, behavior modification, predictive policing, crowd control...</p>
            <button onclick="foundClue('project')" style="margin-top: 20px; padding: 10px 20px; background: #00ff00; color: #000; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">📋 Save as Evidence</button>
        `
    },
    emails: {
        title: "Encrypted_Emails.zip",
        content: `
            <h3 style="color: #007aff;">Encrypted Email Archive</h3>
            <p>This archive contains email correspondence between Prof. Sharma and NexGen Analytics.</p>
            <div style="background: #2c2c2e; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p><strong>From:</strong> v.sharma@university.edu</p>
                <p><strong>To:</strong> director@nexgenanalytics.com</p>
                <p><strong>Subject:</strong> Phase 2 Results</p>
                <p style="margin-top: 15px;">The behavioral prediction accuracy has reached 87%. Students are completely unaware. The influence tests are working - we successfully modified purchasing decisions in 73% of test subjects.</p>
                <p>However, two students (Maya Kapoor, Rohan Mehta) have been accessing restricted server areas. Recommend increased monitoring.</p>
            </div>
            <div style="background: #2c2c2e; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <p><strong>From:</strong> director@nexgenanalytics.com</p>
                <p><strong>To:</strong> v.sharma@university.edu</p>
                <p><strong>Subject:</strong> RE: Phase 2 Results - URGENT</p>
                <p style="margin-top: 15px; color: #ff3b30;">Excellent progress. Regarding the two students - neutralize the threat. Our client cannot afford exposure at this stage. Use any means necessary.</p>
            </div>
            <button onclick="foundClue('emails')" style="margin-top: 20px; padding: 10px 20px; background: #00ff00; color: #000; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">📋 Save as Evidence</button>
        `
    }
};

// Email Data
const emails = {
    warning: {
        title: "Warning - Anonymous",
        content: `
            <div style="background: #1c1c1e; padding: 20px; border-left: 3px solid #ff3b30;">
                <h4 style="color: #ff3b30;">⚠️ Final Warning</h4>
                <p>Stop digging. Stop asking questions. Stop accessing files you shouldn't have.</p>
                <p>We know who you are. We know where you live. We know everything about you.</p>
                <p>If you value your safety and your future, forget what you saw. Delete everything.</p>
                <p>This is your only warning.</p>
                <p style="margin-top: 20px; color: #636366; font-style: italic;">- The people who are watching</p>
            </div>
            <button onclick="foundClue('warning')" style="margin-top: 20px; padding: 10px 20px; background: #ff3b30; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">⚠️ This is serious</button>
        `
    },
    professor: {
        title: "Prof. Sharma - Meeting Request",
        content: `
            <div style="background: #1c1c1e; padding: 20px;">
                <p><strong>From:</strong> Prof. Vikram Sharma</p>
                <p><strong>To:</strong> Maya Kapoor</p>
                <p><strong>Subject:</strong> Urgent - Meeting Required</p>
                <p style="margin-top: 20px;">Dear Maya,</p>
                <p>I need to discuss your recent activities in the research lab. There have been some... irregularities.</p>
                <p>Please come to my office tomorrow at 9 AM. It's important we talk about your future in this project and at this university.</p>
                <p>Regards,<br>Prof. Vikram Sharma</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #2a1f0a; border-radius: 10px;">
                <p style="color: #ff9500;">📝 Maya's note: This is a threat. He knows I accessed the files. I'm not going to that meeting. I need to get the evidence out first.</p>
            </div>
            <button onclick="foundClue('professor')" style="margin-top: 20px; padding: 10px 20px; background: #007aff; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">📋 Save as Evidence</button>
        `
    },
    cipher: {
        title: "Cipher - You're Not Alone",
        content: `
            <div style="background: #1c1c1e; padding: 20px;">
                <p><strong>From:</strong> cipher_anonymous@protonmail.com</p>
                <p><strong>To:</strong> Maya Kapoor</p>
                <p><strong>Subject:</strong> You're Not Alone</p>
                <p style="margin-top: 20px;">Maya,</p>
                <p>I know what you discovered about Project NEXUS. I know you're scared. But you're not alone.</p>
                <p>I'm a former employee of NexGen Analytics. I've seen what they're capable of. What they've done to people who got in their way.</p>
                <p>If you want to expose them, I can help. But you need to trust me. And you need to act fast.</p>
                <p>They're coming for you. Sooner than you think.</p>
                <p>Contact me through this email. Use encryption. Trust no one else.</p>
                <p>- Cipher</p>
            </div>
            <button onclick="foundClue('cipher_email')" style="margin-top: 20px; padding: 10px 20px; background: #007aff; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">📋 Save as Evidence</button>
        `
    }
};

// Functions
function unlockPhone() {
    switchScreen('lockScreen', 'homeScreen');
    foundClue('phone_unlocked');
}

function switchScreen(from, to) {
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
}

function openApp(appName) {
    const screenMap = {
        'messages': 'messagesScreen',
        'photos': 'photosScreen',
        'notes': 'notesScreen',
        'social': 'socialScreen',
        'email': 'emailScreen',
        'files': 'filesScreen'
    };
    
    switchScreen('homeScreen', screenMap[appName]);
}

function goHome() {
    const screens = ['messagesScreen', 'photosScreen', 'notesScreen', 'socialScreen', 'emailScreen', 'filesScreen', 'conversationScreen', 'noteDetailScreen', 'photoDetailScreen'];
    screens.forEach(screen => {
        document.getElementById(screen).classList.remove('active');
    });
    document.getElementById('homeScreen').classList.add('active');
}

function showLocked(item) {
    const messages = {
        'contacts': 'Contacts are locked. Find the password in Maya\'s notes.',
        'research': 'Research files are encrypted. You need to decrypt Maya\'s hidden notes first.',
        'hidden': 'This folder is password protected. The password might be in the encrypted emails.'
    };
    
    document.getElementById('lockedMessage').textContent = messages[item] || 'This content is locked.';
    document.getElementById('lockedModal').classList.add('active');
}

function closeModal() {
    document.getElementById('lockedModal').classList.remove('active');
    document.getElementById('messageModal').classList.remove('active');
}

function showCorrupted() {
    document.getElementById('modalTitle').textContent = '⚠️ Corrupted Data';
    document.getElementById('modalMessage').innerHTML = 'This message thread has been corrupted or deleted remotely. Someone doesn\'t want you to see these messages.<br><br>Keep looking for clues elsewhere.';
    document.getElementById('messageModal').classList.add('active');
    foundClue('corrupted_message');
}

function openConversation(contact) {
    const conv = conversations[contact];
    document.getElementById('conversationName').textContent = conv.name;
    
    const convContent = document.getElementById('conversationContent');
    convContent.innerHTML = '';
    
    conv.messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}`;
        msgDiv.innerHTML = `${msg.text}<div class="message-time">${msg.time}</div>`;
        convContent.appendChild(msgDiv);
    });
    
    const choiceButtons = document.getElementById('choiceButtons');
    choiceButtons.innerHTML = '';
    
    conv.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => respondToChoice(choice.response, contact);
        choiceButtons.appendChild(btn);
    });
    
    switchScreen('messagesScreen', 'conversationScreen');
    foundClue(`conversation_${contact}`);
}

function respondToChoice(response, contact) {
    const convContent = document.getElementById('conversationContent');
    
    // Add player's choice
    const choiceText = event.target.textContent;
    const sentMsg = document.createElement('div');
    sentMsg.className = 'message sent';
    sentMsg.innerHTML = `${choiceText}<div class="message-time">Now</div>`;
    convContent.appendChild(sentMsg);
    
    // Add response after delay
    setTimeout(() => {
        const receivedMsg = document.createElement('div');
        receivedMsg.className = 'message received';
        receivedMsg.innerHTML = `${response}<div class="message-time">Now</div>`;
        convContent.appendChild(receivedMsg);
        convContent.scrollTop = convContent.scrollHeight;
    }, 1000);
    
    // Remove choice buttons
    document.getElementById('choiceButtons').innerHTML = '';
    convContent.scrollTop = convContent.scrollHeight;
    
    foundClue(`choice_${contact}`);
}

function backToMessages() {
    switchScreen('conversationScreen', 'messagesScreen');
}

function openNote(noteId) {
    const note = notes[noteId];
    document.getElementById('noteTitle').textContent = note.title;
    document.getElementById('noteContent').innerHTML = note.content;
    switchScreen('notesScreen', 'noteDetailScreen');
    foundClue(`note_${noteId}`);
}

function backToNotes() {
    switchScreen('noteDetailScreen', 'notesScreen');
}

function decryptNote() {
    const password = document.getElementById('encryptedPassword').value.toLowerCase();
    if (password === 'nexus' || password === 'project nexus') {
        document.getElementById('decryptedContent').style.display = 'block';
        foundClue('decrypted_note');
        showMessage('Success!', '🔓 Note decrypted successfully! You\'ve uncovered critical evidence.');
    } else {
        showMessage('Wrong Password', '❌ Incorrect password. Hint: What is the project called?');
    }
}

function viewPhoto(photoId) {
    const photo = photos[photoId];
    document.getElementById('photoTitle').textContent = photo.title;
    
    const detail = document.getElementById('photoDetail');
    detail.innerHTML = `
        <div class="photo-display">${photo.emoji}</div>
        <div class="photo-info">
            <h4>${photo.title}</h4>
            <p>${photo.description}</p>
        </div>
    `;
    
    switchScreen('photosScreen', 'photoDetailScreen');
    foundClue(`photo_${photoId}`);
}

function backToPhotos() {
    switchScreen('photoDetailScreen', 'photosScreen');
}

function openFile(fileId) {
    const file = files[fileId];
    showMessage(file.title, file.content);
}

function openEmail(emailId) {
    const email = emails[emailId];
    showMessage(email.title, email.content);
}

function showMessage(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = message;
    document.getElementById('messageModal').classList.add('active');
}

function recoverPost() {
    showMessage('Deleted Post Recovered', `
        <p><strong>Maya Kapoor - 2 weeks ago</strong></p>
        <p>"Sometimes I feel like I'm being watched everywhere I go. Is this what paranoia feels like, or is my gut trying to tell me something?"</p>
        <p style="color: #ff9500; margin-top: 15px;">This post was deleted 3 days ago. Maya deleted it herself - or someone else did.</p>
    `);
    foundClue('recovered_post');
}

function foundClue(clueId) {
    // Check if clue already found
    if (gameState.playerChoices.includes(clueId)) return;
    
    gameState.playerChoices.push(clueId);
    gameState.cluesFound++;
    
    updateProgress();
    
    // Show notification
    if (clueId !== 'phone_unlocked') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00ff00;
            color: #000;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.5s ease;
        `;
        notification.textContent = '🔍 Clue Found! Investigation Progress Updated';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

function updateProgress() {
    const percentage = (gameState.cluesFound / gameState.totalClues) * 100;
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `Clues Found: ${gameState.cluesFound}/${gameState.totalClues}`;
    
    // Check for game completion
    if (gameState.cluesFound >= gameState.totalClues) {
        setTimeout(() => {
            showEnding();
        }, 1000);
    }
}

function showEnding() {
    showMessage('🎭 The Truth Revealed', `
        <h3 style="color: #00ff00;">Investigation Complete!</h3>
        <p>You've uncovered the truth about Maya Kapoor's disappearance.</p>
        <p><strong>What you discovered:</strong></p>
        <p>• Maya was part of a secret surveillance project<br>
        • The university was testing AI behavior control on students<br>
        • She found evidence and was threatened<br>
        • Multiple people are involved in the conspiracy</p>
        <p style="color: #ff9500; margin-top: 20px;"><strong>But the question remains...</strong></p>
        <p>Did Maya disappear because she was abducted? Or did she stage her own disappearance to safely expose the truth?</p>
        <p>The phone you hold contains all the evidence. What will YOU do with it?</p>
        <p style="margin-top: 20px; color: #636366; font-style: italic;">The end... or just the beginning?</p>
    `);
}

// Initialize game
window.onload = function() {
    console.log('The Missing Phone - Game Initialized');
    console.log('Maya Kapoor is missing. Find out what happened...');
};

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
