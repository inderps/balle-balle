class SongsController < ApplicationController
  skip_before_filter :authorize
  
  def index
    user = session[:user]
    songs = Song.select("songs.*, v.vote as vote").joins("left join votes v on songs.id = v.song_id and v.user_id = #{user.id}")
    songs.sort_by! {|k, v| k.up_votes - k.down_votes}.reverse!
    render :json => songs
  end

  def create
    song = Song.create(:title => params[:title], :artist => params[:artist], :album => params[:album], :link => params[:link])
    render :json => song
  end
end
