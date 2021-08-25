let hamIcon = document.getElementById('hamIcon');
let items = document.getElementById('items');

hamIcon.addEventListener("click", () => {
    items.classList.toggle('active');
});