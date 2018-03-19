# @users.each do |user|
#   json.set! user.id do
#     json.extract! user, :id, :display_name, :username, :online, :image
#   end
# end

@users.each do |user|
  json.set! user.id do
    json.id user.id
    json.display_name user.display_name
    json.username user.username
    json.online user.online
    json.age user.age
    json.image asset_path(user.image)
  end
end
