# json.array! @users, :id, :username


  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :display_name, :username, :online
    end
  end
