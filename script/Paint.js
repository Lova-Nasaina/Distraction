const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorBtn = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let selectedColor = "#000";

// Pour modifier le background de l'image enregistrer
const setCanvasBackground = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor;
};

$(window).ready(function () {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setCanvasBackground();
});

const drawRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawCircle = (e) => {
  ctx.beginPath();
  // pour avoir le Rayon du cercle par le mouse pointeur
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke(); // le Fill du cercle est cocher
};

const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY); // point de depart du triangle par le mouse du sourie
  ctx.lineTo(e.offsetX, e.offsetY); //  creation du premier line par le pointeur du sourie
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // création du line de base du triangle
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke(); // le Fill du rectangle est cocher
};

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor; // passing selected comme stroke style
  ctx.fillStyle = selectedColor; // passing selected comme fill style

  // pour eviter toutes deformation du rectangle lors du deplacement de la sourie
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
  if (!isDrawing) return;

  // pour eviter toutes deformation du rectangle lors du deplacement de la sourie
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value)); // passée slider valeur comme brusWidth

colorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");
    // console.log(btn);
    // manao ny selection de couleur du text
    console.log(
      (selectedColor = window
        .getComputedStyle(btn)
        .getPropertyValue("background-color"))
    );
  });
});

// colorPicker.addEventListener("change", () => {
//   colorPicker.parentElement.style.background = colorPicker.value;
//   colorPicker.parentElement.click();
// });
$("#color-picker").change(function () {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

$(".clear-canvas").click(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasBackground();
});

$(".save-img").click(function () {
  const link = document.createElement("a");
  link.download = `${Date.new}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
