// Managing the keyboard navigation between pages
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case '1':
      window.location.href = "index.html";
      break;
    case '2':
      window.location.href = "projects.html";
      break;
    case '3':
      window.location.href = "skills.html";
      break;
    case '4':
      window.location.href = "contact.html";
      break;
  }
});

// Making the accordians
var acc = document.getElementsByClassName("accordian");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      this.innerHTML = this.innerHTML.replace("△", "▽");
    } else {
      panel.style.display = "block";
      this.innerHTML = this.innerHTML.replace("▽", "△");
    }
  });
}
