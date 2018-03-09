class AddMoreUserInfo < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :description, :text
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :last_online, :date
    add_column :users, :height, :integer
    add_column :users, :want_kids, :string
    add_column :users, :have_kids, :string
    add_column :users, :marital_status, :string
    add_column :users, :relocate, :string
    add_column :users, :religion, :string
    add_column :users, :attendance, :string
    add_column :users, :occupation, :string
    add_column :users, :education, :string
    add_column :users, :place_as_child, :string
    add_column :users, :ethnicity, :string
    add_column :users, :language, :string
    add_column :users, :pets, :string
    add_column :users, :smoke, :string
    add_column :users, :drink, :string
    add_column :users, :hobbies, :string
    add_column :users, :first_date, :string
    add_column :users, :sex_seek, :string
    add_column :users, :religion_seek, :string
    add_column :users, :relationship_seek, :string
    add_column :users, :education_seek, :string
    add_column :users, :attendance_seek, :string
    add_column :users, :have_kids_seek, :string
    add_column :users, :want_kids_seek, :string
    add_column :users, :relocate_seek, :string
    add_column :users, :marital_status_seek, :string
    add_column :users, :language_seek, :string
    add_column :users, :ethnicity_seek, :string
  end
end
