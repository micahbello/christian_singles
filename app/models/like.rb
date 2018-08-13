# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  liker_id   :integer
#  liked_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord

  validates :liker_id, presence: true
  validates :liked_id, presence: true

  belongs_to :liker,
  primary_key: :id,
  foreign_key: :liker_id,
  class_name: :User

  belongs_to :liked,
  primary_key: :id,
  foreign_key: :liked_id,
  class_name: :User



  def self.list_likes_ids(user)
    list_of_likes = []
    user.likes.each do |like|
      list_of_likes << like.liked_id
    end
    return list_of_likes
  end

  def self.list_mutual_likes_ids(user)
    list_of_mutual_likes = []

    user.likes.each do |like|
      liked_user = User.find(like.liked_id)
      if Like.list_likes_ids(liked_user).include?(user.id)
        list_of_mutual_likes << like.liked_id
      end
    end

    return list_of_mutual_likes
  end

  def self.list_like_profiles(user)
    like_profiles = []
    user_likes = user.likes

    user_likes.each do |like|
      liked_user = User.find(like.liked_id)
      #for mutual likes
      if Like.list_likes_ids(liked_user).include?(user.id)
        like_profiles.unshift({id: liked_user.id, display_name:liked_user.display_name, username: liked_user.username, age: liked_user.age, city: liked_user.city,
          state: liked_user.state, image: liked_user.image, mutual: true, created_at: Like.find_by(liked_id: liked_user.id).created_at.to_f * 1000})
      else
        #for nonmutual likes
        like_profiles.unshift({id: liked_user.id, display_name:liked_user.display_name, username: liked_user.username, age: liked_user.age, city: liked_user.city,
          state: liked_user.state, image: liked_user.image, mutual: false, created_at: Like.find_by(liked_id: liked_user.id).created_at.to_f * 1000})
      end
    end

    return  like_profiles
  end

end
