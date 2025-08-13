// ========== Constants and Selectors ==========
const planner = document.getElementById("planner");
const clearAllBtn = document.getElementById("clearAll");
const currentDateEl = document.getElementById("current-date");
const generateBtn = document.getElementById("generate");
const today = new Date();
const todayKey = today.toLocaleDateString();
currentDateEl.textContent = "Date: " + todayKey;

// ========== Utility Functions ==========
const formatHourLabel = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12} ${period}`;
};

const getHourFromTime = (timeStr) => parseInt(timeStr.split(":")[0]);

const loadSavedData = () => JSON.parse(localStorage.getItem(todayKey)) || {};
const saveData = (data) => localStorage.setItem(todayKey, JSON.stringify(data));

// ========== Main Planner Generation ==========
function buildPlanner(startTime = "09:00", endTime = "17:00") {
  planner.innerHTML = "";
  const savedData = loadSavedData();
  const currentHour = new Date().getHours();

  const start = getHourFromTime(startTime);
  const end = getHourFromTime(endTime);

  const fragment = document.createDocumentFragment();

  for (let hour = start; hour <= end; hour++) {
    const hourLabel = formatHourLabel(hour);
    const savedTask = savedData[hourLabel] || "";

    const block = document.createElement("div");
    block.className = "time-block";

    const timeLabel = document.createElement("div");
    timeLabel.className = "hour";
    timeLabel.textContent = hourLabel;

    const input = document.createElement("input");
    input.className = "task";
    input.value = savedTask;

    input.classList.add(
      hour < currentHour ? "past" :
      hour === currentHour ? "present" : "future"
    );

    const saveBtn = document.createElement("button");
    saveBtn.className = "saveBtn";
    saveBtn.innerHTML = "📝";
    saveBtn.title = "Save Task";
    saveBtn.onclick = () => {
      savedData[hourLabel] = input.value;
      saveData(savedData);
      saveBtn.innerHTML = "✅";
      setTimeout(() => saveBtn.innerHTML = "📝", 1000);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.title = "Delete Task";
    deleteBtn.onclick = () => {
      input.value = "";
      delete savedData[hourLabel];
      saveData(savedData);
    };

    block.append(timeLabel, input, saveBtn, deleteBtn);
    fragment.appendChild(block);
  }

  planner.appendChild(fragment);
}

// ========== Event Listeners ==========
generateBtn.addEventListener("click", () => {
  const start = document.getElementById("start-time").value;
  const end = document.getElementById("end-time").value;
  buildPlanner(start, end);
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all tasks for today?")) {
    localStorage.removeItem(todayKey);
    planner.innerHTML = "";
  }
});

// ========== Initial Load ==========
buildPlanner();


const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

// Load theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
  themeLabel.textContent = "Dark Mode";
}

// Handle toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
});
