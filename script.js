let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

 const typed = new Typed('.multiple-text', {
      strings: ['Frontend Developer', 'Web Developer', 'Computer Science Student', 'Software Engineer'],
      typeSpeed: 80,
      backSpeed: 80,
      backdelay: 1200,
      loop: true,
    });

document.addEventListener("DOMContentLoaded", () => {
  const readMoreBtn = document.querySelector(".read-more-btn");
  const aboutMore = document.querySelector(".about-more");

  if (!readMoreBtn || !aboutMore) return;

  readMoreBtn.addEventListener("click", () => {
    aboutMore.classList.toggle("active");

    readMoreBtn.textContent = aboutMore.classList.contains("active")
      ? "Read Less"
      : "Read More";
  });
});

