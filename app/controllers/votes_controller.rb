class VotesController < ApplicationController
  def create
    song = Song.find(params[:song_id])
    user = session[:user]
    if Vote.find_by_user_id_and_song_id(user.id, song.id).nil?
        Vote.create(:vote => params[:vote].to_i, :user => user, :song => song)
        begin
          make_wall_post(song)
        rescue
          render :json => {:errors => ["failed to post on wall"]}, :status => :bad_request
        end
    end
    render :nothing => true
  end

  private
  def make_wall_post(song)
    vote_status = params[:vote].to_i == 1 ? "up" : "down"
    message = "Just now voted #{vote_status} song '#{song.title}'"
    Feed.create(:_facebook_id => session[:facebook_id], :access_token => session[:oauth_token], :message => message, :link => "http://www.facebook.com/pages/Fresh-tomatoes/366788990075001")
  end
end
