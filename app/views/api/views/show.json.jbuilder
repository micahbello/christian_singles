# json.partial! 'api/users/user', user: @user

json.viewed_profiles View.list_viewed_profiles(@user)
json.profiles_that_viewed_me  View.list_users_that_viewed_me(@user)
