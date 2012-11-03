class Song < ActiveRecord::Base
  attr_accessible :title, :artist, :album, :link, :up_votes, :down_votes
  has_many :votes
end
