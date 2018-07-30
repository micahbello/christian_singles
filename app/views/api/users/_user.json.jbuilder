# json.extract! user, :id, :username

json.id user.id
json.username user.username
# json.password user.password
json.image asset_path(user.image)
json.likes Like.list_likes_ids(user)


# json.like_profiles Like.list_like_profiles(user)
#
# json.viewed_profiles View.list_viewed_profiles(user)
# json.profiles_that_viewed_me  View.list_users_that_viewed_me(user)
