const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d"); // để sữ dụng hàm vẽ của canvas

// set width and height for canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#FF69B4", "#FF00FF", "#7FFF00", "#00FFFF", "#F5DEB3", "#FF4500", "#00FFFF", "#FF0099"];

const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)];
}

const mouse = {
    x: window.innerWidth,
    y: window.innerHeight
}
console.log(Math.random() * window.innerWidth);
// create template object circle
function Particle(x, y, radius, color, velocity) {
    // tọa độ
    this.x = x;
    this.y = y;
    // bán kính
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 400;

    // hàm vẽ
    this.draw = () => {
        // bắt đầu vẽ
        context.beginPath();
        // vẽ
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // đưa màu vào
        context.fillStyle = this.color;
        // hiển thị màu
        context.fill();
        // nghĩ vẽ
        context.closePath();
    };

    this.update = () => {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl--;
    }
};

let particles = [];
const particlesCount = 40;

function init() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radians = (Math.PI * 2) / particlesCount;

    for(let i = 0; i < particlesCount; i++) {
        const velocity = {
            x: Math.cos(radians * i),
            y: Math.sin(radians * i)
        }
        particles.push(
            new Particle(x, y, 4, randomColor(colors), velocity)
        )
    }
};

const generateCircles = () => {
    setTimeout(generateCircles, 500);
    const x = Math.random() * mouse.x;
    const y = Math.random() * mouse.y;

    const radians = (Math.PI * 2) / particlesCount;

    for(let i = 0; i < particlesCount; i++) {
        const velocity = {
            x: Math.cos(radians * i),
            y: Math.sin(radians * i)
        }
        particles.push(
            new Particle(x, y, 10, randomColor(colors), velocity)
        )
    }
}

const animate = () => {
    // hàm này sẽ chạy liên tục
    requestAnimationFrame(animate);
    context.fillStyle = "rgba(0, 0, 0, 0.08)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((item, index) => {
        if(item.ttl === 0) {
            particles.splice(index, 1);
        }
        item.update();
    });
};



init();
animate();
generateCircles();

// window.addEventListener("mousemove", e => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// });