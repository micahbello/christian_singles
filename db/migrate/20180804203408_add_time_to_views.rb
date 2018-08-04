class AddTimeToViews < ActiveRecord::Migration[5.1]
  def change
    add_column :views, :time_last_viewed, :time
  end
end
