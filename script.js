// Key used to store ideas in localStorage
const STORAGE_KEY = "week2_ideas";

// Our in-memory list of ideas
let ideas = [];

// DOM elements
const ideaForm = document.getElementById("idea-form");
const ideaTitleInput = document.getElementById("idea-title");
const ideaDescriptionInput = document.getElementById("idea-description");
const ideaListElement = document.getElementById("idea-list");
const randomIdeaButton = document.getElementById("random-idea-button");
const randomIdeaDisplay = document.getElementById("random-idea-display");

// Load ideas from localStorage when the page loads
function loadIdeas() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    ideas = [];
    return;
  }

  try {
    ideas = JSON.parse(stored);
  } catch (e) {
    console.error("Could not parse stored ideas", e);
    ideas = [];
  }
}

// Save ideas to localStorage
function saveIdeas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

// Render the list of ideas to the page
function renderIdeas() {
  ideaListElement.innerHTML = "";

  if (ideas.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No ideas yet. Add your first one!";
    ideaListElement.appendChild(li);
    return;
  }

  ideas.forEach((idea, index) => {
    const li = document.createElement("li");

    const title = document.createElement("div");
    title.className = "idea-title";
    title.textContent = idea.title;

    const description = document.createElement("div");
    description.className = "idea-description";
    description.textContent = idea.description || "(no description)";

    const meta = document.createElement("div");
    meta.className = "idea-meta";
    meta.style.fontSize = "0.8rem";
    meta.style.color = "#999";
    meta.textContent = `#${index + 1}`;

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(meta);

    ideaListElement.appendChild(li);
  });
}

// Handle form submit: add new idea
ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = ideaTitleInput.value.trim();
  const description = ideaDescriptionInput.value.trim();

  if (!title) {
    alert("Please enter a title for your idea.");
    return;
  }

  const newIdea = { title, description };

  ideas.push(newIdea);
  saveIdeas();
  renderIdeas();

  // Reset form
  ideaTitleInput.value = "";
  ideaDescriptionInput.value = "";
});

// Handle random idea button
randomIdeaButton.addEventListener("click", () => {
  if (ideas.length === 0) {
    randomIdeaDisplay.textContent = "No ideas yet to choose from.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * ideas.length);
  const idea = ideas[randomIndex];

  randomIdeaDisplay.innerHTML = `
    <strong>${idea.title}</strong><br />
    <span>${idea.description || "(no description)"}</span>
  `;
});

// Initialize
loadIdeas();
renderIdeas();
