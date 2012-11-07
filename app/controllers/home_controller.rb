class HomeController < ApplicationController
  def index
  end

  def test
    Song.create(:title => "Ishq Wala Love1", :artist => "Diljit1", :album => "Student of the Year1", :link => "http://www.youtube.com/watch?v=ioWkx6WRH2I")
    Song.create(:title => "Ishq Wala Love2", :artist => "Diljit2", :album => "Student of the Year2", :link => "http://www.youtube.com/watch?v=ioWkx6WRH2I")
    Song.create(:title => "Ishq Wala Love3", :artist => "Diljit3", :album => "Student of the Year3", :link => "http://www.youtube.com/watch?v=ioWkx6WRH2I")
    Song.create(:title => "Ishq Wala Love4", :artist => "Diljit4", :album => "Student of the Year4", :link => "http://www.youtube.com/watch?v=ioWkx6WRH2I")
    Song.create(:title => "Ishq Wala Love5", :artist => "Diljit5", :album => "Student of the Year5", :link => "http://www.youtube.com/watch?v=ioWkx6WRH2I")
  end

  def  users
    users = User.all
    render :json => users
  end
end
