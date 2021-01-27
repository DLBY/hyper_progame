const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let gameDetail = "";

    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          gameDetail = `
          <div class="jumbo" style="background-image: url(${response.background_image});">
          <a href="${response.website}" class="button"><p>Check Website</p><i class="fas fa-caret-right fa-2x"></i></a>
          </div>
          <div class="title-detail">
          <h2>${response.name},</h2>
          <h3>${response.rating}</h3>
          </div>`
          // let { background_image, website, ratings, ratings_count,  developpers, platforms, genres, tags, publishers, stores, clips, screenshots, youtube, similargames, name, released, description } = response;

          // let articleDOM = document.querySelector(".page-detail .article");

          // articleDOM.querySelector("h1.title").innerHTML = name;
          // articleDOM.querySelector("p.release-date span").innerHTML = released;
          // articleDOM.querySelector("p.description").innerHTML = description;
          document.querySelector(".page-detail").innerHTML = gameDetail;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const welcomeShow = document.getElementById("welcome");
  const render = () => {
    welcomeShow.innerHTML = '';
    pageContent.innerHTML = `
      <section class="page-detail">
      <div class="jumbotron"></div>
        <div class="article">
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };