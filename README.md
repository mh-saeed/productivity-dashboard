# Productivity Dashboard

Welcome to the Productivity Dashboard, a versatile web application designed to streamline your daily tasks, note-taking, and time management. This guide will help you make the most of its features.

## Getting Started

1. **Access**: Open your web browser and navigate to the dashboard's URL (e.g., [https://productivity-dashboard.com](https://mh-saeed-productivity-dashboard.netlify.app/)).
2. **Interface**: Familiarize yourself with the dashboard's components, each tailored to enhance productivity.

## Dashboard Components

### Share

- **Share Button**: Located in the top-right corner, the "Share" button allows you to copy the current URL to your clipboard for easy sharing.

### Notepad

- The Notepad features a text area where you can jot down notes. Your notes are automatically saved as you type.

### Task Manager

- Efficiently manage tasks:
  - Enter task descriptions in the input field.
  - Select a priority level from the dropdown.
  - Click "Add Task" to append tasks to the list.
- Tasks are displayed with priority indicators.
- To remove a task, click the "Remove" button next to it.

### Stopwatch

- Utilize the stopwatch to monitor time:
  - Click "Start" to commence timing.
  - Hit "Stop" to pause the stopwatch.
  - Press "Reset" to reset it to 00:00:00.

## Incorporating Classes

This web application employs classes to organize and manage its various components. Key classes include:

- `Dashboard`: Controls the entire dashboard and user interactions.
- `Task`: Represents tasks, encompassing text and priority.
- `Stopwatch`: Manages stopwatch functionality.
- `LocalStorageManager`: Handles data storage and retrieval from local storage.

## Using Switch Statements

Switch statements are employed in:

- **Share Button**: Clicking the "Share" button copies the current URL to your clipboard for sharing.

## Using Try-Catch-Finally Statements

- **Local Storage Data Retrieval**: During dashboard initialization, try-catch blocks attempt to retrieve stored data from local storage. This data, if found, is parsed and used to populate the dashboard. In the event of an error or no data found, default values are used.

This guide helps you navigate the Productivity Dashboard efficiently, outlining its features and how classes, switch statements, and try-catch-finally statements contribute to its functionality.
