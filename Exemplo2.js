/* CHAT OPEN/CLOSE */

const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

chatButton.addEventListener("click", () => {
  chatWindow.style.display = "flex";
});

closeChat.addEventListener("click", () => {
  chatWindow.style.display = "none";
});

/* CHAT IA */

const chatBody = document.querySelector(".chat-body");
const input = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");

async function sendMessage() {

  const message = input.value.trim();

  if (!message) return;

  const userMessage = document.createElement("div");

  userMessage.classList.add("message", "user");

  userMessage.innerText = message;

  chatBody.appendChild(userMessage);

  input.value = "";

  scrollBottom();

  const loading = document.createElement("div");

  loading.classList.add("message", "bot");

  loading.innerText = "Pensando...";

  chatBody.appendChild(loading);

  scrollBottom();

  try {

    const response = await fetch(
      "http://localhost:3000/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message
        })
      }
    );

    const data = await response.json();

    loading.innerText = data.response;

  } catch (error) {

    loading.innerText =
      "Erro ao conectar com a SkillForge AI.";

  }

  scrollBottom();

}

sendButton.addEventListener(
  "click",
  sendMessage
);

input.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }

  }
);

function scrollBottom() {

  chatBody.scrollTop =
    chatBody.scrollHeight;

}

/* REVEAL ANIMATION */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

  reveals.forEach((element) => {

    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      element.classList.add("active");
    }

  });

});