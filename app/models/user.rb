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
#

 # birth_date          :date
 # description         :text
 # city                :string
 # state               :string
 # last_online         :date
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



  def validate_zipcode

    geo(self.zip_code.to_s)

    unless self.zip_code.to_s.length == 5 && self.state && self.city
      errors[:base] << "Requires a valid zipcode"
    end
  end
  # #
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

  def match_with_percent

    gender_preference = self.sex_seek
    user_gender = self.gender
    curr_user_id = self.id

#GENDER
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
#GENDER^

#distance- here only the users are passed along that return true with the within_distance? method
    users.select! {|user| self.within_distance?(user)}
#distance^

#age - here only the users are passed along that are wihin the age seek of the searcher

  users.select! {|user| self.within_age?(user)}
#age  ^

    users_with_percentages = [] # this will be returned to th controller to then shoot off to the
    #jbuilder

  # iterates through each user that matches the gender preference of
  # current user in order to make up the percentage

      users.each do |user|

        pref_match_count = 1 # will tally up all the prefs that match
        pref_count = 1
        #matches the religion seek
        unless (self.religion_seek == "" || self.religion_seek == nil)
          pref_count += 1 #if the curr user DOES have a religion pref, it will count it
          unless user.religion == "" || user.religion == nil
            self.religion_seek.include?(user.religion) ? pref_match_count += 1 : nil
          end
        end

        unless (user.religion_seek == "" || user.religion_seek == nil)
          pref_count += 1 #if the curr user DOES have a religion pref, it will count it
          unless self.religion == "" || self.religion == nil
            user.religion_seek.include?(self.religion) ? pref_match_count += 1 : nil
          end
        end

        #matches education_seek
        unless (self.education_seek == "" || self.education_seek == nil)
          pref_count += 1 #if the curr user DOES have a education pref, it will count it
          unless user.education == "" || user.education == nil
            self.education_seek.include?(user.education) ? pref_match_count += 1 : nil
          end
        end

        unless (user.education_seek == "" || user.education_seek == nil)
          pref_count += 1 #if the curr user DOES have a education pref, it will count it
          unless self.education == "" || self.education == nil
            user.education_seek.include?(self.education) ? pref_match_count += 1 : nil
          end
        end

        #matches attendance_seek
        unless (self.attendance_seek == "" || self.attendance_seek == nil)
          pref_count += 1 #if the curr user DOES have a attendance pref, it will count it
          unless user.attendance == "" || user.attendance == nil
            self.attendance_seek.include?(user.attendance) ? pref_match_count += 1 : nil
          end
        end

        unless (user.attendance_seek == "" || user.attendance_seek == nil)
          pref_count += 1 #if the curr user DOES have a attendance pref, it will count it
          unless self.attendance == "" || self.attendance == nil
            user.attendance_seek.include?(self.attendance) ? pref_match_count += 1 : nil
          end
        end

        #matches have_kids_seek
        unless self.have_kids_seek == "" || self.have_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a have_kids pref, it will count it
          unless user.have_kids == "" || user.have_kids == nil
            self.have_kids_seek.include?(user.have_kids) ? pref_match_count += 1 : nil
          end
        end

        unless user.have_kids_seek == "" || user.have_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a have_kids pref, it will count it
          unless self.have_kids == "" || self.have_kids == nil
            user.have_kids_seek.include?(self.have_kids) ? pref_match_count += 1 : nil
          end
        end

        #matches want_kids_seek
        unless self.want_kids_seek == "" || self.want_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a want_kids pref, it will count it
          unless user.want_kids == "" || user.want_kids == nil
            self.want_kids_seek.include?(user.want_kids) ? pref_match_count += 1 : nil
          end
        end

        unless user.want_kids_seek == "" || user.want_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a want_kids pref, it will count it
          unless self.want_kids == "" || self.want_kids == nil
            user.want_kids_seek.include?(self.want_kids) ? pref_match_count += 1 : nil
          end
        end

        #matches want_kids_seek
        unless self.want_kids_seek == "" || self.want_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a want_kids pref, it will count it
          unless user.want_kids == "" || user.want_kids == nil
            self.want_kids_seek.include?(user.want_kids) ? pref_match_count += 1 : nil
          end
        end

        unless user.want_kids_seek == "" || user.want_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a want_kids pref, it will count it
          unless self.want_kids == "" || self.want_kids == nil
            user.want_kids_seek.include?(self.want_kids) ? pref_match_count += 1 : nil
          end
        end

        #matches want_kids_seek
        unless self.want_kids_seek == "" || self.want_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a want_kids pref, it will count it
          unless user.want_kids == "" || user.want_kids == nil
            self.want_kids_seek.include?(user.want_kids) ? pref_match_count += 1 : nil
          end
        end

        unless user.want_kids_seek == "" || user.want_kids_seek == nil
          pref_count += 1 #if the curr user DOES have a want_kids pref, it will count it
          unless self.want_kids == "" || self.want_kids == nil
            user.want_kids_seek.include?(self.want_kids) ? pref_match_count += 1 : nil
          end
        end

        #matches relocate_seek
        unless self.relocate_seek == "" || self.relocate_seek == nil
          pref_count += 1 #if the curr user DOES have a relocate pref, it will count it
          unless user.relocate == "" || user.relocate == nil
            self.relocate_seek.include?(user.relocate) ? pref_match_count += 1 : nil
          end
        end

        unless user.relocate_seek == "" || user.relocate_seek == nil
          pref_count += 1 #if the curr user DOES have a relocate pref, it will count it
          unless self.relocate == "" || self.relocate == nil
            user.relocate_seek.include?(self.relocate) ? pref_match_count += 1 : nil
          end
        end

        #matches marital_status_seek
        unless self.marital_status_seek == "" || self.marital_status_seek == nil
          pref_count += 1 #if the curr user DOES have a marital_status pref, it will count it
          unless user.marital_status == "" || user.marital_status == nil
            self.marital_status_seek.include?(user.marital_status) ? pref_match_count += 1 : nil
          end
        end

        unless user.marital_status_seek == "" || user.marital_status_seek == nil
          pref_count += 1 #if the curr user DOES have a marital_status pref, it will count it
          unless self.marital_status == "" || self.marital_status == nil
            user.marital_status_seek.include?(self.marital_status) ? pref_match_count += 1 : nil
          end
        end

        #matches smoke_seek
        unless self.smoke_seek == "" || self.smoke_seek == nil
          pref_count += 1 #if the curr user DOES have a smoke pref, it will count it
          unless user.smoke == "" || user.smoke == nil
            self.smoke_seek.include?(user.smoke) ? pref_match_count += 1 : nil
          end
        end

        unless user.smoke_seek == "" || user.smoke_seek == nil
          pref_count += 1 #if the curr user DOES have a smoke pref, it will count it
          unless self.smoke == "" || self.smoke == nil
            user.smoke_seek.include?(self.smoke) ? pref_match_count += 1 : nil
          end
        end

        #matches drink_seek
        unless self.drink_seek == "" || self.drink_seek == nil
          pref_count += 1 #if the curr user DOES have a drink pref, it will count it
          unless user.drink == "" || user.drink == nil
            self.drink_seek.include?(user.drink) ? pref_match_count += 1 : nil
          end
        end

        unless user.drink_seek == "" || user.drink_seek == nil
          pref_count += 1 #if the curr user DOES have a drink pref, it will count it
          unless self.drink == "" || self.drink == nil
            user.drink_seek.include?(self.drink) ? pref_match_count += 1 : nil
          end
        end

        #matches age_seek
        pref_count += 1 #if the curr user DOES have an age pref, it will count it
        if user.age <= self.max_age_seek && user.age >= self.min_age_seek
          pref_match_count += 1
        end

        pref_count += 1 #if the curr user DOES have an age pref, it will count it
        if self.age <= user.max_age_seek && self.age >= user.min_age_seek
          pref_match_count += 1
        end

        #matches language_seek
        unless self.language_seek == "" || self.language_seek == nil
          pref_count += 1
          unless user.language == "" || user.language == nil
            match_lang = user.language.split(",").any? { |lang| self.language.include?(lang)}
            match_lang == true ? pref_match_count += 1 : nil
          end
        end

        unless user.language_seek == "" || user.language_seek == nil
          pref_count += 1
          unless self.language == "" || self.language == nil
            match_lang = self.language.split(",").any? { |lang| user.language.include?(lang)}
            match_lang == true ? pref_match_count += 1 : nil
          end
        end

        #matches ethnicity_seek
        unless self.ethnicity_seek == "" || self.ethnicity_seek == nil
          pref_count += 1
          unless user.ethnicity == "" || user.ethnicity == nil
            match_lang = user.ethnicity.split(",").any? { |ethnicity| self.ethnicity.include?(ethnicity)}
            match_lang == true ? pref_match_count += 1 : nil
          end
        end

        unless user.ethnicity_seek == "" || user.ethnicity_seek == nil
          pref_count += 1
          unless self.ethnicity == "" || self.ethnicity == nil
            match_lang = self.ethnicity.split(",").any? { |ethnicity| user.ethnicity.include?(ethnicity)}
            match_lang == true ? pref_match_count += 1 : nil
          end
        end

        percent_match = (100 * pref_match_count) / (pref_count)
        users_with_percentages << [user.id, percent_match]
      end
    return users_with_percentages
    ##
  end ## end of match_with_percent method


