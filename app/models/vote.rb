class Vote < ActiveRecord::Base
  attr_accessible :vote, :user, :song
  belongs_to :user
  belongs_to :song
end
