class SongsController < ApplicationController
  def index
    user = session[:user]
    songs = Song.select("songs.*, v.vote as vote").joins("left join votes v on songs.id = v.song_id and v.user_id = #{user.id}")
    songs.sort_by! {|k, v| k.up_votes - k.down_votes}.reverse!
    render :json => songs
  end
end
