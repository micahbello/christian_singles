class DropViewsTable < ActiveRecord::Migration[5.1]
  def change
    drop_table :views
  end
end
