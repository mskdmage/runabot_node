const robot = require('robotjs');

function clickRock() {
    while (true) {
        sleep(10000);
        robot.moveMouse(1075, 480);
        robot.mouseClick();
        sleep(10000);
    }
    
}

function main() {
    console.log('Starting...');
    sleep(4000);
    clickRock();
    console.log('Done');
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();