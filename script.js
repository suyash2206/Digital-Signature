const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const downloadLink = document.getElementById('download-link');

let drawing = false;

// Set up the canvas and context
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle = "#000"; // Signature color (black)
ctx.lineWidth = 2; // Signature thickness

// Mouse and touch event handlers
const startDrawing = (event) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
};

const continueDrawing = (event) => {
    if (!drawing) return;
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
};

const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
};

// Touch event handlers
const touchStart = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
};

const touchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    continueDrawing({ clientX: touch.clientX, clientY: touch.clientY });
};

// Attach event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', continueDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Attach event listeners for touch events
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchmove', touchMove);
canvas.addEventListener('touchend', stopDrawing);

// Clear the canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the signature as an image
saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    downloadLink.href = dataURL;
    downloadLink.style.display = 'inline'; // Make the download link visible
    downloadLink.click(); // Trigger the download
});
