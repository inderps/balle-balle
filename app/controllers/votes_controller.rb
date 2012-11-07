class VotesController < ApplicationController
  def create
    song = Song.find(params[:song_id])
    user = session[:user]
    vote = params[:vote].to_i
    if Vote.find_by_user_id_and_song_id(user.id, song.id).nil?
        Vote.create(:vote => vote, :user => user, :song => song)
        song.up_votes = 1 if vote == 1
        song.down_votes = 1 if vote == -1
        song.save
        begin
          make_wall_post(song)
        rescue
          render and return :json => {:errors => ["failed to post on wall"]}, :status => :bad_request
        end
    end
    songs = songs_with_votes
    render :json => songs
  end

  def index
    songs = songs_with_votes
    render :json => songs
  end

  def songs_with_votes
    user = session[:user]
    songs = Song.select("songs.id, songs.up_votes, songs.down_votes, v.vote as vote").joins("left join votes v on songs.id = v.song_id and v.user_id = #{user.id}")
    songs.sort_by! { |k, v| k.up_votes - k.down_votes }.reverse!
    songs
  end

  private
  def make_wall_post(song)
    if params[:vote].to_i == 1
      message = "Just now voted for song '#{song.title}' via Balle-Balle"
      Feed.create(:_facebook_id => session[:facebook_id], :access_token => session[:oauth_token], :message => message, :link => song.link, :actions => [{:name => "Balle Balle", :link => "http://apps.facebook.com/balle-balle"}].to_json)
    end
  end
end
