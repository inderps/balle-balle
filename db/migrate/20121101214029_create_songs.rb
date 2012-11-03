class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :album
      t.string :link
      t.integer :up_votes, :default => 0
      t.integer :down_votes, :default => 0
      t.timestamps
    end
  end
end
