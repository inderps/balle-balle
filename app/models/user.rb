class User < ActiveRecord::Base
  attr_accessible :facebook_id
  has_many :votes
end
