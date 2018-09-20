# json.like_profiles Like.list_like_profiles(@user)
json.viewed_profiles View.list_viewed_profiles(@user).each do |profile|
  json.id profile[:id]
  json.display_name profile[:display_name]
  json.username profile[:username]
  json.age profile[:age]
  json.city profile[:city]
  json.state profile[:state]
  json.image asset_path(profile[:image])
  json.time_last_viewed profile[:time_last_viewed]
end

json.profiles_that_viewed_me  View.list_users_that_viewed_me(@user).each do |profile|
  json.id profile[:id]
  json.display_name profile[:display_name]
  json.username profile[:username]
  json.age profile[:age]
  json.city profile[:city]
  json.state profile[:state]
  json.image asset_path(profile[:image])
  json.time_last_viewed profile[:time_last_viewed]
end

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
