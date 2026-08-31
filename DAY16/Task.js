const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasks = new Map();

function startTask(task, duration) {
    const durationInMilliseconds = duration * 60 * 1000;

    task.completed = false;
    task.running = true;

    console.log(`\nStarting task: ${task.name}`);
    console.log(`Duration: ${duration} minute(s)`);

    setTimeout(() => {
        task.completed = true;
        task.running = false;
        console.log(`Task "${task.name}" is done.`);
    }, durationInMilliseconds);
}

function showMenu() {
    rl.question("Choose an action: 1) Add task 2) Exit\n> ", (choice) => {
        switch (choice.trim()) {
            case "1":
                addTask();
                break;
            case "2":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please select 1 or 2.");
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

showMenu();
