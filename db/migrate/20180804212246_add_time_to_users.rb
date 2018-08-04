class AddTimeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :time_last_viewed, :time
  end
end
