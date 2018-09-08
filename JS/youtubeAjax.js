const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {

    const query = {
        maxResults: 25,
        part: 'snippet, id',
        q: searchTerm,
        type: 'video',
        key: 'AIzaSyB-zSXZLbFMsY8mkieBFptcll8jsE53ylA'
    }

    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

function renderResult(result) {
    var videoID = result.id.videoId;
    var title = result.snippet.title;
    var description = result.snippet.description;
    var thumb = result.snippet.thumbnails.high.url;
    var channelTitle = result.snippet.channelTitle;
    var videoDate = result.snippet.publishedAt;

    return `
    <div class="results">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.search-results-container').append(results);
}

function watchSubmit() {
    $('.youtube-search-form').submit(event => {
        event.preventDefault();
        $('.results').remove();
        const queryTarget = $(event.currentTarget).find('.input-field');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displayYouTubeSearchData);
    });
}

$(watchSubmit);