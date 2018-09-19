# == Schema Information
#
# Table name: views
#
#  id               :integer          not null, primary key
#  viewer_id        :integer
#  viewed_id        :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  time_last_viewed :datetime
#

class View < ApplicationRecord

  validates :viewer_id, presence: true
  validates :viewed_id, presence: true

  belongs_to :viewer,
  primary_key: :id,
  foreign_key: :viewer_id,
  class_name: :User

  belongs_to :viewed,
  primary_key: :id,
  foreign_key: :viewed_id,
  class_name: :User



    def self.check_if_view_exists(viewed_id_to_check, user)

      views = user.views

      views.each do |view|
        if view.viewed_id == viewed_id_to_check.to_i
          return true
        end
      end
      return false
    end

    def self.list_viewed_profiles(user)
      viewed_profiles = []

      profiles = user.views

      profiles.each do |view|

        viewed_user = User.find(view.viewed_id)

        viewed_profiles.unshift({id: viewed_user.id, display_name:viewed_user.display_name, username: viewed_user.username, age: viewed_user.age, city: viewed_user.city,
          state: viewed_user.state, image: viewed_user.image, time_last_viewed: View.find(view.id).time_last_viewed.to_f * 1000})
      end

      return View.order_profiles(viewed_profiles)

    end

    def self.list_users_that_viewed_me(user)
      profiles_that_viewed_me = []

      profiles = View.where(viewed_id: user.id)


      profiles.each do |view|
        viewer = User.find(view.viewer_id)

        profiles_that_viewed_me.unshift({id: viewer.id, display_name:viewer.display_name, username: viewer.username, age: viewer.age, city: viewer.city,
        state: viewer.state, image: viewer.image, time_last_viewed: View.find(view.id).time_last_viewed.to_f * 1000})
      end

      return View.order_profiles(profiles_that_viewed_me)
    end

    def self.order_profiles(profiles)
      #this will use quicsort

      if profiles.length <= 1
        return profiles
      end

      pivot = profiles[0]
      left = []
      right = []

      profiles[1..-1].each do |profile|
        if profile[:time_last_viewed] >= pivot[:time_last_viewed]
          left.push(profile)
        else
          right.push(profile)
        end
      end

      return View.order_profiles(left) + [pivot] + View.order_profiles(right)

    end



end
