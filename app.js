const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
// default canvas
canvas.width = 600;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);


// default settings
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke()
    }
}

function onMouseDown(event){
    painting = true;
}


function changeColor(event){
    const selectedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleSave(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "mypainting.png";
    link.click();
}

function handleContextMenu(event){
    event.preventDefault();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if (range){
    range.addEventListener("input", handleRangeChange);
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSave);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));