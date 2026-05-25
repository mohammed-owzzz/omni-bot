document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll('.nav button');
    const contentSections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(sec => sec.classList.remove('active'));

            button.classList.add('active');
            const targetSectionId = button.getAttribute('data-target');
            document.getElementById(targetSectionId).classList.add('active');
        });
    });

    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.remove('hidden');
            chatToggle.style.display = 'none';
        });

        closeChat.addEventListener('click', () => {
            chatWidget.classList.add('hidden');
            chatToggle.style.display = 'block';
        });
    }

    function linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
            const trailingMatch = url.match(/[.,;!?)\]}]+$/);
            let cleanUrl = url;
            let punctuation = '';
            
            if (trailingMatch) {
                punctuation = trailingMatch[0];
                cleanUrl = url.slice(0, -trailingMatch[0].length);
            }
            
            return `<a href="${cleanUrl}" target="_blank" style="color: var(--accent); text-decoration: underline;">${cleanUrl}</a>${punctuation}`;
        });
    }

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        
        if (sender === 'bot') {
            messageDiv.innerHTML = linkify(text);
        } else {
            messageDiv.textContent = text;
        }
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';

        const typingId = "typing-" + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message');
        typingDiv.id = typingId;
        typingDiv.textContent = "Processing command...";
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const response = await fetch("https://omni-bot-iody.onrender.com/ask", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: text })
            });

            const data = await response.json();
            
            document.getElementById(typingId).remove();
            appendMessage(data.response, 'bot');

        } catch (error) {
            console.error(error);
            document.getElementById(typingId).remove();
            appendMessage("Connection to backend lost. Ensure FastAPI is running.", 'bot');
        }
    }

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});