# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string
#  session_token       :string
#  password_digest     :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  first_name          :string
#  last_name           :string
#  gender              :string
#  zip_code            :integer
#  birth_date          :date
#  description         :text
#  city                :string
#  state               :string
#  last_online         :date
#  height              :integer
#  want_kids           :string
#  have_kids           :string
#  marital_status      :string
#  relocate            :string
#  religion            :string
#  attendance          :string
#  occupation          :string
#  education           :string
#  place_as_child      :string
#  ethnicity           :string
#  language            :string
#  pets                :string
#  smoke               :string
#  drink               :string
#  hobbies             :string
#  first_date          :string
#  sex_seek            :string
#  religion_seek       :string
#  relationship_seek   :string
#  education_seek      :string
#  attendance_seek     :string
#  have_kids_seek      :string
#  want_kids_seek      :string
#  relocate_seek       :string
#  marital_status_seek :string
#  language_seek       :string
#  ethnicity_seek      :string
#  display_name        :string
#  smoke_seek          :string
#  drink_seek          :string
#  distance_seek       :integer
#  age                 :integer
#  min_height_seek     :integer
#  max_height_seek     :integer
#  min_age_seek        :integer
#  max_age_seek        :integer
#  online              :boolean
#  image_file_name     :string
#  image_content_type  :string
#  image_file_size     :integer
#  image_updated_at    :datetime
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
