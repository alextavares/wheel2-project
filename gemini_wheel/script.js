const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');

const segments = [
    { color: '#FFC107', label: 'Prize 1' },
    { color: '#FF9800', label: 'Prize 2' },
    { color: '#FF5722', label: 'Prize 3' },
    { color: '#F44336', label: 'Prize 4' },
    { color: '#E91E63', label: 'Prize 5' },
    { color: '#9C27B0', label: 'Prize 6' },
    { color: '#673AB7', label: 'Prize 7' },
    { color: '#3F51B5', label: 'Prize 8' },
    { color: '#2196F3', label: 'Prize 9' },
    { color: '#03A9F4', label: 'Prize 10' },
    { color: '#00BCD4', label: 'Prize 11' },
    { color: '#009688', label: 'Prize 12' },
    { color: '#4CAF50', label: 'Prize 13' },
    { color: '#8BC34A', label: 'Prize 14' },
    { color: '#CDDC39', label: 'Prize 15' },
    { color: '#FFEB3B', label: 'Prize 16' }
];

const numSegments = segments.length;
const anglePerSegment = (2 * Math.PI) / numSegments;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 10;

let currentAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    for (let i = 0; i < numSegments; i++) {
        const angle = currentAngle + i * anglePerSegment;
        ctx.fillStyle = segments[i].color;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, angle + anglePerSegment);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + anglePerSegment / 2);
        ctx.textAlign = 'right';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(segments[i].label, radius - 15, 10);
        ctx.restore();
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    currentAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    const degrees = currentAngle * 180 / Math.PI + 90;
    const arcd = anglePerSegment * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    const text = segments[index].label;
    ctx.fillText(text, centerX - ctx.measureText(text).width / 2, centerY + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinBtn.addEventListener('click', spin);

drawWheel();