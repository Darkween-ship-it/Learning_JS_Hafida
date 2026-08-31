(() => {
    // ─── STATE ─── (ported from Task.js Map structure)
    const tasks = new Map();
    const taskTimers = new Map();
    let currentFilter = "all";

    // ─── DOM ───
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    const taskList = $("#taskList");
    const emptyState = $("#emptyState");
    const modalOverlay = $("#modalOverlay");
    const taskModal = $("#taskModal");
    const taskForm = $("#taskForm");
    const taskName = $("#taskName");
    const taskPriority = $("#taskPriority");
    const taskDuration = $("#taskDuration");
    const taskDate = $("#taskDate");

    // ─── LOAD FROM STORAGE ───
    function loadTasks() {
        const saved = localStorage.getItem("taskflow_tasks");
        if (!saved) return;

        try {
            const arr = JSON.parse(saved);
            arr.forEach((t) => {
                tasks.set(t.name, t);
                if (!t.completed && t.running && t.startedAt) {
                    restartTimer(t);
                }
            });
        } catch (e) {
            // ignore corrupt data
        }
    }

    function saveTasks() {
        const arr = [...tasks.values()];
        localStorage.setItem("taskflow_tasks", JSON.stringify(arr));
    }

    // ─── TIMER SYSTEM (from Task.js) ───
    function startTask(task, duration) {
        const durationMs = duration * 60 * 1000;

        task.completed = false;
        task.running = true;
        task.startedAt = Date.now();

        const timerId = setTimeout(() => {
            task.completed = true;
            task.running = false;
            task.startedAt = null;
            taskTimers.delete(task.name);
            saveTasks();
            render();
        }, durationMs);

        taskTimers.set(task.name, timerId);
        saveTasks();
    }

    function restartTimer(task) {
        const elapsed = Date.now() - task.startedAt;
        const durationMs = task.duration * 60 * 1000;
        const remaining = Math.max(durationMs - elapsed, 0);

        if (remaining <= 0) {
            task.completed = true;
            task.running = false;
            task.startedAt = null;
            saveTasks();
            return;
        }

        const timerId = setTimeout(() => {
            task.completed = true;
            task.running = false;
            task.startedAt = null;
            taskTimers.delete(task.name);
            saveTasks();
            render();
        }, remaining);

        taskTimers.set(task.name, timerId);
    }

    function cancelTimer(taskName) {
        const timerId = taskTimers.get(taskName);
        if (timerId) {
            clearTimeout(timerId);
            taskTimers.delete(taskName);
        }
    }

    // ─── TASK CRUD (from Task.js) ───
    function addTask(name, priority, dueDate, duration) {
        const task = {
            name: name.trim(),
            priority: Number(priority),
            dueDate: dueDate.trim(),
            duration: Number(duration),
            completed: false,
            running: false,
            startedAt: null,
        };

        tasks.set(name, task);
        startTask(task, duration);
        render();
    }

    function removeTask(name) {
        const task = tasks.get(name);
        if (task) {
            cancelTimer(name);
            tasks.delete(name);
            saveTasks();
            render();
        }
    }

    // ─── STATUS ───
    function getStatus(task) {
        if (task.completed) return "completed";
        if (task.running) return "running";
        return "pending";
    }

    function getStatusLabel(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    function getStatusIcon(status) {
        if (status === "completed") return "fa-check-circle";
        if (status === "running") return "fa-spinner fa-spin";
        return "fa-clock";
    }

    function getPriorityLabel(p) {
        return p === 1 ? "High" : p === 2 ? "Medium" : "Low";
    }

    function formatDate(dateStr) {
        if (!dateStr) return "No date";
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    // ─── RENDER ───
    function render() {
        const allTasks = [...tasks.values()];

        // Filter
        let filtered = allTasks;
        if (currentFilter !== "all") {
            filtered = allTasks.filter((t) => getStatus(t) === currentFilter);
        }

        // Sort: running first, then pending, then completed; within each, by priority
        const statusOrder = { running: 0, pending: 1, completed: 2 };
        filtered.sort((a, b) => {
            const sa = statusOrder[getStatus(a)];
            const sb = statusOrder[getStatus(b)];
            if (sa !== sb) return sa - sb;
            return a.priority - b.priority;
        });

        // Stats
        const total = allTasks.length;
        const running = allTasks.filter((t) => getStatus(t) === "running").length;
        const completed = allTasks.filter((t) => getStatus(t) === "completed").length;
        const pending = allTasks.filter((t) => getStatus(t) === "pending").length;

        $("#totalCount").textContent = total;
        $("#runningCount").textContent = running;
        $("#completedCount").textContent = completed;
        $("#pendingCount").textContent = pending;

        // Task list
        if (filtered.length === 0) {
            taskList.innerHTML = "";
            taskList.appendChild(createEmptyState());
            return;
        }

        let html = "";
        filtered.forEach((t) => {
            const status = getStatus(t);
            const statusIcon = getStatusIcon(status);
            const statusLabel = getStatusLabel(status);

            html += `
                <div class="task-card priority-${t.priority} ${status}" data-name="${escapeHtml(t.name)}">
                    <div class="task-info">
                        <div class="task-name">${escapeHtml(t.name)}</div>
                        <div class="task-meta">
                            <span><i class="fas fa-flag"></i> ${getPriorityLabel(t.priority)}</span>
                            <span><i class="fas fa-calendar"></i> ${formatDate(t.dueDate)}</span>
                            <span><i class="fas fa-stopwatch"></i> ${t.duration}min</span>
                        </div>
                    </div>
                    <div class="task-status ${status}">
                        <i class="fas ${statusIcon}"></i> ${statusLabel}
                    </div>
                    <button class="task-delete" data-name="${escapeHtml(t.name)}" title="Remove task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>`;
        });

        taskList.innerHTML = html;

        // Bind delete buttons
        taskList.querySelectorAll(".task-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                removeTask(btn.dataset.name);
            });
        });
    }

    function createEmptyState() {
        const div = document.createElement("div");
        div.className = "empty-state";
        div.innerHTML = `
            <i class="fas fa-clipboard-list"></i>
            <h3>No tasks yet</h3>
            <p>Click "New Task" to get started</p>`;
        return div;
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    // ─── MODAL ───
    function openModal() {
        resetForm();
        taskDate.value = new Date().toISOString().split("T")[0];
        modalOverlay.classList.add("active");
        taskModal.classList.add("open");
        setTimeout(() => taskName.focus(), 100);
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
        taskModal.classList.remove("open");
    }

    function resetForm() {
        taskForm.reset();
        taskDuration.value = "30";
        taskPriority.value = "2";
        $("#nameError").textContent = "";
        $("#dateError").textContent = "";
    }

    // ─── FORM SUBMIT ───
    function handleSubmit(e) {
        e.preventDefault();

        const name = taskName.value.trim();
        const priority = taskPriority.value;
        const duration = taskDuration.value;
        const dueDate = taskDate.value;

        let valid = true;

        if (!name) {
            $("#nameError").textContent = "Task name is required.";
            valid = false;
        } else if (tasks.has(name)) {
            $("#nameError").textContent = "A task with this name already exists.";
            valid = false;
        } else {
            $("#nameError").textContent = "";
        }

        if (!dueDate) {
            $("#dateError").textContent = "Due date is required.";
            valid = false;
        } else {
            $("#dateError").textContent = "";
        }

        if (!valid) return;

        addTask(name, priority, dueDate, duration || 30);
        closeModal();
    }

    // ─── FILTERS ───
    function setFilter(filter) {
        currentFilter = filter;
        $$(".filter-btn").forEach((b) => b.classList.toggle("active", b.dataset.filter === filter));
        render();
    }

    // ─── INIT ───
    function init() {
        // Load saved tasks
        loadTasks();

        // Add task button
        $("#addTaskBtn").addEventListener("click", openModal);

        // Close modal
        $("#modalClose").addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", closeModal);

        // Form submit
        taskForm.addEventListener("submit", handleSubmit);

        // Filters
        $$(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", () => setFilter(btn.dataset.filter));
        });

        // Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });

        // Initial render
        render();
    }

    init();
})();
