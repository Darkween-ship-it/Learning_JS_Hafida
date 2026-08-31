const readline = require("readline");

const rl = readline.createInterface({
    input:ProcessingInstruction.stdin,
    output: ProcessingInstruction.stdout,
});

rl.question("Enter your task:", (taskName) =>{
    console.log(`your task is : ${taskName}`);
    rl.close();
});