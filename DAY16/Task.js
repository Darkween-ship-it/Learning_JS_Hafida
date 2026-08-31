const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your task:", (taskName) =>{
    rl.question("Enter your priority:",(priority) =>{
        rl.question('Enter your due date:',(duedate) =>{
            console.log(`your task is : ${taskName}`);
            console.log(`Priority:`,priority);
            console.log(`DueDate:`, duedate);
            rl.close();
        })
        
    })
    
});