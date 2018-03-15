# json.array! @users, :id, :username


  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
