const welcome = () => {
  return `<h1 class="saywelcome">Welcome,</h1>
  <p class="description">The Hyper Progame is the world's premier event for computer and video games and related products. At The Hyper Progame, the video game industy's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industy. For three exiting days, leading-edge compagnies, groundbrealing new technologies, and never-before seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
  <div class="selectdiv">
    <select name="selectplatform" class="selectpointer">
      <option value="any">Platform : Any</option>
      <option value="PlayStation">PlayStation</option>
      <option value="Xbox">Xbox</option>
      <option value="iOS">iOS</option>
      <option value="Android">Android</option>
      <option value="macOS">macOS</option>
      <option value="Nintendo">Nintendo</option>
      <option value="Atari">Atari</option>
      <option value="Sega">Sega</option>
      <option value="Web">Web</option>
    </select>
  </div>`
}

export { welcome };