class AddLongandLatAgainToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :longitude, :decimal, :precision => 15, :scale => 10
    add_column :users, :latitude, :decimal, :precision => 15, :scale => 10
  end
end
