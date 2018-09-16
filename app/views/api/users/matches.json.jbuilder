@users.each do |user|

    json.set! User.find(user.id) do
      json.id User.find(user.id).id
      json.display_name User.find(user.id).display_name
      json.username User.find(user.id).username
      json.online User.find(user.id).online
      json.age User.find(user.id).age
      json.image asset_path(User.find(user.id).image)
      # json.percentage user[1]
      # json.distance_from_user user[2]
      json.height User.find(user.id).height
      json.city User.find(user.id).city
      json.state User.find(user.id).state
      json.occupation User.find(user.id).occupation
      json.religion User.find(user.id).religion
      # json.match_summary user[3]
  end
end
