

let websocket;
function connect() {
    let IP = document.getElementById("IP_Input").value;
    let Port = document.getElementById("Port_Input").value;
    let Password = document.getElementById("Password_Input").value;

    try {
        websocket = new WebSocket('wss://' + IP + ':' + Port); // Connect to the server 
    } catch (error) {
        console.log(error);
        return;
    }
    

    document.getElementById("Main_Div").style.display = "none";
    document.getElementById("Visual_Display").style.display = "block";

    websocket.onopen = function(event) {
        console.log('Connected to server');
    
        websocket.onmessage = (event) => {
            const img = document.getElementById("screenshot");
            img.src = "data:image/png;base64," + event.data;
        };
    };

    websocket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };
}



//const websocket = new WebSocket('ws://localhost:60170');    



/*
function mousemove(e) {
    let x = e.clientX;
    let y = e.clientY;
    let image = document.getElementById('screenshot');
    let width = image.clientWidth;
    let height = image.clientHeight;

    websocket.send('MouseMoveTo:[' + x + ',' + y + ',' + width + ',' + height + ']'); 

} */

function mouseDown(e) {
    if (e.button == 0) {
        websocket.send('MouseDown:left'); 
    } else if (e.button == 1) {
        websocket.send('MouseDown:middle');
    } else if (e.button == 2) {
        websocket.send('MouseDown:right');
    }
}

function mouseUp(e) {
    if (e.button == 0) {
        websocket.send('MouseUp:left'); 
    } else if (e.button == 1) {
        websocket.send('MouseUp:middle');
    } else if (e.button == 2) {
        websocket.send('MouseUp:right');
    }
}

let keysPressed = {};

function keyDown(e) {
    if (!keysPressed[e.code]) { // Prevents multiple triggers
        keysPressed[e.code] = true;
    websocket.send('KeyDown:' + e.key);
} }

function keyUp(e) {
    delete keysPressed[e.code];
    websocket.send('KeyUp:' + e.key);
}
