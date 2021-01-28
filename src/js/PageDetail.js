import { storeShow, storeIcons, iconsShow } from './utility'
const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let gameDetail = "";

    const fetchGame = (url, argument) => {
      let finalURL = url + argument;
      
      let youtubeVideo = "";


      const fetchScreenShots = (finalURL) => {
      fetch(`${finalURL}/screenshots`)
      .then((response) => response.json())
      .then((response) => {
        let screenshots = "";
        for (let i=0 ; i < 4 ; i++) {
          if (response.results[i]) {
          screenshots += `<img src="${response.results[i].image}" alt="">`
        }
      }
        document.getElementById("screen-shots").innerHTML = screenshots;
      })
    }

      // get youtube videos

      const fetchYouTube = (finalURL) => {
        fetch(`${finalURL}/youtube`)
            .then((response) => response.json())
            .then((response) => {
              let youtubevideo = "";
              if (response.results) {
                    youtubevideo = `
                    <div class="first-yt">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${
                      response.results[0].external_id
                    }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="title-ytb-first">
                    <h2 class="rating">${response.results[0].name}</h2>
                    <h3>${response.results[0].channel_title} - ${response.results[0].created}</h3>
                    </div>
              `     }
                    document.getElementById("youtube-video").innerHTML = youtubevideo;
                  
                    let youtubeMini = "";
                    for (let i = 1 ; i < 4 ; i++){
                      if (response.results[i]) {
                      youtubeMini += `
                      <iframe width="30%" height="315" src="https://www.youtube.com/embed/${response.results[i].external_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    }
                  }
                    document.getElementById("youtube-mini").innerHTML = youtubeMini;
                }

            )
    }
  

    const fetchSimilarGames = (finalURL) => {
      fetch(`${finalURL}/suggested`)
          .then((response) => response.json())
          .then((response) => {
              let similarGames = "";
              for (let i = 0; i < 6; i++) {
                  similarGames += `
                    <div class="cardGame">
                        <img class="img-card" src="${response.results[i].background_image}" alt="${response.results[i].name}">
                        <a href = "#pagedetail/${response.results[i].id}">${response.results[i].name}</a>
                      <div id="icons">
                        ${iconsShow(response.results[i].parent_platforms)}
                      </div>
                    </div>
                  `
              }
              document.getElementById("similar-games").innerHTML = similarGames;
          })
  }
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let platforms = response.platforms.map(plat => plat.platform.name).join(", ");
          let developers = response.developers.map(dev => dev.name).join(", ");
          let publishers = response.publishers.map(publi => publi.name).join(", ");
          let genres = response.genres.map(genre => genre.name).join(", ");
          let tags = response.tags.map(tag => tag.name).join(", ");


          const trailer = () => {
            let trailer = "";
            if (response.clip) {
              trailer = `
              <video controls width ="100%">
              <source src ="${response.clip.clip}" type="video/mp4">
              </video>`
            }
            return trailer;
          }
          // if (response.clip.clip) {
          //   document.getElementById("trailer").innerHTML = `
          //   <video controls width ="100%">
          //   <source src ="${response.clip.clip}" type="video/mp4">
          // </video>`
            
          // } else {
          //   document.getElementById("trailer").innerHTML = `No content`;
          //   document.getElementById("youtube").innerHTML =
          //     "<p>No data on this<p>";
          // }

          gameDetail = `
          <div class="jumbo" style="background-image: url(${response.background_image});">
            <a href="${response.website}" class="button"><p>Check Website</p><i class="fas fa-caret-right fa-2x"></i></a>
          </div>
            <div class="title-rating">
              <div class="title-detail">${response.name}, </div>
                <p class="rating">${response.rating}/5 - ${response.ratings_count} votes</p>
              </div>
              
              <section>
              <p>${response.description}</p>

              <div class="grid-detail">
              <p><b>Release</b><br>${response.released}</p>
              <p><b>Developer</b><br>${developers}</p>
              <p><b>Platforms</b><br>${platforms}</p>
              <p><b>Publishers</b><br>${publishers}</p>
              <p><b>Genre</b><br>${genres}</p>
              <p></p>
              <p><b>Tags</b><br>${tags}</p>
              </div>
              </section>
              
              <section>
              <h2 class="title">BUY</h2>
              ${storeShow(response)}
            </section>

            <section>
              <h2 class="title">TRAILER</h2>
              <div id="trailer">
              ${trailer()}
              </div>
            </section>

            <section>
              <h2 class="title">SCREENSHOTS</h2>
             <div id="screen-shots" class="grid-screen"></div>
            </section>

            <section>
              <h2 class="title">YOUTUBE</h2>
              <div id="youtube-video"></div>
              <div id="youtube-mini"></div>
            </section>

            <section>
              <h2 class="title">SIMILAR GAMES</h2>
              <div id="similar-games" class="grid-container"></div>
            </section>`
          // let { background_image, website, ratings, ratings_count,  developpers, platforms, genres, tags, publishers, stores, clips, screenshots, youtube, similargames, name, released, description } = response;

          // let articleDOM = document.querySelector(".page-detail .article");

          // articleDOM.querySelector("h1.title").innerHTML = name;
          // articleDOM.querySelector("p.release-date span").innerHTML = released;
          // articleDOM.querySelector("p.description").innerHTML = description;
          document.querySelector(".page-detail").innerHTML = gameDetail;

          fetchScreenShots(finalURL);
          fetchYouTube(finalURL);
          fetchSimilarGames(finalURL)
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