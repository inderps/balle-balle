class Song < ActiveRecord::Base
  attr_accessible :title, :artist, :album, :link
  has_many :votes
end
