import '../sass/style.scss';

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { routes } from './routes';
import { PageList } from './PageList';
import { hiddenDetails, showDetails , showMore, hiddenShow} from './utility';
const searchBar = document.querySelector("form");
let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

//PageList Game


searchBar.addEventListener("submit", (e) => {
  const gameSearch = document.getElementById("searchgame").value;
  e.preventDefault();
  PageList(gameSearch);
});