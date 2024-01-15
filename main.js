// Assume data.js is already included and the shows array is available

// Function to initialize the home page with show list
function initHomePage() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<div class="shows-grid"></div>'; // Set up the grid container

  const showsGrid = mainContent.querySelector('.shows-grid');

  shows.forEach(show => {
    const showCard = document.createElement('div');
    showCard.className = 'show-card';
    showCard.innerHTML = `
      <img src="images/MV5BZTIwNjdjZmUtZDJmOC00M2RmLTg2NTItMTMzZjZhNTk3YjVmXkEyXkFqcGdeQWFybm8@._V1_.jpg" alt="${show.title} thumbnail">
      <div class="show-card-content">
        <h3 class="show-card-title">${show.title}</h3>
        <p class="show-card-description">The Boys is an American superhero black comedy drama television series developed by Eric Kripke and based on the Dynamite Entertainment comic series of the same name by Garth Ennis and Darick Robertson.</p>
      </div>
    `;
    showCard.addEventListener('click', () => loadSeasons(show));
    showsGrid.appendChild(showCard);
  });
}

document.getElementById('search-bar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterShows(searchTerm, selectedFilter);
});

let selectedFilter = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');
        selectedFilter = e.target.getAttribute('data-filter');
        filterShows(document.getElementById('search-bar').value, selectedFilter);
    });
});

function filterShows(searchTerm, filter) {
    const filteredShows = shows.filter(show => {
        return show.title.toLowerCase().includes(searchTerm) && (filter === 'all' || show.genre === filter);
    });
    displayShows(filteredShows);
}


function displayShows(showsToDisplay) {
    const showsGrid = document.getElementById('main-content').querySelector('.shows-grid');
    showsGrid.innerHTML = ''; // Clear out current shows

    showsToDisplay.forEach(show => {
        const showCard = document.createElement('div');
        showCard.className = 'show-card';
        showCard.innerHTML = `
          <img src="images/MV5BZTIwNjdjZmUtZDJmOC00M2RmLTg2NTItMTMzZjZhNTk3YjVmXkEyXkFqcGdeQWFybm8@._V1_.jpg" alt="${show.title} thumbnail">
          <div class="show-card-content">
            <h3 class="show-card-title">${show.title}</h3>
            <p class="show-card-description">The Boys is an American superhero black comedy drama television series developed by Eric Kripke and based on the Dynamite Entertainment comic series of the same name by Garth Ennis and Darick Robertson.</p>
          </div>
        `;
        showCard.addEventListener('click', () => loadSeasons(show));
        showsGrid.appendChild(showCard);
    });
}

// Function to load seasons for a selected show
function loadSeasons(show) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<h2>${show.title}</h2>`; // Clear main content and add show title

    show.seasons.forEach(season => {
        const seasonElement = document.createElement('div');
        seasonElement.innerText = `Season ${season.seasonNumber}`;
        seasonElement.addEventListener('click', () => loadEpisodes(season));
        mainContent.appendChild(seasonElement);
    });
}

// Function to load episodes for a selected season
function loadEpisodes(season) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear main content

    season.episodes.forEach(episode => {
        const episodeElement = document.createElement('div');
        episodeElement.innerText = `Episode ${episode.episodeNumber}: ${episode.title}`;
        episodeElement.addEventListener('click', () => playVideo(episode.videoUrl));
        mainContent.appendChild(episodeElement);
    });
}

// Function to play the video in an iframe
function playVideo(videoUrl) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear main content

    // Check for valid URL protocol
    const secureVideoUrl = videoUrl.includes('http://') || videoUrl.includes('https://') ? videoUrl : `https:${videoUrl}`;

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', secureVideoUrl);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '600px');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('allowfullscreen', true);

    mainContent.appendChild(iframe);
}

// Call initHomePage to start the app
initHomePage();
