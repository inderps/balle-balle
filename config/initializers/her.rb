$facebook = Her::API.new
$facebook.setup :url => "https://graph.facebook.com/" do |connection|
  #connection.use ErrorHandler
  #connection.use TokenAuthentication, :token => CANVAS_CONFIG[:access_token]
  #connection.use JsonAccept
  connection.use Faraday::Request::UrlEncoded
  connection.use Her::Middleware::DefaultParseJSON
  connection.use Faraday::Response::Logger
  connection.use Faraday::Adapter::NetHttp
end