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
#

class User < ApplicationRecord

validates :session_token, :password_digest, presence: true
validates :username, presence: true, uniqueness: true
validates :password, length: {minimum: 6, allow_nil: true}, uniqueness: true

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
  self.save
  self.session_token
end

def self.find_by_user_credentials(username, password)
  user = User.find_by(username: username)
  return user if user && user.is_password?(password)
  nil
end

def is_password?(password)
  pass = BCrypt::Password.new(self.password_digest)
  pass.is_password?(password)
end



end
