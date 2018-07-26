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

  def list_likes_ids
    list_of_likes = []
    self.likes.each do |like|
      list_of_likes << like.liked_id
    end
    return list_of_likes
  end

  def list_like_profiles
    like_profiles = []
    user_likes = self.likes

    user_likes.each do |like|
      liked_user = User.find(like.liked_id)
      #for mutual likes
      if liked_user.list_likes_ids.include?(self.id)
        like_profiles << {id: liked_user.id, display_name:liked_user.display_name, username: liked_user.username, age: liked_user.age, city: liked_user.city,
          state: liked_user.state, image: liked_user.image, mutual: true}
      else
        #for nonmutual likes
        like_profiles << {id: liked_user.id, display_name:liked_user.display_name, username: liked_user.username, age: liked_user.age, city: liked_user.city,
          state: liked_user.state, image: liked_user.image, mutual: false}
      end
    end

    return  like_profiles
  end

  #write a check if like exists bc it lags on the local version

  def check_if_view_exists(viewed_id_to_check)

    views = self.views

    views.each do |view|
      if view.viewed_id == viewed_id_to_check.to_i
        return true
      end
    end
    return false
  end

  def list_viewed_profiles
    viewed_profiles = []

    profiles = self.views

    profiles.each do |view|

      viewed_user = User.find(view.viewed_id)

      viewed_profiles << {id: viewed_user.id, display_name:viewed_user.display_name, username: viewed_user.username, age: viewed_user.age, city: viewed_user.city,
        state: viewed_user.state, image: viewed_user.image}
    end

    return viewed_profiles

  end

  def list_users_that_viewed_me
    profiles_that_viewed_me = []

    profiles = View.where(viewed_id: self.id)
    
    profiles.each do |view|
      viewer = User.find(view.viewer_id)

      profiles_that_viewed_me << {id: viewer.id, display_name:viewer.display_name, username: viewer.username, age: viewer.age, city: viewer.city,
        state: viewer.state, image: viewer.image}
    end

    return profiles_that_viewed_me
  end

  def match_with_percent

  two_sided_attributes = [["religion","religion_seek"], ["education", "education_seek"], ["attendance", "attendance_seek"],
                          ["have_kids", "have_kids_seek"], ["want_kids", "want_kids_seek"], ["relocate", "relocate_seek"],
                          ["marital_status", "marital_status_seek"], ["drink", "drink_seek"], ["smoke", "smoke_seek"]]
  one_sided_attributes = ["relationship_seek"]
  multi_select_attributes = [["language", "language_seek"], ["ethnicity", "ethnicity_seek"]]
  #height is currently not being taken into account
  #first date not currently taken into account

  users_with_percentages = []

  users = match_gender(self.sex_seek, self.gender, self.id)
  users.select! {|user| within_distance?(user)}
  users.select! {|user| within_age?(user)}

    users.each do |user|

      matching_points = 15
      two_sided_attributes.each do |attribute_set|
        matching_points += return_match_number_two_sid_attr(user, attribute_set[0], attribute_set[1])
      end

      one_sided_attributes.each do |attribute|
        matching_points += return_match_number_one_sid_attr(user, attribute)
      end

      multi_select_attributes.each do |attribute_set|
          matching_points += return_match_number_multi_select(user, attribute_set[0], attribute_set[1])
      end

      matching_points += return_match_number_hobbies(user)

      ## for total points
      user.relationship_seek == nil ? user.relationship_seek = "" : nil
      self.relationship_seek == nil ? self.relationship_seek = "" : nil
      user.hobbies == nil ? user.hobbies = "" : nil
      self.hobbies == nil ? self.hobbies = "" : nil

      matching_points_total = 15 + (two_sided_attributes.length * 2) + (user.relationship_seek.split(",").length + self.relationship_seek.split(",").length + 2 + self.hobbies.split(",").length + user.hobbies.split(",").length)

      percent_match = (100 * matching_points) / matching_points_total
      users_with_percentages << [user.id, percent_match]
    end

    return users_with_percentages
  end

  def match_with_percent_individual(user_viewed)

    if !match_gender(self.sex_seek, self.gender, self.id).include?(user_viewed) || self.id == user_viewed.id
      return "no_percent_allowed"
    end

    two_sided_attributes = [["religion","religion_seek"], ["education", "education_seek"], ["attendance", "attendance_seek"],
                            ["have_kids", "have_kids_seek"], ["want_kids", "want_kids_seek"], ["relocate", "relocate_seek"],
                            ["marital_status", "marital_status_seek"], ["drink", "drink_seek"], ["smoke", "smoke_seek"]]
    one_sided_attributes = ["relationship_seek"]
    multi_select_attributes = [["language", "language_seek"], ["ethnicity", "ethnicity_seek"]]

    matching_points = 5


    within_distance?(user_viewed) == true ? matching_points += 5 : nil
    within_age?(user_viewed) == true ? matching_points += 5 : nil


    two_sided_attributes.each do |attribute_set|
      matching_points += return_match_number_two_sid_attr(user_viewed, attribute_set[0], attribute_set[1])
    end

    one_sided_attributes.each do |attribute|
      matching_points += return_match_number_one_sid_attr(user_viewed, attribute)
    end

    multi_select_attributes.each do |attribute_set|
        matching_points += return_match_number_multi_select(user_viewed, attribute_set[0], attribute_set[1])
    end

    matching_points += return_match_number_hobbies(user_viewed)

    ## for total points
    user_viewed.relationship_seek == nil ? user_viewed.relationship_seek = "" : nil
    self.relationship_seek == nil ? self.relationship_seek = "" : nil
    user_viewed.hobbies == nil ? user_viewed.hobbies = "" : nil
    self.hobbies == nil ? self.hobbies = "" : nil

    matching_points_total = 15 + (two_sided_attributes.length * 2) + (user_viewed.relationship_seek.split(",").length + self.relationship_seek.split(",").length + 2 + self.hobbies.split(",").length + user_viewed.hobbies.split(",").length)

    percent_match = (100 * matching_points) / matching_points_total

    return percent_match

  end

