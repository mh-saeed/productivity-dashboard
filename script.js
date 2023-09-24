class Dashboard {
  constructor() {
    this.shareButton = document.getElementById("share-button");
    this.notepadTextArea = document.getElementById("notepad-text");
    this.taskListElement = document.getElementById("task-list-ul");
    this.taskInputElement = document.getElementById("task-input");
    this.taskPriorityElement = document.getElementById("task-priority");
    this.startButton = document.getElementById("start-stop");
    this.resetButton = document.getElementById("reset");
    this.stopwatch = document.getElementById("stopwatch"); // Add this line
    this.startTime = 0; // Add this line
    this.interval = null; // Add this line
    this.isRunning = false; // Add this line

    this.setupEventListeners();
    this.loadDashboardData();
    this.initialize();
    this.updateTaskList();
  }

  loadDashboardData() {
    try {
      const savedData = localStorage.getItem("dashboardData") || "{}";
      const parsedData = JSON.parse(savedData);
      this.taskList = parsedData.taskList || [];
      this.notepadText = parsedData.notepadText || "";
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }

  handleButtonClick(buttonId) {
    switch (buttonId) {
      case "share-button":
        this.copyCurrentURL();
        break;
      case "add-task":
        this.addTask();
        break;
      case "start-stop":
        this.toggleStopwatch();
        break;
      case "reset":
        this.resetStopwatch();
        break;
      default:
        break;
    }
  }

  copyCurrentURL() {
    try {
      const currentURL = window.location.href;
      const tempInput = document.createElement("input");
      tempInput.value = currentURL;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  }

  addTask() {
    try {
      const taskText = this.taskInputElement.value.trim();
      const taskPriority = this.taskPriorityElement.value;
      if (taskText !== "") {
        this.taskList.push({ text: taskText, priority: taskPriority });
        this.taskInputElement.value = "";
        this.updateTaskList();
        this.saveData();
      } else {
        alert("Task text cannot be empty.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  updateTaskList() {
    try {
      this.taskListElement.innerHTML = "";
      for (const [index, task] of this.taskList.entries()) {
        const li = document.createElement("li");
        li.className = `task-item priority-${task.priority}`;
        li.innerHTML = `
          <span class="task-text">${task.text}</span>
          <button class="remove-task" data-index="${index}">Remove</button>
        `;
        this.taskListElement.appendChild(li);
      }
      this.setupRemoveTaskButtons();
    } catch (error) {
      console.error("Error updating task list:", error);
    }
  }

  setupRemoveTaskButtons() {
    try {
      const removeButtons = document.querySelectorAll(".remove-task");
      removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const index = button.getAttribute("data-index");
          if (index !== null) {
            this.taskList.splice(index, 1);
            this.updateTaskList();
            this.saveData();
          }
        });
      });
    } catch (error) {
      console.error("Error setting up remove task buttons:", error);
    }
  }

  initialize() {
    try {
      const savedData = localStorage.getItem("dashboardData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.notepadTextArea.value = parsedData.notepadText || "";
        this.taskList = parsedData.taskList || [];
        this.updateTaskList();
      }
    } catch (error) {
      console.error("Error initializing Dashboard:", error);
    }
  }

  saveData() {
    try {
      const data = {
        taskList: this.taskList,
        notepadText: this.notepadTextArea.value,
      };
      localStorage.setItem("dashboardData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }

  toggleStopwatch() {
    try {
      if (this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
        this.startButton.textContent = "Start";
      } else {
        this.startTime = this.startTime || Date.now();
        this.interval = setInterval(() => {
          const elapsedTime = Date.now() - this.startTime;
          this.stopwatch.textContent = this.formatTime(elapsedTime);
        }, 1000);
        this.isRunning = true;
        this.startButton.textContent = "Stop";
      }
    } catch (error) {
      console.error("Error toggling stopwatch:", error);
    }
  }

  resetStopwatch() {
    try {
      clearInterval(this.interval);
      this.isRunning = false;
      this.startTime = 0;
      this.stopwatch.textContent = "00:00:00";
      this.startButton.textContent = "Start";
    } catch (error) {
      console.error("Error resetting stopwatch:", error);
    }
  }

  formatTime(milliseconds) {
    try {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      return `${this.pad(hours)}:${this.pad(minutes % 60)}:${this.pad(
        seconds % 60
      )}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "00:00:00";
    }
  }

  pad(number) {
    try {
      return number.toString().padStart(2, "0");
    } catch (error) {
      console.error("Error padding number:", error);
      return "00";
    }
  }

  setupEventListeners() {
    try {
      const buttons = [
        "share-button",
        "add-task",
        "start-stop",
        "reset",
        "notepad-text",
      ];

      buttons.forEach((button) => {
        const element = document.getElementById(button);
        if (element) {
          element.addEventListener("click", () =>
            this.handleButtonClick(button)
          );
        }
      });

      // Add an event listener to the notepad text area to save data as you type
      this.notepadTextArea.addEventListener("input", this.saveData.bind(this));
    } catch (error) {
      console.error("Error setting up event listeners:", error);
    }
  }
}

const dashboard = new Dashboard();
