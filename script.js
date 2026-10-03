// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Horizontal Scroll for Destinations
    const slider = document.getElementById('destinations-slider');
    const btnLeft = document.getElementById('slide-left');
    const btnRight = document.getElementById('slide-right');

    if (slider && btnLeft && btnRight) {
        const scrollAmount = 350; // Largura do card + gap

        btnLeft.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        btnRight.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // 2. Filter tabs for Experiences
    const tabBtns = document.querySelectorAll('.tab-btn');
    const experienceItems = document.querySelectorAll('.experience-item');

    if (tabBtns.length > 0 && experienceItems.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(t => t.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Show/Hide items based on filter
                experienceItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        item.style.display = 'block';
                        // Pequena animação de fade in (opcional, mas adiciona um charme premium)
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.3s ease';
                            item.style.opacity = '1';
                        }, 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Chat Widget Toggle
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatBox = document.getElementById('chat-box');

    if (chatToggleBtn && chatCloseBtn && chatBox) {
        chatToggleBtn.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });

        chatCloseBtn.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });
    }

    // 5. Integração com a API da IA (Foundry)
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input-area input');
    const chatSendBtn = document.querySelector('.chat-send-btn');

    if (chatMessages && chatInput && chatSendBtn) {
        
        function formatTime() {
            const now = new Date();
            return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        }

        async function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Adiciona a mensagem do usuário na tela
            const userMsgHtml = `
                <div class="message sent">
                    <p>${message}</p>
                    <span class="message-time">${formatTime()}</span>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', userMsgHtml);
            
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Adiciona mensagem de "Pensando..." da IA
            const botMsgId = "msg-" + Date.now();
            const botLoadingHtml = `
                <div class="message received" id="${botMsgId}">
                    <p>Pensando...</p>
                    <span class="message-time">${formatTime()}</span>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', botLoadingHtml);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            const loadingMsgElement = document.getElementById(botMsgId).querySelector('p');

            // Chamada ao Backend (Exemplo.JS)
            try {
                const response = await fetch("http://localhost:3001/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                loadingMsgElement.innerText = data.response;

            } catch (error) {
                loadingMsgElement.innerText = "Erro ao conectar com o atendente (SkillForge AI). Certifique-se de que o backend (server.js) está rodando na porta 3001.";
            }

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        chatSendBtn.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }
});
