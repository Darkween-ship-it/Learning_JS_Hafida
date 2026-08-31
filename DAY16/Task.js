const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addTask(){
    rl.question("Enter your task:", (taskName) =>{
        rl.question("Enter your priority:",(priority) =>{
            rl.question('Enter your due date:',(duedate) =>{
                const task = { 
                    name: taskName,
                    priority: Number(priority),  
                    dueDate: duedate 
                };

                tasks.set(taskName, task); 
                console.log("\nTask added successfully!"); 
                console.log(task);
            })
        
        })
    
    });
}

const tasks = new Map();