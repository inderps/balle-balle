class Feed
  include Her::Model
  uses_api $facebook
  collection_path "/:facebook_id/feed"
end