private

  def within_distance?(other_user)
    # curr_user_coords = Geocoder.coordinates(self.zip_code)
    # other_user_coords = Geocoder.coordinates(other_user.zip_code)

    # distance_between_users = Geocoder::Calculations.distance_between(curr_user_coords, other_user_coords)
    #
    curr_user_long = self.longitude.to_f
    curr_user_lat =  self.latitude.to_f
    other_user_long = other_user.longitude.to_f
    other_user_lat = other_user.latitude.to_f

    distance_between_users = Geocoder::Calculations.distance_between([curr_user_lat, curr_user_long], [other_user_lat, other_user_long])

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

    unless current_user_seek_attribute == "" || current_user_seek_attribute == nil || other_user_attribute == "" || other_user_attribute == nil
      if current_user_seek_attribute.include?(other_user_attribute)
        count =+ 1
      end
    end


    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_attribute == "" || current_user_attribute == nil
      if other_user_seek_attribute.include?(current_user_attribute)
        count =+ 1
      end
    end

    return count
  end

  def return_match_number_one_sid_attr(other_user, attribute_seek)

    other_user_seek_attribute = other_user[attribute_seek]
    current_user_seek_attribute = self[attribute_seek]

    count = 0

    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_seek_attribute == "" || current_user_seek_attribute == nil
      other_user_seek_attribute.split(",").each do |attribute|
        current_user_seek_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2
            count =+ 1
            break
          end
        end
      end
    end

    return count
  end

  def return_match_number_multi_select(other_user, attribute, attribute_seek)
    other_user_attribute = other_user[attribute]
    current_user_attribute = self[attribute]

    other_user_seek_attribute = other_user[attribute_seek]
    current_user_seek_attribute = self[attribute_seek]

    count = 0

    unless current_user_seek_attribute == "" || current_user_seek_attribute == nil || other_user_attribute == "" || other_user_attribute == nil
      other_user_seek_attribute.split(",").each do |attribute|
        current_user_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2
            count =+ 1
            break
          end
        end
      end
    end

    unless other_user_seek_attribute == "" || other_user_seek_attribute == nil || current_user_attribute == "" || current_user_attribute == nil
      other_user_attribute.split(",").each do |attribute|
        current_user_seek_attribute.split(",").each do |attribute_2|
          if attribute == attribute_2
            count =+ 1
            break
          end
        end
      end
    end

    return count
  end

  def return_match_number_hobbies(other_user)
    count = 0

    unless other_user["hobbies"] == "" || other_user["hobbies"] == nil || self["hobbies"]== "" || self["hobbies"] == nil
      other_user["hobbies"].split(",").each do |attribute|
        self["hobbies"].split(",").each do |attribute_2|
          if attribute == attribute_2
            count =+ 1
          end
        end
      end
    end

    return count
  end
#
end
