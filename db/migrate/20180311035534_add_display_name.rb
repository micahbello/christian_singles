class AddDisplayName < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :display_name, :string
  end
end
