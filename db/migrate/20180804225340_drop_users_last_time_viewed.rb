class DropUsersLastTimeViewed < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :time_last_viewed
  end
end
