import {welcome} from './components';
const PageList = (argument = "") => {

  let show = 0;
  const getMaxGames = () => {
    show = 0;
    document.getElementById("load-div").innerHTML = "";
    let game = document.getElementsByClassName("cardGame");

    document.getElementsByClassName("cardgame").forEach((game) => {
      game.classList.add("hidden");
    });
    for (let i = 0; i < 27; i++) {
      if (i > 8) {
        document.getElementById("load-div").innerHTML = `<div id ="loadmore" class="loadBtn">Show more</div>`;
        break;
      }
      if (games[i].classList.contains(e.target.value)) {
        games[i].classList.remove("hidden");
        show++;
      }
    }
 };

  const preparePage = () => {
    
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";
    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {

          response.results.forEach((article) => {
            const parentPlatforms = article.parent_platforms;
           
            articles += `
            
              <div class="cardGame">
            
              <a href = "#pagedetail/${article.id}">${article.name}</a>
              <div>
              </div>
            </div> 
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };
  const welcomeShow = document.getElementById("welcome");
  const render = () => {
    welcomeShow.innerHTML = `${welcome()}`;
    pageContent.innerHTML = `


      <section class="page-list">
        <div class="grid-container articles">...loading</div>
      
      <div class="load-div">
        <div id ="loadmore" class="loadBtn">Show more</div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
}
export { PageList };