import { texts } from "./texts";

document.title = texts.metaTitle;

const title = document.getElementById("landing-title");
const subtitle = document.getElementById("landing-subtitle");
const nav = document.getElementById("landing-nav");
const itemLink = document.getElementById("landing-item-link");
const moduloLink = document.getElementById("landing-modulo-link");

if (title) {
  title.textContent = texts.landing.title;
}

if (subtitle) {
  subtitle.textContent = texts.landing.subtitle;
}

if (nav) {
  nav.setAttribute("aria-label", texts.landing.navLabel);
}

if (itemLink) {
  itemLink.textContent = texts.landing.itemLabel;
}

if (moduloLink) {
  moduloLink.textContent = texts.landing.moduloLabel;
}
