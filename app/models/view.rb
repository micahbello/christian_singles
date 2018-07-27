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
          state: viewed_user.state, image: viewed_user.image})
      end

      return viewed_profiles

    end

    def self.list_users_that_viewed_me(user)
      profiles_that_viewed_me = []

      profiles = View.where(viewed_id: user.id)

      profiles.each do |view|
        viewer = User.find(view.viewer_id)

        profiles_that_viewed_me.unshift({id: viewer.id, display_name:viewer.display_name, username: viewer.username, age: viewer.age, city: viewer.city,
          state: viewer.state, image: viewer.image})
      end

      return profiles_that_viewed_me
    end

end
