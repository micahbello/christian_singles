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
#  longitude           :decimal(15, 10)
#  latitude            :decimal(15, 10)

class User < ApplicationRecord

  validates :session_token, :password_digest, :first_name, :last_name, :gender, :birth_date, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validate :validate_zipcode, on: :create

  has_attached_file :image, default_url: "user_icon.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  attr_reader :password, :geo
  attr_accessor :hello

  after_initialize :ensure_session_token

  has_many :likes,
  primary_key: :id,
  foreign_key: :liker_id,
  class_name: :Like

  has_many :views,
  primary_key: :id,
  foreign_key: :viewer_id,
  class_name: :View

  def validate_zipcode

    geo(self.zip_code.to_s)

    unless self.zip_code.to_s.length == 5 && self.state && self.city
      errors[:base] << "Requires a valid zipcode"
    end
  end

  def geo(zipcode)
    @geo =  Geokit::Geocoders::MultiGeocoder.geocode(zipcode)
    self.state = @geo.state_code
    self.city = @geo.city
    self.latitude = @geo.lat
    self.longitude = @geo.lng
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!

    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    return user if user.is_password?(password)
  end

  def is_password?(password)
    pass = BCrypt::Password.new(self.password_digest)
    pass.is_password?(password)
  end

  def change_online_status(boolean)
    self.online = boolean
  end

  def return_matched_users

    users = match_gender(self.sex_seek, self.gender, self.id)
    users.select! {|user| within_distance?(user)}
    users.select! {|user| within_age?(user)}

  end

  def match_percent_and_summary(user_viewed)

    if !match_gender(self.sex_seek, self.gender, self.id).include?(user_viewed) || self.id == user_viewed.id
      return "no_percent_allowed"
    end

    #need height

    two_sided_attributes = [["religion","religion_seek"], ["education", "education_seek"], ["attendance", "attendance_seek"],
                            ["have_kids", "have_kids_seek"], ["want_kids", "want_kids_seek"], ["relocate", "relocate_seek"],
                            ["marital_status", "marital_status_seek"], ["drink", "drink_seek"], ["smoke", "smoke_seek"]]
    multi_select_attributes = [["language", "language_seek"], ["ethnicity", "ethnicity_seek"], ["pets, pets_seek"]]

    matching_points = 9
    match_summary = "User meets your gender preference. "
    user_pronoun = user_viewed.gender == "male" ? "He" : "She"

    if within_distance?(user_viewed) == true
      matching_points += 9
      match_summary = match_summary.concat("#{user_pronoun} is within your desired distance. ")
    else
      match_summary = match_summary.concat("#{user_pronoun} is NOT within your desired distance. ")
    end

    if within_age?(user_viewed) == true
      matching_points += 9
      match_summary = match_summary.concat("#{user_pronoun} is within your desired age range. ")
    else
      match_summary = match_summary.concat("#{user_pronoun} is NOT within your desired age range. ")
    end

    matching_points_total = 27 + 18 + 6 + 5 + 4 + 1#27 for gender, distance, age, 18 for two sided, 6 for multi selct, 5 for relationship_seek, 4 for hobbies, 1 for first date match

    two_sided_attributes.each do |attribute_set|
      results = return_match_number_two_sid_attr(user_viewed, attribute_set[0], attribute_set[1])
      matching_points += results[0]
      match_summary = match_summary.concat(results[1])
    end

    results = return_relationship_seek_match(user_viewed)
    matching_points += results[0]
    match_summary = match_summary.concat(results[1])

    results = return_first_date_match(user_viewed)
    matching_points += results[0]
    match_summary = match_summary.concat(results[1])

    multi_select_attributes.each do |attribute_set|
      results = return_match_number_multi_select(user_viewed, attribute_set[0], attribute_set[1])
      matching_points += results[0]
      match_summary = match_summary.concat(results[1])
    end

    hobbies_results = return_match_number_hobbies(user_viewed)
    matching_points += hobbies_results[0]
    match_summary += hobbies_results[1]

    percent_match = (100 * matching_points) / matching_points_total

    return [percent_match, match_summary]

  end

  def calculate_distance(other_user)
    curr_user_long = self.longitude.to_f
    curr_user_lat =  self.latitude.to_f
    other_user_long = other_user.longitude.to_f
    other_user_lat = other_user.latitude.to_f

    distance_between_users = Geocoder::Calculations.distance_between([curr_user_lat, curr_user_long], [other_user_lat, other_user_long])
  end

