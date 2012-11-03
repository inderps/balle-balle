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
//= require jquery.tinysort.min

var BalleBalle = {
    load_songs: function() {
        function toggle_row_color(song, add, remove) {
            $("tr[data-id=" + song.id + "]").addClass(add);
            $("tr[data-id=" + song.id + "]").removeClass(remove);
        }

        $.ajax({
            url: "songs",
            type: "get",
            success: function(songs) {
                var toggle = false;
                $.each(songs, function(index, song) {
                    $("#songTemplate").tmpl(song).appendTo("#songs");
                    if (toggle == false) {
                        toggle_row_color(song, "grey-row", "white-row");
                        toggle = true;
                    }
                    else {
                        toggle_row_color(song, "white-row", "grey-row");
                        toggle = false;
                    }
                });
                refresh_votes();
                bind_events();
                setInterval("refresh_votes()", 120000);
            }
        });
    },
    vote: function(vote, song_id) {
        $.ajax({
            url: "votes",
            type: "post",
            data: { "vote" : vote, "song_id" : song_id },
            success: function(songs) {
                refresh_list(songs);
            }
        });
    }
}

function bind_events() {
    $("#songs").delegate(".up-button","click", function(e){
        song_id = $(e.currentTarget).parents("tr:first").attr("data-id");
        disable_links(song_id);
        BalleBalle.vote(1, song_id);

        up_votes = $("tr[data-id='" + song_id +"'] .votes .up-vote");
        updated_value = (parseInt(up_votes.attr("up-votes")) + 1).toString();
        up_votes.html(updated_value);
        up_votes.attr("up-votes", updated_value);
    });
    $("#songs").delegate(".down-button","click", function(e){
        song_id = $(e.currentTarget).parents("tr:first").attr("data-id");
        disable_links(song_id);
        BalleBalle.vote(-1, song_id);

        down_votes = $("tr[data-id='" + song_id +"'] .votes .down-vote");
        updated_value = (parseInt(down_votes.attr("down-votes")) - 1).toString();
        down_votes.html(updated_value);
        down_votes.attr("down-votes", updated_value);
    });
}

function refresh_list(songs) {
    $.each(songs, function (index, song) {
        rank = $("tr[data-id='" + song.id + "'] .rank");
        up_votes = $("tr[data-id='" + song.id +"'] .votes .up-vote");
        down_votes = $("tr[data-id='" + song.id +"'] .votes .down-vote");

        if(song.vote != null) {
            disable_links(song.id);
        }

        up_votes.attr("up-votes", song.up_votes);
        down_votes.attr("down-votes", song.down_votes);
        up_votes.html(song.up_votes);
        down_votes.html(song.down_votes);
        rank.html(index + 1);
        $("tr[data-id='" + song.id + "']").attr("rank", index + 1);
    });
    sort_songs();
}

function refresh_votes() {
    $.ajax({
        url: "votes",
        type: "get",
        success: function(songs) {
            refresh_list(songs);
        }
    });
}

function disable_links(song_id) {
    up_button_selector = "tr[data-id='" + song_id +"'] .vote-buttons .up .up-button";
    $(up_button_selector).replaceWith($(up_button_selector).html());

    down_button_selector = "tr[data-id='" + song_id +"'] .vote-buttons .down .down-button";
    $(down_button_selector).replaceWith($(down_button_selector).html());
}

function sort_songs() {
    $('#songs tr').tsort({attr:'rank'});
}