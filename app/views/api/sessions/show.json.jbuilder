# json.extract! @user, :id, :username, :password :image


json.id @user.id
json.username @user.username
json.birth_date @user.birth_date
json.image asset_path(@user.image)
json.age @user.age
json.likes @user.list_likes_ids
json.like_profiles @user.list_like_profiles
