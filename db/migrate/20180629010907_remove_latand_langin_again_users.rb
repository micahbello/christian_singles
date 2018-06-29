class RemoveLatandLanginAgainUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :longitude
    remove_column :users, :latitude
  end
end
