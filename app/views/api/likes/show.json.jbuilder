# json.partial! 'api/users/user', user: @user

json.likesArray Like.list_likes_ids(@user)
json.like_profiles Like.list_like_profiles(@user)
