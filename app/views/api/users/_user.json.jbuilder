# json.extract! user, :id, :username

json.id user.id
json.username user.username
# json.password user.password
json.image asset_path(user.image)
json.likes user.list_likes_ids
json.like_profiles user.list_like_profiles

json.viewed_profiles user.list_viewed_profiles
json.profiles_that_viewed_me  user.list_users_that_viewed_me
