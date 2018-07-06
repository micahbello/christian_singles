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
end
