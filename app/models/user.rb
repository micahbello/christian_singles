# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  session_token   :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string
#  last_name       :string
#  gender          :string
#  zip_code        :integer
#  birth_date      :date
#

class User < ApplicationRecord

validates :session_token, :password_digest, :first_name, :last_name, :gender, :zip_code, :birth_date, presence: true
validates :username, presence: true, uniqueness: true
validates :password, length: {minimum: 6, allow_nil: true}

attr_reader :password

after_initialize :ensure_session_token

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



end
