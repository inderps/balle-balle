// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-tmpl

var BalleBalle = {
    load_songs: function() {
        $.ajax({
            url: "songs",
            type: "get",
            success: function(songs) {
                var toggle = false;
                $.each(songs, function(index, song) {
                    $("#songTemplate").tmpl(song).appendTo("#songs");
                    if (toggle == false) {
                        $("tr[data-id=" + song.id + "]").addClass("grey-row");
                        $("tr[data-id=" + song.id + "]").removeClass("white-row");
                        toggle = true;
                    }
                    else {
                        $("tr[data-id=" + song.id + "]").addClass("white-row");
                        $("tr[data-id=" + song.id + "]").removeClass("grey-row");
                        toggle = false;
                    }
                });
//                bind_events();
            }
        });
    }
//
//    vote: function(url, vote, movie_id) {
//        $.ajax({
//            url: url,
//            type: "post",
//            data: { "vote" : vote, "movie_id" : movie_id },
//            success: function(response) {
//            }
//        });
//    },
//    vote_current_movie: function(vote, movie_id) {
//        this.vote("current_movies/vote", vote, movie_id);
//    }
}
