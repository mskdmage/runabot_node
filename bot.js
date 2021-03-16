// import the robotjs library
var robot = require('robotjs');

//Main Routine
const hierro = {
    name : 'hierro',
    colors : ["3d3616"]
}

function main() {
    console.log('Comenzando');
    sleep(4000);
    while (true) {
        let object = findObject(hierro);
        if (object == false) {
            rotateCamera();
            continue;
        }
        robot.moveMouse(object.x, object.y);
        robot.mouseClick();
        sleep(5000);
    }
    console.log('Terminando');
}

//Find Object
function findObject(object) {
    let screenSize = robot.getScreenSize()    
    let x = 0, y = 0, width = screenSize.width, height = screenSize.height;
    let capture = robot.screen.capture(x, y, width, height);
    let objectColors = object.colors;
    
    for (let i = 0; i < screenSize.height; i++) {
        
        let random_x = randomNumber(0, width - 1);
        let random_y = randomNumber(0, height - 1);
        let sample = capture.colorAt(random_x, random_y);

        if (objectColors.includes(sample)) {
            
            let pos_x = random_x + x;
            let pos_y = random_y + y;

            if (confirmObject(pos_x, pos_y)) {
            
                console.log("Found");
                return {x: pos_x, y: pos_y};            
            
            } else {
            
                console.log('Not found');
            
            }
        }
    }
    return false;
}

//Confirm Object
const confirmObject = (pos_x, pos_y) => {
    robot.moveMouse(pos_x, pos_y);
    sleep(300);
    let check_x = 103;
    let check_y = 63;
    let pixel_color = robot.getPixelColor(check_x, check_y);
    return pixel_color != "e7e7e7";
}

//Rotate Camera
function rotateCamera() {
    console.log("Rotating camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

//Sleep Function
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

//Random Function
const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();