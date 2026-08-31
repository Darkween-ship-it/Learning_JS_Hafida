(() => {
    // ─── STATE ───
    let tasks = JSON.parse(localStorage.getItem("skycalTasks")) || [];
    let activeTimers = {};
    let currentView = "monthly";
    let currentDate = new Date();
    let selectedDate = null;

    // ─── DOM REFS ───
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    const monthGrid = $("#monthGrid");
    const weekGrid = $("#weekGrid");
    const weekHeader = $("#weekHeader");
    const dayHeader = $("#dayHeader");
    const dayTimeline = $("#dayTimeline");
    const currentLabel = $("#currentLabel");
    const sidebar = $("#sidebar");
    const sidebarTasks = $("#sidebarTasks");
    const sidebarTitle = $("#sidebarTitle");

    const modalOverlay = $("#modalOverlay");
    const taskModal = $("#taskModal");
    const detailOverlay = $("#detailOverlay");
    const detailModal = $("#detailModal");

    const taskForm = $("#taskForm");
    const taskName = $("#taskName");
    const taskPriority = $("#taskPriority");
    const taskDuration = $("#taskDuration");
    const taskDate = $("#taskDate");

    // ─── UTILS ───
    function saveTasks() {
        localStorage.setItem("skycalTasks", JSON.stringify(tasks));
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    function isToday(dateStr) {
        const today = new Date();
        return dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    }

    function dateToStr(y, m, d) {
        return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }

    function getTasksForDate(dateStr) {
        return tasks.filter((t) => t.dueDate === dateStr);
    }

    function priorityLabel(p) {
        return p === 1 ? "High" : p === 2 ? "Medium" : "Low";
    }

    function statusLabel(t) {
        return t.completed ? "Completed" : t.running ? "Running" : "Pending";
    }

    // ─── TIMER SYSTEM ───
    function startTimer(task) {
        if (task.completed || activeTimers[task.id]) return;

        const durationMs = task.duration * 60 * 1000;
        const elapsed = task.startedAt ? Date.now() - task.startedAt : 0;
        const remaining = Math.max(durationMs - elapsed, 0);

        if (remaining <= 0) {
            completeTask(task);
            return;
        }

        task.running = true;
        activeTimers[task.id] = setTimeout(() => {
            completeTask(task);
        }, remaining);

        saveTasks();
    }

    function completeTask(task) {
        task.completed = true;
        task.running = false;
        delete activeTimers[task.id];
        saveTasks();
        render();
    }

    function cancelTimer(task) {
        if (activeTimers[task.id]) {
            clearTimeout(activeTimers[task.id]);
            delete activeTimers[task.id];
        }
    }

    function restartTimers() {
        tasks.forEach((t) => {
            if (!t.completed && t.running) {
                startTimer(t);
            }
        });
    }

    // ─── TASK CRUD ───
    function addTask(name, priority, dueDate, duration) {
        const task = {
            id: generateId(),
            name: name.trim(),
            priority: Number(priority),
            dueDate,
            duration: Number(duration),
            completed: false,
            running: false,
            startedAt: null,
            createdAt: new Date().toISOString(),
        };
        tasks.push(task);
        saveTasks();
        startTimer(task);
        render();
    }

    function removeTask(id) {
        const task = tasks.find((t) => t.id === id);
        if (task) cancelTimer(task);
        tasks = tasks.filter((t) => t.id !== id);
        saveTasks();
        render();
    }

    // ─── NAVIGATION ───
    function updateLabel() {
        if (currentView === "monthly") {
            currentLabel.textContent = currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            });
        } else if (currentView === "weekly") {
            const weekStart = getWeekStart(currentDate);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            const startStr = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const endStr = weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            currentLabel.textContent = `${startStr} – ${endStr}`;
        } else {
            currentLabel.textContent = currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            });
        }
    }

    function getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return d;
    }

    function navigate(dir) {
        if (currentView === "monthly") {
            currentDate.setMonth(currentDate.getMonth() + dir);
        } else if (currentView === "weekly") {
            currentDate.setDate(currentDate.getDate() + dir * 7);
        } else {
            currentDate.setDate(currentDate.getDate() + dir);
        }
        render();
    }

    function goToday() {
        currentDate = new Date();
        render();
    }

    function switchView(view) {
        currentView = view;
        $$(".view-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
        $$(".calendar-view").forEach((v) => v.classList.add("hidden"));

        if (view === "monthly") $("#monthlyView").classList.remove("hidden");
        else if (view === "weekly") $("#weeklyView").classList.remove("hidden");
        else $("#dailyView").classList.remove("hidden");

        render();
    }

    // ─── RENDER: MONTHLY ───
    function renderMonthly() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrev = new Date(year, month, 0).getDate();

        let html = "";

        // Previous month trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const d = daysInPrev - i;
            const m = month === 0 ? 11 : month - 1;
            const y = month === 0 ? year - 1 : year;
            const ds = dateToStr(y, m, d);
            html += buildDayCell(ds, d, true);
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const ds = dateToStr(year, month, d);
            const today = isToday(ds);
            html += buildDayCell(ds, d, false, today);
        }

        // Next month leading days
        const totalCells = firstDay + daysInMonth;
        const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let d = 1; d <= remaining; d++) {
            const m = month === 11 ? 0 : month + 1;
            const y = month === 11 ? year + 1 : year;
            const ds = dateToStr(y, m, d);
            html += buildDayCell(ds, d, true);
        }

        monthGrid.innerHTML = html;

        // Bind clicks
        monthGrid.querySelectorAll(".day-cell").forEach((cell) => {
            cell.addEventListener("click", () => {
                const ds = cell.dataset.date;
                currentDate = new Date(ds + "T00:00:00");
                switchView("daily");
            });
        });

        monthGrid.querySelectorAll(".task-dot").forEach((dot) => {
            dot.addEventListener("click", (e) => {
                e.stopPropagation();
                showTaskDetail(dot.dataset.id);
            });
        });
    }

    function buildDayCell(dateStr, dayNum, otherMonth, today = false) {
        const dayTasks = getTasksForDate(dateStr);
        const classes = ["day-cell"];
        if (otherMonth) classes.push("other-month");
        if (today) classes.push("today");

        let tasksHtml = "";
        const maxShow = 3;
        dayTasks.slice(0, maxShow).forEach((t) => {
            const statusClass = t.completed ? "completed" : t.running ? "running" : "";
            tasksHtml += `
                <div class="task-dot priority-${t.priority} ${statusClass}" data-id="${t.id}">
                    <span class="dot-indicator"></span>
                    <span>${t.name}</span>
                </div>`;
        });
        if (dayTasks.length > maxShow) {
            tasksHtml += `<div class="day-more">+${dayTasks.length - maxShow} more</div>`;
        }

        return `
            <div class="${classes.join(" ")}" data-date="${dateStr}">
                <div class="day-number">${dayNum}</div>
                <div class="day-tasks">${tasksHtml}</div>
            </div>`;
    }

    // ─── RENDER: WEEKLY ───
    function renderWeekly() {
        const weekStart = getWeekStart(currentDate);
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let headerHtml = "";
        let gridHtml = "";

        for (let i = 0; i < 7; i++) {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + i);
            const ds = dateToStr(d.getFullYear(), d.getMonth(), d.getDate());
            const today = isToday(ds);

            headerHtml += `
                <div class="week-day-header ${today ? "today" : ""}" data-date="${ds}">
                    <div class="week-day-name">${dayNames[i]}</div>
                    <div class="week-day-num">${d.getDate()}</div>
                </div>`;

            const dayTasks = getTasksForDate(ds);
            let tasksHtml = "";
            dayTasks.forEach((t) => {
                const statusClass = t.completed ? "completed" : t.running ? "running" : "";
                tasksHtml += `
                    <div class="week-task priority-${t.priority} ${statusClass}" data-id="${t.id}">
                        <span class="week-task-name">${t.name}</span>
                        <span class="week-task-time">${t.duration}min</span>
                    </div>`;
            });

            gridHtml += `
                <div class="week-column ${today ? "today" : ""}">
                    ${tasksHtml || '<div class="empty-state"><p style="font-size:0.75rem">No tasks</p></div>'}
                </div>`;
        }

        weekHeader.innerHTML = headerHtml;
        weekGrid.innerHTML = gridHtml;

        // Bind clicks
        weekHeader.querySelectorAll(".week-day-header").forEach((el) => {
            el.addEventListener("click", () => {
                currentDate = new Date(el.dataset.date + "T00:00:00");
                switchView("daily");
            });
        });

        weekGrid.querySelectorAll(".week-task").forEach((el) => {
            el.addEventListener("click", () => showTaskDetail(el.dataset.id));
        });
    }

    // ─── RENDER: DAILY ───
    function renderDaily() {
        const ds = dateToStr(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const today = isToday(ds);

        dayHeader.className = `day-header ${today ? "today" : ""}`;
        dayHeader.innerHTML = `
            <div class="day-header-title">${currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
            <div class="day-header-sub">${today ? "Today" : currentDate.toLocaleDateString("en-US", { year: "numeric" })}</div>`;

        const dayTasks = getTasksForDate(ds);

        if (dayTasks.length === 0) {
            dayTimeline.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-cloud-moon"></i>
                    <p>No tasks for this day. Click + to add one.</p>
                </div>`;
            return;
        }

        let html = "";
        dayTasks.forEach((t) => {
            const statusClass = t.completed ? "completed" : t.running ? "running" : "";
            const statusCls = t.completed ? "completed" : t.running ? "running" : "pending";
            html += `
                <div class="timeline-task priority-${t.priority} ${statusClass}" data-id="${t.id}">
                    <div class="timeline-time">${t.duration}m</div>
                    <div class="timeline-info">
                        <div class="timeline-task-name">${t.name}</div>
                        <div class="timeline-task-meta">
                            <span>Priority: ${priorityLabel(t.priority)}</span>
                            <span>Due: ${formatDate(t.dueDate)}</span>
                        </div>
                    </div>
                    <div class="timeline-status ${statusCls}">
                        <i class="fas ${t.completed ? "fa-check-circle" : t.running ? "fa-spinner fa-spin" : "fa-clock"}"></i>
                        ${statusLabel(t)}
                    </div>
                    <button class="timeline-delete" data-id="${t.id}" title="Remove task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>`;
        });

        dayTimeline.innerHTML = html;

        dayTimeline.querySelectorAll(".timeline-task").forEach((el) => {
            el.addEventListener("click", () => showTaskDetail(el.dataset.id));
        });

        dayTimeline.querySelectorAll(".timeline-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                removeTask(btn.dataset.id);
            });
        });
    }

    // ─── RENDER: SIDEBAR ───
    function renderSidebar() {
        if (tasks.length === 0) {
            sidebarTasks.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-cloud-moon"></i>
                    <p>No tasks yet. Click + to add one.</p>
                </div>`;
            return;
        }

        const sorted = [...tasks].sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            if (a.priority !== b.priority) return a.priority - b.priority;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        let html = "";
        sorted.forEach((t) => {
            const statusClass = t.completed ? "completed" : "";
            html += `
                <div class="sidebar-task priority-${t.priority} ${statusClass}" data-id="${t.id}">
                    <div class="sidebar-task-info">
                        <div class="sidebar-task-name">${t.name}</div>
                        <div class="sidebar-task-meta">${priorityLabel(t.priority)} · ${formatDate(t.dueDate)} · ${statusLabel(t)}</div>
                    </div>
                    <button class="sidebar-task-remove" data-id="${t.id}" title="Remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>`;
        });

        sidebarTasks.innerHTML = html;

        sidebarTasks.querySelectorAll(".sidebar-task").forEach((el) => {
            el.addEventListener("click", (e) => {
                if (e.target.closest(".sidebar-task-remove")) return;
                showTaskDetail(el.dataset.id);
            });
        });

        sidebarTasks.querySelectorAll(".sidebar-task-remove").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                removeTask(btn.dataset.id);
            });
        });
    }

    // ─── TASK DETAIL MODAL ───
    function showTaskDetail(id) {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        $("#detailTitle").innerHTML = `<i class="fas fa-bolt" style="color:var(--sky)"></i> ${task.name}`;

        const statusCls = task.completed ? "completed" : task.running ? "running" : "pending";
        const statusIcon = task.completed ? "fa-check-circle" : task.running ? "fa-spinner fa-spin" : "fa-clock";

        $("#detailBody").innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Status</span>
                <span class="detail-value status-${statusCls}">
                    <i class="fas ${statusIcon}"></i> ${statusLabel(task)}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Priority</span>
                <span class="detail-value">${priorityLabel(task.priority)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Due Date</span>
                <span class="detail-value">${formatDate(task.dueDate)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Duration</span>
                <span class="detail-value">${task.duration} minute(s)</span>
            </div>
            <div class="detail-actions">
                <button class="detail-btn delete" data-id="${task.id}">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
                <button class="detail-btn close" id="detailCloseBtn">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>`;

        openModal(detailOverlay, detailModal);

        $("#detailBody .detail-btn.delete").addEventListener("click", () => {
            removeTask(task.id);
            closeModal(detailOverlay, detailModal);
        });

        $("#detailCloseBtn").addEventListener("click", () => {
            closeModal(detailOverlay, detailModal);
        });
    }

    // ─── MODAL HELPERS ───
    function openModal(overlay, modal) {
        overlay.classList.add("active");
        modal.classList.add("open");
    }

    function closeModal(overlay, modal) {
        overlay.classList.remove("active");
        modal.classList.remove("open");
    }

    // ─── FORM ───
    function resetForm() {
        taskForm.reset();
        taskDuration.value = "30";
        taskPriority.value = "2";
        $("#nameError").textContent = "";
        $("#dateError").textContent = "";
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const name = taskName.value.trim();
        const priority = taskPriority.value;
        const duration = taskDuration.value;
        const dueDate = taskDate.value;

        let valid = true;

        if (!name) {
            $("#nameError").textContent = "Task name is required.";
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
        closeModal(modalOverlay, taskModal);
        resetForm();
    }

    // ─── RENDER ALL ───
    function render() {
        updateLabel();
        if (currentView === "monthly") renderMonthly();
        else if (currentView === "weekly") renderWeekly();
        else renderDaily();
        renderSidebar();
    }

    // ─── INIT ───
    function init() {
        // Set default date to today
        const today = new Date();
        taskDate.value = dateToStr(today.getFullYear(), today.getMonth(), today.getDate());

        // Navigation
        $("#prevBtn").addEventListener("click", () => navigate(-1));
        $("#nextBtn").addEventListener("click", () => navigate(1));
        $("#todayBtn").addEventListener("click", goToday);

        // View toggle
        $$(".view-btn").forEach((btn) => {
            btn.addEventListener("click", () => switchView(btn.dataset.view));
        });

        // Add task modal
        $("#addTaskBtn").addEventListener("click", () => {
            resetForm();
            taskDate.value = dateToStr(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            openModal(modalOverlay, taskModal);
            setTimeout(() => taskName.focus(), 100);
        });

        // Close modals
        $("#modalClose").addEventListener("click", () => closeModal(modalOverlay, taskModal));
        modalOverlay.addEventListener("click", () => closeModal(modalOverlay, taskModal));
        $("#detailClose").addEventListener("click", () => closeModal(detailOverlay, detailModal));
        detailOverlay.addEventListener("click", () => closeModal(detailOverlay, detailModal));

        // Form submit
        taskForm.addEventListener("submit", handleFormSubmit);

        // Sidebar toggle via clicking the logo
        $(".logo").addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

        $("#sidebarClose").addEventListener("click", () => {
            sidebar.classList.remove("open");
        });

        // Keyboard shortcuts
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeModal(modalOverlay, taskModal);
                closeModal(detailOverlay, detailModal);
                sidebar.classList.remove("open");
            }
        });

        // Restart any running timers from localStorage
        restartTimers();

        // Initial render
        render();
    }

    init();
})();
