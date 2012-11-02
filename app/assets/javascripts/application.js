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
                bind_events();
            }
        });
    },
    vote: function(vote, song_id) {
        $.ajax({
            url: "votes",
            type: "post",
            data: { "vote" : vote, "song_id" : song_id }
        });
        if (vote == 1){
            up_votes = $("tr[data-id='" + song_id +"'] .votes .up-vote");
            updated_value = (parseInt(up_votes.attr("up-votes")) + 1).toString();
            up_votes.html(updated_value);
            up_votes.attr("up-votes", updated_value);
        }
        else{
            down_votes = $("tr[data-id='" + song_id +"'] .votes .down-vote");
            updated_value = (parseInt(down_votes.attr("down-votes")) - 1).toString();
            down_votes.html(updated_value);
            down_votes.attr("down-votes", updated_value);
        }
    }
}

function bind_events() {
    $("#songs").delegate(".up-button","click", function(e){
        song_id = $(e.currentTarget).parents("tr:first").attr("data-id");
        BalleBalle.vote(1, song_id);
    });
    $("#songs").delegate(".down-button","click", function(e){
        song_id = $(e.currentTarget).parents("tr:first").attr("data-id");
        BalleBalle.vote(-1, song_id);
    });
}



