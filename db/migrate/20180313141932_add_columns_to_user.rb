class AddColumnsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :smoke_seek, :string
    add_column :users, :drink_seek, :string

  end
end
