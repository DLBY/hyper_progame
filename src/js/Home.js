const Home = (argument = "") => {

  const getDate = () => {
    let dateNow = new Date();
    let month = dateNow.getMonth()+1;
    let day = dateNow.getDate();
    let fullCurrentDate = dateNow.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;

    // get current year+1
    let fullNextYear = dateNow.getFullYear()+1 + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;
    return `${fullCurrentDate},${fullNextYear}`
  };

  const preparePage = () => {
    
    let cleanedArgument = getDate();
    let articles = "";
    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?dates=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `     
          <div class="cardGame">
          <h1>${article.name}</h1>
          <h2>${article.released}</h2>
          <a href = "#pagedetail/${article.id}">${article.id}</a>
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
    pageContent.innerHTML = `
    <section>
        <h1 class="saywelcome">Welcome,</h1>
        <p class="description">The Hyper Progame is the world's premier event for computer and video games and related products. At The Hyper Progame, the video game industy's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industy. For three exiting days, leading-edge compagnies, groundbrealing new technologies, and never-before seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
        <div>
          <select name="selectplatform">
            <option value="any">Platform : Any</option>
          </select>
        </div>
      </section>

      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};
export { Home };