$(document).ready(function() {

    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        input,
        movieName,
        topRated = 'movie/top_rated',
        popular = 'movie/popular',
        imagePath = 'https://image.tmdb.org/t/p/w342/'
    key = '?api_key=bab007b9a6288af1455b8cee1f4f9d36';

    console.log("1");

    $.ajax({
        type: 'GET',
        url: url + popular + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.dir(json);
            console.log("2");
            console.log(json);
            json.results.forEach(function(movie) {
               
                var movieBox = movieInfo.replace("%name%", movie.title).replace("%poster%", imagePath + movie.poster_path).replace("%rating%" , movie.vote_average);

                $("#popular-box:last").append(movieBox);

            });
        },
        error: function(e) {
            console.log(e.message);
        }
    });

});

