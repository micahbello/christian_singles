class AddLatandLongtoUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :latitude, :integer
    add_column :users, :longitude, :integer
  end
end
