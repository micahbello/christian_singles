@users.each do |user|

    json.set! User.find(user[0]).id do
      json.id User.find(user[0]).id
      json.display_name User.find(user[0]).display_name
      json.username User.find(user[0]).username
      json.online User.find(user[0]).online
      json.age User.find(user[0]).age
      json.image asset_path(User.find(user[0]).image)
      json.percentage user[1]
      json.height User.find(user[0]).height
      json.city User.find(user[0]).city
      json.state User.find(user[0]).state
      json.occupation User.find(user[0]).occupation
      json.religion User.find(user[0]).religion

  end
end
