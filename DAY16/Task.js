const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your task:", (taskName) =>{
    console.log(`your task is : ${taskName}`);
    rl.close();
});