$(document).ready(function() {
    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        input,
        movieName,
        topRated ='movie/top_rated',
        popular = 'movie/popular'
        key = '&api_key=bab007b9a6288af1455b8cee1f4f9d36';

        $.getjson(url+popular+key+"?callback=?",function (json) {
          if (json != "Nothing found."){
            json.foreach(function(movie){

var movieBox = movieInfo.replace("%name%", movie.title).replace("%poster%",movie.poster_path);

$("#popular-box:last").append(movieBox);

            })
          }
        });

    $('button').click(function() {
        var input = $('#movie').val(),
            movieName = encodeURI(input);
        $.ajax({
            type: 'GET',
            url: url + mode + input + key,
            async: false,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                console.dir(json);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    });



});​
