class WheelOfFortune {
    constructor() {
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.spinBtn = document.getElementById('spinBtn');
        this.speedSlider = document.getElementById('speedSlider');
        this.speedValue = document.getElementById('speedValue');
        this.resultModal = document.getElementById('resultModal');
        this.resultPrize = document.getElementById('resultPrize');
        this.closeModal = document.getElementById('closeModal');
        this.segmentsList = document.getElementById('segmentsList');
        this.addSegmentBtn = document.getElementById('addSegment');
        
        this.segments = [
            { text: '100 Pontos', color: '#FF6B6B' },
            { text: '50 Pontos', color: '#4ECDC4' },
            { text: 'Perde Vez', color: '#45B7D1' },
            { text: '200 Pontos', color: '#96CEB4' },
            { text: 'Jogue Novamente', color: '#FECA57' },
            { text: 'Prêmio Especial', color: '#FF9FF3' },
            { text: '10 Pontos', color: '#54A0FF' },
            { text: 'Bônus', color: '#5F27CD' }
        ];
        
        this.currentRotation = 0;
        this.isSpinning = false;
        this.spinSpeed = 10;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.drawWheel();
        this.setupEventListeners();
        this.renderSegmentsEditor();
    }
    
    setupEventListeners() {
        this.spinBtn.addEventListener('click', () => this.spin());
        this.speedSlider.addEventListener('input', (e) => {
            this.spinSpeed = parseInt(e.target.value);
            this.speedValue.textContent = this.spinSpeed;
        });
        this.closeModal.addEventListener('click', () => this.closeResultModal());
        this.addSegmentBtn.addEventListener('click', () => this.addSegment());
        
        // Close modal on outside click
        this.resultModal.addEventListener('click', (e) => {
            if (e.target === this.resultModal) {
                this.closeResultModal();
            }
        });
    }
    
    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const anglePerSegment = (2 * Math.PI) / this.segments.length;
        
        this.segments.forEach((segment, index) => {
            const startAngle = index * anglePerSegment + this.currentRotation;
            const endAngle = (index + 1) * anglePerSegment + this.currentRotation;
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = segment.color;
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw text
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + anglePerSegment / 2);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 14px Poppins';
            this.ctx.textAlign = 'right';
            this.ctx.textBaseline = 'middle';
            
            // Add text shadow
            this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
            this.ctx.shadowBlur = 2;
            this.ctx.shadowOffsetX = 1;
            this.ctx.shadowOffsetY = 1;
            
            this.ctx.fillText(segment.text, radius - 20, 0);
            this.ctx.restore();
        });
        
        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinBtn.disabled = true;
        
        const spins = 5 + Math.random() * 5; // 5-10 full rotations
        const totalRotation = spins * 2 * Math.PI;
        const finalRotation = this.currentRotation + totalRotation;
        
        const duration = 3000 + (20 - this.spinSpeed) * 100; // 3-5 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            this.currentRotation = this.currentRotation + (finalRotation - this.currentRotation) * easeOut;
            
            this.drawWheel();
            
            if (progress < 1) {
                this.animationId = requestAnimationFrame(animate);
            } else {
                this.stopSpin();
            }
        };
        
        this.animationId = requestAnimationFrame(animate);
    }
    
    stopSpin() {
        this.isSpinning = false;
        this.spinBtn.disabled = false;
        
        // Calculate winning segment
        const anglePerSegment = (2 * Math.PI) / this.segments.length;
        const normalizedRotation = this.currentRotation % (2 * Math.PI);
        const winningIndex = Math.floor(((2 * Math.PI) - normalizedRotation) / anglePerSegment) % this.segments.length;
        
        const winner = this.segments[winningIndex];
        this.showResult(winner);
    }
    
    showResult(segment) {
        this.resultPrize.textContent = segment.text;
        this.resultPrize.style.backgroundColor = segment.color;
        this.resultModal.style.display = 'block';
        
        // Play celebration animation
        this.resultPrize.style.animation = 'bounce 0.6s ease';
    }
    
    closeResultModal() {
        this.resultModal.style.display = 'none';
        this.resultPrize.style.animation = '';
    }
    
    renderSegmentsEditor() {
        this.segmentsList.innerHTML = '';
        
        this.segments.forEach((segment, index) => {
            const segmentItem = document.createElement('div');
            segmentItem.className = 'segment-item';
            segmentItem.innerHTML = `
                <input type="text" value="${segment.text}" data-index="${index}" class="segment-text">
                <input type="color" value="${segment.color}" data-index="${index}" class="segment-color">
                <button class="delete-btn" data-index="${index}">Excluir</button>
            `;
            this.segmentsList.appendChild(segmentItem);
        });
        
        // Add event listeners for segment editing
        document.querySelectorAll('.segment-text').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.segments[index].text = e.target.value;
                this.drawWheel();
            });
        });
        
        document.querySelectorAll('.segment-color').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.segments[index].color = e.target.value;
                this.drawWheel();
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.deleteSegment(index);
            });
        });
    }
    
    addSegment() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'];
        const newSegment = {
            text: `Novo ${this.segments.length + 1}`,
            color: colors[this.segments.length % colors.length]
        };
        
        this.segments.push(newSegment);
        this.drawWheel();
        this.renderSegmentsEditor();
    }
    
    deleteSegment(index) {
        if (this.segments.length > 2) {
            this.segments.splice(index, 1);
            this.drawWheel();
            this.renderSegmentsEditor();
        } else {
            alert('A roda precisa ter pelo menos 2 segmentos!');
        }
    }
}

// Initialize the wheel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WheelOfFortune();
});

// Add some fun sound effects (optional)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('input')) {
        e.preventDefault();
        document.getElementById('spinBtn').click();
    }
});