private

  def within_distance?(other_user)

    distance_between_users = self.calculate_distance(other_user)

    curr_user_distance_seek = self.distance_seek
    other_user_distance_seek = other_user.distance_seek

    if curr_user_distance_seek == 500 && other_user_distance_seek == 500 #if both users have a distance_seek of 500, all is game
      return true
    elsif distance_between_users <= curr_user_distance_seek && distance_between_users <= other_user_distance_seek
      # as long as the distance_seek of each user is less than or equal to the distance between the two users, all is game
      return true
    else
      return false
    end
  end

  def within_age?(other_user)
    #refactor this to account for people older than 75
    if self.age <= other_user.max_age_seek && self.age >= other_user.min_age_seek
      if other_user.age <= self.max_age_seek && other_user.age >= self.min_age_seek
        return true
      end
    end

    return false
  end

  def match_gender(gender_preference, user_gender, curr_user_id)

    if user_gender == "female"
      if gender_preference == "Men,Women" || gender_preference == "Women,Men" #if searcher is female and bi, she should get back all bis and lesbians
        users = User.find_by_sql(
          "
          SELECT * FROM users
          WHERE id != '#{curr_user_id}'
          AND ((sex_seek = 'Men,Women') OR (sex_seek = 'Women,Men'))

          OR ((gender = 'female') AND (sex_seek = 'Women'))
          "
        )
      elsif gender_preference == "Women" #if searcher is female and lesbian, she should get back only lesbians and women who are bi
        users = User.find_by_sql(
          "
          SELECT * FROM users
          WHERE id != '#{curr_user_id}'
          AND gender = 'female'

          AND ((sex_seek = 'Women') OR (sex_seek = 'Men,Women') OR (sex_seek = 'Women,Men'))
          "
        )
      elsif gender_preference == "Men" #if searcher is female and straight, she should get back all straight males
        users = User.find_by_sql(
          "
          SELECT * FROM users
          WHERE gender = 'male'
          AND sex_seek = 'Women'
          "
        )
      end
    elsif user_gender == "male"
      if gender_preference == "Men,Women" || gender_preference == "Women,Men" #if searcher is male and bi, he should get back all bis and homosexuals
        users = User.find_by_sql(
          "
          SELECT * FROM users
          WHERE id != '#{curr_user_id}'
          AND ((sex_seek = 'Men,Women') OR (sex_seek = 'Women,Men'))

          OR ((gender = 'male') AND (sex_seek = 'Men'))
          "
        )
      elsif gender_preference == "Men" #if searcher is male and homosexual, he should get back only homosexual and men who are bi
        users = User.find_by_sql(
          "
          SELECT * FROM users
          WHERE id != '#{curr_user_id}'
          AND gender = 'male'

          AND ((sex_seek = 'Men') OR (sex_seek = 'Men,Women') OR (sex_seek = 'Women,Men'))
          "
        )
      elsif gender_preference == "Women" #if searcher is male and homosexual, he should get back only straight women
        users = User.find_by_sql(
          "
          SELECT * FROM users
          WHERE gender = 'female'
          AND sex_seek = 'Men'
          "
        )
      end
    end
    return users
  end

  def return_match_number_two_sid_attr(other_user, attribute, attribute_seek)

    other_user_attribute = other_user[attribute]
    current_user_attribute = self[attribute]

    other_user_seek_attribute = other_user[attribute_seek]
    current_user_seek_attribute = self[attribute_seek]

    count = 0
    message = ""

    unless current_user_seek_attribute == "" || current_user_seek_attribute == nil || other_user_attribute == "" || other_user_attribute == nil
      if current_user_seek_attribute.include?(other_user_attribute)
        count =+ 1
        message += create_user_matches_you_sentence(attribute, other_user_attribute)
      end
    end


    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_attribute == "" || current_user_attribute == nil
      if other_user_seek_attribute.include?(current_user_attribute)
        count =+ 1
        message += create_you_match_user_sentence(attribute, other_user_attribute)
      end
    end

    return [count, message]

  end

  def create_user_matches_you_sentence(attribute, matched_attribute)
    if attribute == "education"
      return "User matches your prefered education level. "
    else
      return ""
    end
  end

  def create_you_match_user_sentence(attribute, matched_attribute)
    if attribute == "education"
      return "You match user's prefered education level. "
    elsif attribute == "religion"
      return "Because you identify as #{matched_attribute} you match user's prefered religious affiliation. "
    else
      return ""
    end
  end

  def return_relationship_seek_match(other_user)

    other_user_seek_attribute = other_user["relationship_seek"]
    current_user_seek_attribute = self["relationship_seek"]

    count = 0
    message = ""

    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_seek_attribute == "" || current_user_seek_attribute == nil
      other_user_seek_attribute.split(",").each do |attribute|
        current_user_seek_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2
            message += "You and user are both looking for #{attribute}. "
            count < 5 ? count += 5 : nil
          end
        end
      end

    end

    return [count, message]
  end

  def return_first_date_match(user_viewed)
    other_user_seek_attribute = user_viewed["first_date"]
    current_user_seek_attribute = self["first_date"]

    count = 0
    message = "On your first date, you would both prefer "

    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_seek_attribute == "" || current_user_seek_attribute == nil
      other_user_seek_attribute.split(",").each do |attribute|
        current_user_seek_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2

            if message == "On your first date, you would both prefer "
              message += "#{attribute}. "
            else
              message = message.chars[0...-2].join("").concat(", or #{attribute}. ")
            end
            count < 1 ? count += 1 : nil
          end
        end
      end

    end

    return [count, message]
  end
  #
  def return_match_number_multi_select(other_user, attribute, attribute_seek)
    other_user_attribute = other_user[attribute]
    current_user_attribute = self[attribute]

    other_user_seek_attribute = other_user[attribute_seek]
    current_user_seek_attribute = self[attribute_seek]

    count = 0
    match = false
    message = ""

    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_attribute == "" || current_user_attribute == nil
      other_user_seek_attribute.split(",").each do |attribute|
        current_user_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2
            message += "User is seeking #{attribute} and you match. "
            match = true
          end
        end
      end

      if match == true
        count += 1
        match = false
      end

    end

    unless other_user_attribute == "" || other_user_attribute == nil || current_user_seek_attribute == "" || current_user_seek_attribute == nil
      other_user_attribute.split(",").each do |attribute|
        current_user_seek_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2
            message += "You are seeking #{attribute} and user matches. "
            match = true
          end
        end
      end

      if match == true
        count += 1
        match = false
      end

    end

    return [count, message]
  end
  #
  def return_match_number_hobbies(other_user)
    count = 0
    message = "You both like "
    unless other_user["hobbies"] == "" || other_user["hobbies"] == nil || self["hobbies"]== "" || self["hobbies"] == nil
      other_user["hobbies"].split(",").each do |attribute|
        self["hobbies"].split(",").each do |attribute_2|
          if attribute == attribute_2
            if message == "You both like "
              message += "#{attribute}. "
            else
              message = message.chars[0...-2].join("").concat(", #{attribute}. ")
              count < 4 ? count += 1 : nil
            end
          end
        end
      end
    end

    return [count, message]
  end
#
end
