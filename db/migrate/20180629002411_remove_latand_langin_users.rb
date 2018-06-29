class RemoveLatandLanginUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :latitude
    remove_column :users, :longitude
  end
end
