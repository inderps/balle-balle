class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :vote
      t.references :user
      t.references :song
      t.timestamps
    end
  end
end
