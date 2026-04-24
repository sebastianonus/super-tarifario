import { texts } from "./texts";

const appBaseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);

function buildPath(segment: string): string {
  return new URL(segment.replace(/^\/+/, ""), appBaseUrl).pathname;
}

function getPageKind(): "item" | "modulo" {
  const root = document.documentElement;
  const page = root.getAttribute("data-page");
  return page === "modulo" ? "modulo" : "item";
}

const pageKind = getPageKind();

document.title =
  pageKind === "modulo" ? texts.redirect.moduloTitle : texts.redirect.itemTitle;

const target =
  pageKind === "modulo" ? texts.routes.tariffModulo : texts.routes.tariffItem;

window.location.replace(buildPath(target));
