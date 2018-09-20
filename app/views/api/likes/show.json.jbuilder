# json.partial! 'api/users/user', user: @user

json.likesArray Like.list_likes_ids(@user)
json.mutualLikesArray Like.list_mutual_likes_ids(@user)
json.like_profiles Like.list_like_profiles(@user).each do |profile|
    json.id profile[:id]
    json.display_name profile[:display_name]
    json.username profile[:username]
    json.age profile[:age]
    json.city profile[:city]
    json.state profile[:state]
    json.image asset_path(profile[:image])
    json.mutual profile[:mutual]
    json.created_at profile[:created_at]
end
