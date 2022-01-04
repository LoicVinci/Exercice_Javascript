const Header = () => {

  const header = document.querySelector("header");

  header.innerHTML += `<div class="text-center">Bonjour je m'apelle Loïc et je fais ce site pour m'exercer à mon examen de JavaScript !</div>`;

  header.className = "text-light p-bottom-5";
};

export default Header;
