const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
// $(".toggle").click(function () {
//   $(".sidebar").toggleClass("close");
// });

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});
// $(".search-box").click(function () {
//   $(".sidebar").removeClass("close");
// });

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerHTML = "Mode Claire";
  } else {
    modeText.innerHTML = "Mode Sombre";
  }
});
