const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("showButton");
const imageRow = document.getElementById("imageRow");
const heartShape = document.getElementById("heartShape");
const bgMusic = document.getElementById("bgMusic");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🌸 Hiệu ứng trái tim bay nền
let hearts = [];

class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -3, -3, -3, 0);
    ctx.bezierCurveTo(-3, 3, 0, 5, 0, 8);
    ctx.bezierCurveTo(0, 5, 3, 3, 3, 0);
    ctx.bezierCurveTo(3, -3, 0, -3, 0, 0);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 0, 100, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.05);
    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

for (let i = 0; i < 100; i++) {
  hearts.push(
    new Heart(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 0.5 + 0.5,
      Math.random() * 1 + 0.5
    )
  );
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h) => h.update());
  requestAnimationFrame(animate);
}
animate();

// 💫 Khi bấm nút hiển thị ảnh và tạo chữ T
button.addEventListener("click", async () => {
  button.style.display = "none";
  imageRow.style.opacity = 1;
  imageRow.style.transform = "translateY(0)";
  try {
    await bgMusic.play();
  } catch (err) {
    alert("👉 Hãy nhấn phím hoặc cho phép phát nhạc nhé 🎵");
  }

  const imgs = imageRow.querySelectorAll("img");

  // Ảnh xuất hiện lần lượt
  imgs.forEach((img, i) => {
    setTimeout(() => {
      img.style.opacity = 1;
      img.style.transform = "scale(1)";
    }, i * 500);
  });

  // Sau 3.5 giây => ẩn hàng ngang, hiện chữ T
  setTimeout(() => {
    imageRow.style.display = "none";
    heartShape.style.display = "block";
    createSparkles(); // tạo hiệu ứng lấp lánh
  }, 3500);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 🌟 Hiệu ứng lấp lánh quanh chữ T
function createSparkles() {
  const heart = document.querySelector(".heart-shape");
  for (let i = 0; i < 25; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.top = Math.random() * heart.clientHeight + "px";
    s.style.left = Math.random() * heart.clientWidth + "px";
    s.style.animationDelay = Math.random() * 2 + "s";
    heart.appendChild(s);
  }
}
