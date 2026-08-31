const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasks = new Map();

function showMenu() {
    rl.question("Choose an action: 1) Add task 2) Run task 3) Exit\n> ", (choice) => {
        switch (choice.trim()) {
            case "1":
                addTask();
                break;
            case "2":
                if (tasks.size === 0) {
                    console.log("No tasks available yet. Add a task first.");
                    return showMenu();
                }
                runTask();
                break;
            case "3":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please select 1, 2, or 3.");
                showMenu();
        }
    });
}

function addTask() {
    rl.question("Enter your task: ", (taskName) => {
        rl.question("Enter your priority: ", (priority) => {
            rl.question("Enter your due date: ", (dueDate) => {
                const name = taskName.trim();
                const parsedPriority = Number(priority);

                if (!name) {
                    console.log("Task name cannot be empty.");
                    return showMenu();
                }

                if (Number.isNaN(parsedPriority)) {
                    console.log("Priority must be a number.");
                    return showMenu();
                }

                const task = {
                    name,
                    priority: parsedPriority,
                    dueDate: dueDate.trim(),
                    completed: false
                };

                tasks.set(name, task);
                console.log("\nTask added successfully!");
                console.log(task);
                showMenu();
            });
        });
    });
}

function runTask() {
    rl.question("Which task do you want to run? ", (taskName) => {
        const task = tasks.get(taskName.trim());

        if (!task) {
            console.log("Task not found.");
            return showMenu();
        }

        rl.question("How many minutes should this task run? ", (durationInput) => {
            const duration = Number(durationInput);

            if (Number.isNaN(duration) || duration <= 0) {
                console.log("Duration must be a positive number.");
                return showMenu();
            }

            console.log(`Starting task: ${task.name}`);
            console.log(`Duration: ${duration} minute(s)`);

            const durationInMilliseconds = duration * 60 * 1000;

            setTimeout(() => {
                task.completed = true;
                console.log(`Task "${task.name}" is finished!`);
                showMenu();
            }, durationInMilliseconds);
        });
    });
}

showMenu();
