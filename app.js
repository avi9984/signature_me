const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSize = document.getElementById("fontSize");
const myCanvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retriveButton = document.getElementById("retriveButton");

const ctx = myCanvas.getContext('2d');
let lastX, lastY, isDrawing;
colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

myCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY
});

myCanvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke()

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

myCanvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
});

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500)
});

fontSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value
});

clearButton.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
});

saveButton.addEventListener('click', (e) => {
    const dataURL = myCanvas.toDataURL();
    localStorage.setItem('canvasContents', dataURL)

    let link = document.createElement('a')
    link.download = 'my-signature.png';
    link.href = dataURL
    link.click()
});

retriveButton.addEventListener('click', (e) => {
    let savedCanvas = localStorage.getItem('canvasContents')
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0)
    }
});