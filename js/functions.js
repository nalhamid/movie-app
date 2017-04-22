var url = 'http://api.themoviedb.org/3/',
    mode = 'search/movie?query=',
    input,
    movieName,
    topRated = 'movie/top_rated',
    popular = 'movie/popular',
    upcoming = 'movie/upcoming',
    info = 'movie/',
    videoU = '/videos',
    reviewU = '/reviews',
    imagePath = 'https://image.tmdb.org/t/p/w342/',
    key = '?api_key=bcffed8df19cf30b0db83b0e4df858cc';


var getPopular = function() {
    $.ajax({
        type: 'GET',
        url: url + popular + key,
        async: true,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            setPopular(json);
        },
        error: function(e) {
            console.log(e.message);
        },

    });
};


var getTop = function() {
    $.ajax({
        type: 'GET',
        url: url + topRated + key,
        async: true,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(topJson) {
            setTop(topJson);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
};

// var getLatest = function() {
//     $.ajax({
//         type: 'GET',
//         url: url + latest + key,
//         async: true,
//         jsonpCallback: 'testing',
//         contentType: 'application/json',
//         dataType: 'jsonp',
//         success: function(latestJson) {
//             setLatest(latestJson);

//         },
//         error: function(e) {
//             console.log(e.message);
//         }
//     });
// };


var getUpcomming = function() {
    $.ajax({
        type: 'GET',
        url: url + upcoming + key,
        async: true,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(upcomingJson) {
            setUpcomming(upcomingJson);
        },
        error: function(e) {
            console.log(e.message);
        }
    });


};

var setPopular = function(json) {
    for (var i = 0; i < 6; i++) {
        var movieBox = movieInfo.replace("%name%", json.results[i].title).replace("%poster%", imagePath + json.results[i].poster_path).replace("%rating%", json.results[i].vote_average).replace("%id%", json.results[i].id);
        $("#popular-box-main:last").append(movieBox);

    }
    json.results.forEach(function(movie) {

        var movieBox = movieInfo.replace("%name%", movie.title).replace("%poster%", imagePath + movie.poster_path).replace("%rating%", movie.vote_average).replace("%id%", movie.id);

        $("#popular-box:last").append(movieBox);

    });

};

var setTop = function(topJson) {
    for (var i = 0; i < 6; i++) {
        var movieBox = movieInfo.replace("%name%", topJson.results[i].title).replace("%poster%", imagePath + topJson.results[i].poster_path).replace("%rating%", topJson.results[i].vote_average).replace("%id%", topJson.results[i].id);
        $("#top-box-main:last").append(movieBox);

    }
    topJson.results.forEach(function(movie) {

        var movieBox = movieInfo.replace("%name%", movie.title).replace("%poster%", imagePath + movie.poster_path).replace("%rating%", movie.vote_average).replace("%id%", movie.id);

        $("#top-box:last").append(movieBox);

    });

};

// var setLatest = function(latestJson) {
//     for (var i = 0; i < 6; i++) {
//         var movieBox = movieInfo.replace("%name%", latestJson.results[i].title).replace("%poster%", imagePath + latestJson.results[i].poster_path).replace("%rating%", latestJson.results[i].vote_average).replace("%id%",latestJson.results[i].id );
//         $("#latest-box-main:last").append(movieBox);

//     }
//     latestJson.results.forEach(function(movie) {

//         var movieBox = movieInfo.replace("%name%", movie.title).replace("%poster%", imagePath + movie.poster_path).replace("%rating%", movie.vote_average).replace("%id%",movie.id );

//         $("#latest-box:last").append(movieBox);

//     });

// };

var setUpcomming = function(upcomingJson) {
    for (var i = 0; i < 6; i++) {
        var movieBox3 = movieInfo.replace("%name%", upcomingJson.results[i].title).replace("%poster%", imagePath + upcomingJson.results[i].poster_path).replace("%rating%", upcomingJson.results[i].vote_average).replace("%id%", upcomingJson.results[i].id);
        $("#upcoming-box-main:last").append(movieBox3);

    }
    upcomingJson.results.forEach(function(movie) {

        var movieBox3 = movieInfo.replace("%name%", movie.title).replace("%poster%", imagePath + movie.poster_path).replace("%rating%", movie.vote_average).replace("%id%", movie.id);

        $("#upcoming-box:last").append(movieBox3);

    });
};

var getSingle = function() {
    var currentUrl = window.location.href;
    var id = currentUrl.substring(currentUrl.lastIndexOf('=') + 1);

    $.ajax({
        type: 'GET',
        url: url + info + id + key,
        async: true,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(infoJson) {
            var info = single.replace("%name%", infoJson.title).replace("%poster%", imagePath + infoJson.poster_path).replace("%rating%", infoJson.vote_average).replace("%overview%", infoJson.overview).replace("%imdb_id%", infoJson.imdb_id);
            $("#single-movie").prepend(info);
            getVideos(id);

        },
        error: function(e) {
            console.log(e.message);
        }
    });

    var getVideos = function(id) {
        $.ajax({
            type: 'GET',
            url: url + info + id + videoU + key,
            async: true,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(videoJson) {
                videoJson.results.forEach(function(vid) {
                    if (vid.site = "YouTube") {
                        var vidUrl = trailers.replace("%key%", vid.key);
                        $("#trailers:last").append(vidUrl);
                    }


                });

                getReviews(id);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    };

    var getReviews = function(id) {
        $.ajax({
            type: 'GET',
            url: url + info + id + reviewU + key,
            async: true,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(reviewJson) {
                reviewJson.results.forEach(function(rev) {
                    var revInfo = reviews.replace("%author%", rev.author).replace("%content%", rev.content);
                    $("#reviews:last").append(revInfo);

                });
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    };







};
