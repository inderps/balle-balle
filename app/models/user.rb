class User < ActiveRecord::Base
  attr_accessible :facebook_id, :token
  has_many :votes
end
