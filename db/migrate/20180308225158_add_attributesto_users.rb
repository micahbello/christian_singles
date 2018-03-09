class AddAttributestoUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :gender, :string
    add_column :users, :zip_code, :integer
    add_column :users, :birth_date, :date

  end
end
