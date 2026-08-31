const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasks = new Map();
const taskTimers = new Map();

function startTask(task, duration) {
    const durationInMilliseconds = duration * 60 * 1000;

    task.completed = false;
    task.running = true;

    console.log(`\nStarting task: ${task.name}`);
    console.log(`Duration: ${duration} minute(s)`);

    const timerId = setTimeout(() => {
        task.completed = true;
        task.running = false;
        taskTimers.delete(task.name);
        console.log(`Task "${task.name}" is done.`);
    }, durationInMilliseconds);

    taskTimers.set(task.name, timerId);
}

function showMenu() {
    rl.question("Choose an action: 1) Add task 2) Remove task 3) View tasks 4) Exit\n> ", (choice) => {
        switch (choice.trim()) {
            case "1":
                addTask();
                break;
            case "2":
                removeTask();
                break;
            case "3":
                viewTasks();
                break;
            case "4":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please select 1, 2, 3, or 4.");
                showMenu();
        }
    });
}

function addTask() {
    rl.question("Enter your task: ", (taskName) => {
        rl.question("Enter your priority: ", (priority) => {
            rl.question("Enter your due date: ", (dueDate) => {
                rl.question("How many minutes should this task run? ", (durationInput) => {
                    const name = taskName.trim();
                    const parsedPriority = Number(priority);
                    const duration = Number(durationInput);

                    if (!name) {
                        console.log("Task name cannot be empty.");
                        return showMenu();
                    }

                    if (Number.isNaN(parsedPriority)) {
                        console.log("Priority must be a number.");
                        return showMenu();
                    }

                    if (Number.isNaN(duration) || duration <= 0) {
                        console.log("Duration must be a positive number.");
                        return showMenu();
                    }

                    const task = {
                        name,
                        priority: parsedPriority,
                        dueDate: dueDate.trim(),
                        completed: false,
                        running: false
                    };

                    tasks.set(name, task);
                    console.log("\nTask added successfully!");
                    console.log(task);

                    startTask(task, duration);
                    showMenu();
                });
            });
        });
    });
}

function removeTask() {
    if (tasks.size === 0) {
        console.log("No tasks available to remove.");
        return showMenu();
    }

    rl.question("Enter the task name to remove: ", (taskName) => {
        const name = taskName.trim();
        const task = tasks.get(name);

        if (!task) {
            console.log("Task not found.");
            return showMenu();
        }

        const timerId = taskTimers.get(name);
        if (timerId) {
            clearTimeout(timerId);
            taskTimers.delete(name);
        }

        tasks.delete(name);
        console.log(`Task "${name}" was removed.`);
        showMenu();
    });
}

function viewTasks() {
    if (tasks.size === 0) {
        console.log("No tasks available.");
        return showMenu();
    }

    console.log("\nCurrent tasks:");
    for (const task of tasks.values()) {
        const status = task.completed ? "Completed" : task.running ? "Running" : "Pending";
        console.log(`- ${task.name} | Priority: ${task.priority} | Due: ${task.dueDate} | Status: ${status}`);
    }

    showMenu();
}

showMenu();
