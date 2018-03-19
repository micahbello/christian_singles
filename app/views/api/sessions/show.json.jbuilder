# json.extract! @user, :id, :username, :password :image


json.id @user.id
json.username @user.username
json.password @user.password
json.birth_date @user.birth_date
json.image asset_path(@user.image)
json.age @user.age
