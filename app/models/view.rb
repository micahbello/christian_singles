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
end