#  sex_seek            :string //
#  religion_seek       :string //
#  relationship_seek   :string //   this has no way to match
#  education_seek      :string //
#  attendance_seek     :string //
#  have_kids_seek      :string //
#  want_kids_seek      :string //
#  relocate_seek       :string //
#  marital_status_seek :string //
#  language_seek       :string //
#  ethnicity_seek      :string //
#  smoke_seek          :string //
#  drink_seek          :string //
#  distance_seek       :integer   need the geocoder and the zip code verification to make this work
#  age                 :integer //
#  min_height_seek     :integer   cannot implement yet
#  max_height_seek     :integer   cannot implement yet
#  min_age_seek        :integer //
#  max_age_seek        :integer //


  def match_with_percent_individual(user_viewed)

    if (self.gender == "male" && !user_viewed.sex_seek.include?("Men")) || (self.gender == "female" && !user_viewed.sex_seek.include?("Women"))
      return "no_percent_allowed"
    elsif self.id == user_viewed.id
      return "no_percent_allowed"
    end #if this the sex preferences dont match, OR, self is the same as user_viewed, no percentage is given

    pref_match_count = 1 # will tally up all the prefs that match
    pref_count = 1

    unless (self.religion_seek == "" || self.religion_seek == nil)
      pref_count += 1 #if the curr user DOES have a religion pref, it will count it
      unless user_viewed.religion == "" || user_viewed.religion == nil
        self.religion_seek.include?(user_viewed.religion) ? pref_match_count += 1 : nil
      end
    end

    unless (user_viewed.religion_seek == "" || user_viewed.religion_seek == nil)
      pref_count += 1 #if the curr user_viewed DOES have a religion pref, it will count it
      unless self.religion == "" || self.religion == nil
        user_viewed.religion_seek.include?(self.religion) ? pref_match_count += 1 : nil
      end
    end

    #matches education_seek
    unless (self.education_seek == "" || self.education_seek == nil)
      pref_count += 1 #if the curr user_viewed DOES have a education pref, it will count it
      unless user_viewed.education == "" || user_viewed.education == nil
        self.education_seek.include?(user_viewed.education) ? pref_match_count += 1 : nil
      end
    end

    unless (user_viewed.education_seek == "" || user_viewed.education_seek == nil)
      pref_count += 1 #if the curr user_viewed DOES have a education pref, it will count it
      unless self.education == "" || self.education == nil
        user_viewed.education_seek.include?(self.education) ? pref_match_count += 1 : nil
      end
    end

    #matches attendance_seek
    unless (self.attendance_seek == "" || self.attendance_seek == nil)
      pref_count += 1 #if the curr user_viewed DOES have a attendance pref, it will count it
      unless user_viewed.attendance == "" || user_viewed.attendance == nil
        self.attendance_seek.include?(user_viewed.attendance) ? pref_match_count += 1 : nil
      end
    end

    unless (user_viewed.attendance_seek == "" || user_viewed.attendance_seek == nil)
      pref_count += 1 #if the curr user_viewed DOES have a attendance pref, it will count it
      unless self.attendance == "" || self.attendance == nil
        user_viewed.attendance_seek.include?(self.attendance) ? pref_match_count += 1 : nil
      end
    end

    #matches have_kids_seek
    unless self.have_kids_seek == "" || self.have_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a have_kids pref, it will count it
      unless user_viewed.have_kids == "" || user_viewed.have_kids == nil
        self.have_kids_seek.include?(user_viewed.have_kids) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.have_kids_seek == "" || user_viewed.have_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a have_kids pref, it will count it
      unless self.have_kids == "" || self.have_kids == nil
        user_viewed.have_kids_seek.include?(self.have_kids) ? pref_match_count += 1 : nil
      end
    end

    #matches want_kids_seek
    unless self.want_kids_seek == "" || self.want_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a want_kids pref, it will count it
      unless user_viewed.want_kids == "" || user_viewed.want_kids == nil
        self.want_kids_seek.include?(user_viewed.want_kids) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.want_kids_seek == "" || user_viewed.want_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a want_kids pref, it will count it
      unless self.want_kids == "" || self.want_kids == nil
        user_viewed.want_kids_seek.include?(self.want_kids) ? pref_match_count += 1 : nil
      end
    end

    #matches want_kids_seek
    unless self.want_kids_seek == "" || self.want_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a want_kids pref, it will count it
      unless user_viewed.want_kids == "" || user_viewed.want_kids == nil
        self.want_kids_seek.include?(user_viewed.want_kids) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.want_kids_seek == "" || user_viewed.want_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a want_kids pref, it will count it
      unless self.want_kids == "" || self.want_kids == nil
        user_viewed.want_kids_seek.include?(self.want_kids) ? pref_match_count += 1 : nil
      end
    end

    #matches want_kids_seek
    unless self.want_kids_seek == "" || self.want_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a want_kids pref, it will count it
      unless user_viewed.want_kids == "" || user_viewed.want_kids == nil
        self.want_kids_seek.include?(user_viewed.want_kids) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.want_kids_seek == "" || user_viewed.want_kids_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a want_kids pref, it will count it
      unless self.want_kids == "" || self.want_kids == nil
        user_viewed.want_kids_seek.include?(self.want_kids) ? pref_match_count += 1 : nil
      end
    end

    #matches relocate_seek
    unless self.relocate_seek == "" || self.relocate_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a relocate pref, it will count it
      unless user_viewed.relocate == "" || user_viewed.relocate == nil
        self.relocate_seek.include?(user_viewed.relocate) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.relocate_seek == "" || user_viewed.relocate_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a relocate pref, it will count it
      unless self.relocate == "" || self.relocate == nil
        user_viewed.relocate_seek.include?(self.relocate) ? pref_match_count += 1 : nil
      end
    end

    #matches marital_status_seek
    unless self.marital_status_seek == "" || self.marital_status_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a marital_status pref, it will count it
      unless user_viewed.marital_status == "" || user_viewed.marital_status == nil
        self.marital_status_seek.include?(user_viewed.marital_status) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.marital_status_seek == "" || user_viewed.marital_status_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a marital_status pref, it will count it
      unless self.marital_status == "" || self.marital_status == nil
        user_viewed.marital_status_seek.include?(self.marital_status) ? pref_match_count += 1 : nil
      end
    end

    #matches smoke_seek
    unless self.smoke_seek == "" || self.smoke_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a smoke pref, it will count it
      unless user_viewed.smoke == "" || user_viewed.smoke == nil
        self.smoke_seek.include?(user_viewed.smoke) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.smoke_seek == "" || user_viewed.smoke_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a smoke pref, it will count it
      unless self.smoke == "" || self.smoke == nil
        user_viewed.smoke_seek.include?(self.smoke) ? pref_match_count += 1 : nil
      end
    end

    #matches drink_seek
    unless self.drink_seek == "" || self.drink_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a drink pref, it will count it
      unless user_viewed.drink == "" || user_viewed.drink == nil
        self.drink_seek.include?(user_viewed.drink) ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.drink_seek == "" || user_viewed.drink_seek == nil
      pref_count += 1 #if the curr user_viewed DOES have a drink pref, it will count it
      unless self.drink == "" || self.drink == nil
        user_viewed.drink_seek.include?(self.drink) ? pref_match_count += 1 : nil
      end
    end

    #matches age_seek
    pref_count += 1 #if the curr user_viewed DOES have an age pref, it will count it
    if user_viewed.age <= self.max_age_seek && user_viewed.age >= self.min_age_seek
      pref_match_count += 1
    end

    pref_count += 1 #if the curr user_viewed DOES have an age pref, it will count it
    if self.age <= user_viewed.max_age_seek && self.age >= user_viewed.min_age_seek
      pref_match_count += 1
    end

    #matches language_seek
    unless self.language_seek == "" || self.language_seek == nil
      pref_count += 1
      unless user_viewed.language == "" || user_viewed.language == nil
        match_lang = user_viewed.language.split(",").any? { |lang| self.language.include?(lang)}
        match_lang == true ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.language_seek == "" || user_viewed.language_seek == nil
      pref_count += 1
      unless self.language == "" || self.language == nil
        match_lang = self.language.split(",").any? { |lang| user_viewed.language.include?(lang)}
        match_lang == true ? pref_match_count += 1 : nil
      end
    end

    #matches ethnicity_seek
    unless self.ethnicity_seek == "" || self.ethnicity_seek == nil
      pref_count += 1
      unless user_viewed.ethnicity == "" || user_viewed.ethnicity == nil
        match_lang = user_viewed.ethnicity.split(",").any? { |ethnicity| self.ethnicity.include?(ethnicity)}
        match_lang == true ? pref_match_count += 1 : nil
      end
    end

    unless user_viewed.ethnicity_seek == "" || user_viewed.ethnicity_seek == nil
      pref_count += 1
      unless self.ethnicity == "" || self.ethnicity == nil
        match_lang = self.ethnicity.split(",").any? { |ethnicity| user_viewed.ethnicity.include?(ethnicity)}
        match_lang == true ? pref_match_count += 1 : nil
      end
    end

    percent_match = (100 * pref_match_count) / (pref_count)
  end #end of  match_with_percent_individual method





end
