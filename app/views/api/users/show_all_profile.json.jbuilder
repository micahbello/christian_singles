# json.extract! @user, :id, :username, :first_name, :last_name,
# :gender, :zip_code, :birth_date, :description, :city, :state,
# :last_online, :height, :want_kids, :have_kids, :marital_status,
# :relocate, :religion, :attendance, :occupation, :education,
# :place_as_child, :ethnicity, :language, :pets, :smoke, :drink,
# :hobbies, :first_date, :sex_seek, :religion_seek, :relationship_seek,
# :education_seek, :attendance_seek, :have_kids_seek, :want_kids_seek,
# :relocate_seek, :marital_status_seek, :language_seek, :ethnicity_seek,
# :display_name, :smoke_seek, :drink_seek, :distance_seek, :age, :min_age_seek,
# :max_age_seek, :min_height_seek, :max_height_seek, :online, :image


    json.id @user.id
    json.display_name @user.display_name
    json.username @user.username
    json.first_name @user.first_name
    json.last_name @user.last_name
    json.gender @user.gender
    json.zip_code @user.zip_code
    json.birth_date @user.birth_date
    json.description @user.description
    json.city @user.city
    json.state @user.state
    json.last_online @user.last_online
    json.height @user.height
    json.want_kids @user.want_kids
    json.have_kids @user.have_kids
    json.marital_status @user.marital_status
    json.relocate @user.relocate
    json.religion @user.religion
    json.attendance @user.attendance
    json.occupation @user.occupation
    json.education @user.education
    json.place_as_child @user.place_as_child
    json.ethnicity @user.ethnicity
    json.language @user.language
    json.pets @user.pets
    json.smoke @user.smoke
    json.drink @user.drink
    json.hobbies @user.hobbies
    json.first_date @user.first_date
    json.sex_seek @user.sex_seek
    json.religion_seek @user.religion_seek
    json.relationship_seek @user.relationship_seek
    json.education_seek @user.education_seek
    json.attendance_seek @user.attendance_seek
    json.have_kids_seek @user.have_kids_seek
    json.want_kids_seek @user.want_kids_seek
    json.relocate_seek @user.relocate_seek
    json.marital_status_seek @user.marital_status_seek
    json.language_seek @user.language_seek
    json.ethnicity_seek @user.ethnicity_seek
    json.smoke_seek @user.smoke_seek
    json.drink_seek @user.drink_seek
    json.distance_seek @user.distance_seek
    json.age @user.age
    json.min_age_seek @user.min_age_seek
    json.max_age_seek @user.max_age_seek
    json.min_height_seek @user.min_height_seek
    json.max_height_seek @user.max_height_seek
    json.online @user.online
    json.image asset_path(@user.image)
    json.match_percentage @match_percentage
