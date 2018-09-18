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
    #this method is called for browsing and it returns only user that
    #match desired gender, distance, and age

    users = match_gender(self.sex_seek, self.gender, self.id)
    users.select! {|user| within_distance?(user)}
    users.select! {|user| within_age?(user)}

    return users

  end

  def match_percent_and_summary(user_viewed)
    ##this is where match percentages are calculated and summary sentence crafted

    matching_points_total = 65 ##total possible points available via comparisons
    #^^(9 for gender, 9 for distance, 9 for age,
    #18 for two sided attributes, 4 for multi_select_attributes,
    #5 for relationship_seek, 1 for first date match, 6 for height, 4 for hobbies)

    if !match_gender(self.sex_seek, self.gender, self.id).include?(user_viewed) || self.id == user_viewed.id
      return ["no_percent_allowed", "This user is incompatible with you."]
    end
    #^^will return if the gender preferences do not match.

    matching_points = 9 #points earned for meeting gender preferences
    match_summary = "User meets your gender preference. "

    if within_distance?(user_viewed) == true
      matching_points += 9 #points earned for being withing distance
      match_summary = match_summary.concat("user is within your desired distance. ")
    else
      match_summary = match_summary.concat("user is NOT within your desired distance. ")
    end

    if within_age?(user_viewed) == true
      matching_points += 9 #points earned for being withing age
      match_summary = match_summary.concat("user is within your desired age range. ")
    else
      match_summary = match_summary.concat("user is NOT within your desired age range. ")
    end

    #call method to return points from height
    height_results = return_match_height(user_viewed)
    matching_points += height_results[0]
    match_summary += height_results[1]

    #arrays of "attributes" to compare through in order to make calculations
    #two_sided_attributes allow user to only pick one for himself
    two_sided_attributes = [["religion","religion_seek"], ["education", "education_seek"],
                            ["attendance", "attendance_seek"], ["have_kids", "have_kids_seek"],
                            ["want_kids", "want_kids_seek"], ["relocate", "relocate_seek"],
                            ["marital_status", "marital_status_seek"], ["drink", "drink_seek"],
                            ["smoke", "smoke_seek"]]

    #multi_select_attributes allow user to pick multiple for himself
    multi_select_attributes = [["language", "language_seek"], ["ethnicity", "ethnicity_seek"]]

    #call methods that calculate the points from two above arrays
    two_sided_attributes.each do |attribute_set|
      results = return_match_number_two_sid_attr(user_viewed, attribute_set[0], attribute_set[1])
      matching_points += results[0]
      match_summary = match_summary.concat(results[1])
    end

    multi_select_attributes.each do |attribute_set|
      results = return_match_number_multi_select(user_viewed, attribute_set[0], attribute_set[1])
      matching_points += results[0]
      match_summary = match_summary.concat(results[1])
    end

    #call method to return points from relationship_seek
    results = return_relationship_seek_match(user_viewed)
    matching_points += results[0]
    match_summary = match_summary.concat(results[1])

    #call method to return points from first_dateç
    results = return_first_date_match(user_viewed)
    matching_points += results[0]
    match_summary = match_summary.concat(results[1])


    #call method to return points from hobbies shared
    hobbies_results = return_match_number_hobbies(user_viewed)
    matching_points += hobbies_results[0]
    match_summary += hobbies_results[1]

    percent_match = (100 * matching_points) / matching_points_total
    match_summary = finalize_match_summary(match_summary, user_viewed.username, user_viewed.display_name, user_viewed.gender)

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

  def finalize_match_summary(current_summary, other_user_username, other_user_display_name, other_user_gender)

    pronoun = other_user_gender == "male" ? "he" : "she"
    possessive = other_user_gender == "male" ? "his" : "her"

    if other_user_display_name != nil && other_user_display_name.length != 0
      name = other_user_display_name
    else
      name = other_user_username
    end

    current_summary.gsub!("User", "#{name[0].upcase + name[1..-1]}") #change all "user's" with user's name
    current_summary.gsub!("user", "#{name}")
    current_summary.gsub!("#{name.capitalize}'s", "#{possessive.capitalize}")
    current_summary.gsub!("#{name}'s", "#{possessive}")

    return current_summary.split(". ").map! {|sentence| sentence[0].upcase + sentence[1..-1]}.join(". ").concat(".")


  end

  def create_user_matches_you_sentence(attribute, matched_attribute)
    if attribute == "education"
      return "user matches your prefered education level. "
    elsif attribute == "religion"
      return "Because user identifies as #{matched_attribute}, user matches your prefered religious affiliation. "
    elsif attribute == "attendance"
      return "user attends #{matched_attribute.split("")[7..-1].join("")}, as you prefer. "
    elsif attribute == "have_kids"
      return "To the question of whether user has children, user answered, `#{matched_attribute.downcase},` as you prefer. "
    elsif attribute == "want_kids"
      return "To the question of children with you, user answered `#{matched_attribute.downcase},` as you prefer. "
    elsif attribute == relocate
      return "To the question of relocating, user answered `#{matched_attribute.downcase},` as you prefer. "
    elsif attribute == "marital_status"
      return "user is #{matched_attribute.downcase}, as you prefer. "
    elsif attribute == "drink"
      return "User's drinking habit: `#{matched_attribute.downcase},` as you prefer. "
    elsif attribute == "smoke"
      return "User's smoking habit: `#{matched_attribute.downcase},` as you prefer. "
    end
  end

  def create_you_match_user_sentence(attribute, matched_attribute)
    if attribute == "education"
      return "You match user's prefered education level. "
    elsif attribute == "religion"
      return "Because you identify as #{matched_attribute}, you match user's prefered religious affiliation. "
    elsif attribute == "attendance"
      return "You #{matched_attribute.downcase}, as user prefers. "
    elsif attribute == "have_kids"
      return "To the question of whether you have children, you answered, `#{matched_attribute.downcase},` as user prefers. "
    elsif attribute == "want_kids"
      return "To the question of children with user, you answered `#{matched_attribute.downcase},` as user prefers. "
    elsif attribute == relocate
      return "To the question of relocating, you answered `#{matched_attribute.downcase},` as user prefers. "
    elsif attribute == "marital_status"
      return "You are #{matched_attribute.downcase}, as user prefers. "
    elsif attribute == "drink"
      return "Your drinking habit: `#{matched_attribute.downcase},` as user prefers. "
    elsif attribute == "smoke"
      return "Your smoking habit: `#{matched_attribute.downcase},` as user prefers. "
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

            message += "You and user are both looking for '#{attribute.downcase}.' "
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
              message += "#{attribute.downcase}. "
            else
              message = message.chars[0...-2].join("").concat(", or #{attribute.downcase}. ")
            end
            count < 1 ? count += 1 : nil
          end
        end
      end

    end

    message == "On your first date, you would both prefer " ? message = "" : nil

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
      other_user_seek_attribute.split(",").each do |attribute_name|
        current_user_attribute.split(",").each do |attribute_name_2|
          if attribute_name == attribute_name_2 && attribute == "language"
            message += "user is seeking a/an #{attribute_name} speaker and you match. "
            match = true
          elsif attribute_name == attribute_name_2 && attribute == "ethnicity"
            message += "user is seeking a/an #{attribute_name} person and you match. "
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
      other_user_attribute.split(",").each do |attribute_name|
        current_user_seek_attribute.split(",").each do |attribute_name_2|
          if attribute_name == attribute_name_2 && attribute == "language"
            message += "You are seeking a/an #{attribute_name} speaker and user matches. "
            match = true
          elsif attribute_name == attribute_name_2 && attribute_name == "ethnicity"
            message += "You are seeking a/an #{attribute_name} person and user matches. "
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
              message += "#{attribute.downcase}. "
            else
              message = message.chars[0...-2].join("").concat(", #{attribute.downcase}. ")
              count < 4 ? count += 1 : nil
            end
          end
        end
      end
    end

    if message == "You both like "
      return [count, ""]
    end

    message = message.split(",")[0...-1].concat([" and" + message.split(",")[-1]]).join(",")
    message = message == "You both like " ? "" : message

    return [count, message]
  end

  def return_match_height(other_user)
    count = 0
    message = ""

    if other_user.height == nil || self.height == nil
      return [count, message]
    end

    if other_user.height >= self.min_height_seek && other_user.height <= self.max_height_seek
      count += 3
      message += "User meets your height preference. "
    end

    if self.height >= other_user.min_height_seek && self.height <= other_user.max_height_seek
      count += 3
      message += "You meet user's height preference. "
    end

    return [count, message]

  end

end
