class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authorize

  def authorize
    return if session[:user]
    render "home/authorize" and return if redirect?
  end

  private
  def redirect?
    return true if params[:signed_request].nil?
    signed_request = decode_data(params[:signed_request])
    return true if signed_request["user_id"].nil?
    session[:facebook_id] = signed_request["user_id"]
    session[:user] = User.find_or_create_by_facebook_id(signed_request["user_id"])
    session[:oauth_token] = signed_request["oauth_token"]
    return false
  end

  def base64_url_decode str
    encoded_str = str.gsub('-','+').gsub('_','/')
    encoded_str += '=' while !(encoded_str.size % 4).zero?
    Base64.decode64(encoded_str)
  end

  def decode_data str
    encoded_sig, payload = str.split('.')
    data = ActiveSupport::JSON.decode base64_url_decode(payload)
  end
end
