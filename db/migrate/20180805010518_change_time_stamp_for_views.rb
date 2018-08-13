class ChangeTimeStampForViews < ActiveRecord::Migration[5.1]
  def change
    remove_column :views, :time_last_viewed
    add_column :views, :time_last_viewed, :datetime
  end
end
