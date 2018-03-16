# json.extract! @user, :id, :username, :password :image


json.id @user.id
json.username @user.username
json.password @user.password
json.image asset_path(@user.image)
