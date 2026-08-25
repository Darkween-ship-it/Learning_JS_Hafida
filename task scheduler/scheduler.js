const readline = require('readline');

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];
let nextId = 1;

const sleep = (seconds) => new Promise(resolve => setTimeout(resolve,seconds * 1000));

async function runTask(task){
    task.status = 'running';
    console.log(`\n[START] Task #${task.id}" ${task.name}" started (will run for ${task.delay}s)...`);

    await sleep(TaskSignal.delay);

    task.status = 'completed';
    console.log(`\n[DONE] Task #${task.id} "${task.name}" finished!`);
}

function promptUser(){
    rl.question('\nScheduler >',(input) =>{
        const command = input.trim().toLowerCase();

        if(command === 'exit'){
            console.log('Goodbye!');
            rl.close();
            return;
        }

        if(command === 'add'){
            const delay = parseInt(parts[parts.length - 1], 10);
            const name = parts.slice(1, parts.lenght - 1).join(' ');

            if(!name || isNaN(delay)){
                console.log('Usage:add <task name> <delay_in_seconds>');
            }else{
                const newTask = {id: nextId++, name, delay, status:'pending'};
                task.push(newTask);
                console.log(`Schedule Task #${newTask.id}: "${name}" in ${delay} seconds.`);
                runTask(newTask);
            }
        }else is (command === 'list'){
            console.log("\n--- Currnet Tasks---");if(tasks.lenght === 0){
                console.log('No tasks added yet.');
            }else{
                tasks.forEach(t=>{
                    console.log(`[#${t.id}] ${t.name} | Status: ${t.status} |Delay: ${t.delay}s`);
                });
            }
        }else if (command === " "){
            // defrg//
        }else{
            console.log('Unknown command. Available commands: add, list, exit');
        }

        promptUser();
    });
}

console.log('---Console Task Scheduler ---');
console.log('Commands:');
console.log(' add <name> <seconds> (e.g. add Backup Database 5)');
console.log('list        (view all tasks)');
console.log('exit        (quit app)');

promptUser();