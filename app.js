const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const input = document.querySelector("#angle");
let id;
let hue = 1;

function doSomething(incAngle = 137.508) {
	canvas.width = 0.99*window.innerWidth;
	canvas.height = 0.99*window.innerHeight;
	let radius = 5;
	let dis = 0;
	let angle = 0;
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 5;
	ctx.shadowColor = "rgb(0,0,0,0.1)";
	ctx.translate(canvas.width / 2, canvas.height / 2);
	function drawCircle() {
		ctx.beginPath();
		ctx.arc(
			dis * Math.cos(angle),
			dis * Math.sin(angle),
			radius,
			0,
			Math.PI * 2
		);
		ctx.fillStyle = `hsl(${hue},60%,60%)`;
		ctx.fill();
		ctx.closePath();
		angle += (incAngle / 180) * Math.PI;
		hue++;
		radius += 0.01;
		dis += 0.5;
		id = requestAnimationFrame(drawCircle);
		if (dis > canvas.height) {
			cancelAnimationFrame(id);
		}
	}
	drawCircle();
}

window.addEventListener("load", () => {
	doSomething();
});

window.addEventListener("resize", () => {
	cancelAnimationFrame(id);
	doSomething();
});
input.addEventListener("input", (evt) => {
	cancelAnimationFrame(id);
	doSomething(parseFloat(evt.target.value));
});
