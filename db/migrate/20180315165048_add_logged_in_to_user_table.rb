class AddLoggedInToUserTable < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :online, :boolean
  end
end
