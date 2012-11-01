class Song < ActiveRecord::Base
  attr_accessible :title, :artist, :album, :link
end
