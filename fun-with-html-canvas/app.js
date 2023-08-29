const canvas = document.querySelector("#draw");
// You can't draw directly on the canvas, you need to get the context
const ctx = canvas.getContext("2d");

// Resizing the canvas to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// When somebody draws, there has to be a color, the end of the line should be round (lineCap).
// strokeStyle is the color of the line (outline), lineJoin is the shape of the line, where two lines meet.
ctx.strokeStyle = "#DADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 1;
ctx.globalCompositeOperation = "add";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 180;
let direction = true;

// ==================== //

// function draw() display all of our mouse events
function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e);

    // changing the color of the line
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    // ctx.lineWidth = `${hue - 240}`;
    ctx.beginPath();

    // start from
    ctx.moveTo(lastX, lastY);
    // move to
    ctx.lineTo(e.offsetX, e.offsetY);   // beginPath() creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.

    ctx.stroke(); //we don't see anything untli we call stroke

    // updating the lastX and lastY
    [lastX, lastY] = [e.offsetX, e.offsetY]; // ES6 destructuring;

    // incrementing the hue, if it is greater than 360, it automatically resets to 0!
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    // incrementing or decrementing the lineWidth
    if (hue >= 180 && hue <= 360) {
        ctx.lineWidth++ //incrementing the lineWidth depending on the hue
    } else {
        ctx.lineWidth--; //
    }



}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY] // when typping [e.offsetX, e.offsetY] = [lastX, lastY] there a fault, because we are trying to set the value of offsetX and offsetY to 0.
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);