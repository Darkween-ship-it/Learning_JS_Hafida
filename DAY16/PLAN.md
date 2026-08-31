# Calendar App Implementation Plan

## Overview
Transform the CLI task scheduler (`Task.js`) into a user-friendly web-based calendar application with HTML, CSS, and JavaScript. The app will support three views (Monthly, Weekly, Daily), task management with priorities and due dates, and a timer feature that auto-completes tasks.

---

## Files to Create

| File | Purpose |
|------|---------|
| `index.html` | Main page structure, calendar layout, task modal |
| `style.css` | All styling — responsive grid, calendar cells, modals, buttons |
| `script.js` | Calendar logic, task CRUD, timer system, view switching |

---

## Architecture

### Data Model

```js
// Task object (carried over from Task.js)
{
  id: string,          // unique ID (Date.now())
  name: string,
  priority: number,    // 1 = high, 2 = medium, 3 = low
  dueDate: string,     // ISO date "YYYY-MM-DD"
  duration: number,    // minutes
  completed: boolean,
  running: boolean
}

// Stored in localStorage as JSON array
// Timer tracked via setTimeout IDs in memory (not persisted)
```

### State Management

```js
const state = {
  tasks: [],              // array of task objects
  currentView: "monthly", // "monthly" | "weekly" | "daily"
  currentDate: new Date(), // the date being viewed
  activeTimers: {}        // Map of taskId -> setTimeout ID
};
```

---

## UI Layout

```
+--------------------------------------------------+
|  <  August 2026  >     [Month] [Week] [Day]  [+] |
+--------------------------------------------------+
|  Sun  Mon  Tue  Wed  Thu  Fri  Sat               |
| +----+----+----+----+----+----+----+              |
| |    |    |    |    |    |  1  |  2  |              |
| |    |    |    |    |    | ●  |    |              |
| +----+----+----+----+----+----+----+              |
| |  3  |  4  |  5  | ...                          |
| |     | ●  | ●● |                                 |
| +----+----+----+----+                             |
|  ...                                              |
+--------------------------------------------------+
```

- **Header**: Navigation arrows, current month/week/day label, view toggle buttons, Add Task button (+)
- **Calendar area**: Grid for monthly, rows for weekly, timeline for daily
- **Task dots**: Small colored indicators on calendar cells (color = priority)
- **Modal**: Overlay form for adding/editing tasks

---

## Features & Implementation Details

### 1. Monthly View
- Standard 6x7 grid of days
- Each cell shows the day number and colored dots for tasks
- Click a day to switch to daily view for that day
- Arrow buttons navigate months

### 2. Weekly View
- 7 columns (Sun-Sat), each with a scrollable list of tasks for that day
- Header shows the week range (e.g., "Aug 24 - Aug 30, 2026")
- Click a day header to jump to daily view

### 3. Daily View
- Single-day timeline with time slots (or simple task list)
- Shows all tasks for the selected day with full details
- Status indicators: Pending, Running, Completed

### 4. Add Task Modal
- Fields: Task name, Priority (1/2/3), Due date (date picker), Duration (minutes)
- Date picker defaults to the currently viewed date
- On submit: task is added to `state.tasks`, timer starts, UI refreshes

### 5. Remove Task
- Click on a task to see details + Delete button
- Removing cancels the timer (same as original Task.js)

### 6. Timer System (from original Task.js)
- When a task is added, `setTimeout` starts for `duration` minutes
- When timer fires: `completed = true`, `running = false`, UI refreshes
- If task is removed before timer fires: `clearTimeout` is called
- Running tasks show a subtle animation/pulse indicator

### 7. Data Persistence
- `localStorage.setItem("calendarTasks", JSON.stringify(tasks))`
- Load on page init: `JSON.parse(localStorage.getItem("calendarTasks")) || []`
- Save after every add/remove/update

---

## Design Approach

- **Modern & clean**: Rounded corners, subtle shadows, soft color palette
- **Priority colors**: Red (high), Orange (medium), Green (low)
- **Status indicators**: Gray (pending), Blue pulse (running), Green check (completed)
- **Responsive**: Works on both desktop and mobile (flexbox/grid)
- **No external dependencies**: Pure HTML/CSS/JS, no libraries

---

## Step-by-Step Implementation Order

### Step 1: HTML Structure (`index.html`)
- Create the page skeleton: header, calendar grid area, modal
- Link CSS and JS files

### Step 2: CSS Styling (`style.css`)
- Style the header/navigation bar
- Style the monthly grid (CSS Grid)
- Style the weekly and daily views
- Style the modal form
- Add responsive breakpoints

### Step 3: Core Calendar Logic (`script.js`)
- Implement date utility functions (getDaysInMonth, getWeekRange, etc.)
- Implement monthly view rendering
- Implement weekly view rendering
- Implement daily view rendering
- Implement view switching and navigation

### Step 4: Task Management (`script.js`)
- Implement addTask(), removeTask(), viewTasks() logic
- Wire up the modal form
- Render tasks on calendar cells
- Implement task detail popup on click

### Step 5: Timer System (`script.js`)
- Port the setTimeout logic from Task.js
- Start timers on task creation
- Cancel timers on task removal
- Update task status and UI when timer fires

### Step 6: LocalStorage Persistence
- Save tasks to localStorage on every change
- Load tasks from localStorage on page load
- Re-start timers for any running tasks loaded from storage

---

## Edge Cases to Handle

- Empty calendar (no tasks) — show a friendly placeholder
- Tasks spanning midnight (timer finishes next day) — handled by setTimeout
- Duplicate task names — allow (use unique IDs instead of name as key)
- Invalid input validation — same as original Task.js
- Page refresh while a timer is running — re-calculate remaining time on load
