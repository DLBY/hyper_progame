import { header } from './components';

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
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};
export { Home };