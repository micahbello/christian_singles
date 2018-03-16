# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180316003216) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "session_token"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "gender"
    t.integer "zip_code"
    t.date "birth_date"
    t.text "description"
    t.string "city"
    t.string "state"
    t.date "last_online"
    t.integer "height"
    t.string "want_kids"
    t.string "have_kids"
    t.string "marital_status"
    t.string "relocate"
    t.string "religion"
    t.string "attendance"
    t.string "occupation"
    t.string "education"
    t.string "place_as_child"
    t.string "ethnicity"
    t.string "language"
    t.string "pets"
    t.string "smoke"
    t.string "drink"
    t.string "hobbies"
    t.string "first_date"
    t.string "sex_seek"
    t.string "religion_seek"
    t.string "relationship_seek"
    t.string "education_seek"
    t.string "attendance_seek"
    t.string "have_kids_seek"
    t.string "want_kids_seek"
    t.string "relocate_seek"
    t.string "marital_status_seek"
    t.string "language_seek"
    t.string "ethnicity_seek"
    t.string "display_name"
    t.string "smoke_seek"
    t.string "drink_seek"
    t.integer "distance_seek"
    t.integer "age"
    t.integer "min_height_seek"
    t.integer "max_height_seek"
    t.integer "min_age_seek"
    t.integer "max_age_seek"
    t.boolean "online"
  end

end
