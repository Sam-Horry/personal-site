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
