class AddDistanceToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :distance_seek, :integer
  end
end
