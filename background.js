// Basit bir animasyon: sayfaya girildiğinde fade-in efekti
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1.5s";
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);
});
