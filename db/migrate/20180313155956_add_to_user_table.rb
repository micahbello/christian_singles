class AddToUserTable < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :age, :integer
    add_column :users, :min_height_seek, :integer
    add_column :users, :max_height_seek, :integer
    add_column :users, :min_age_seek, :integer
    add_column :users, :max_age_seek, :integer
  end
end
