# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



user1 = User.create(username: "demoaccount", password: "password", first_name: "John",
  last_name: "Smith", gender: "male", birth_date: "1989-08-09", zip_code: 10012,
  age: 28, last_online: "2018-03-20", sex_seek: "Women", min_age_seek: 18, max_age_seek: 49,
  image: "https://vignette.wikia.nocookie.net/nicktheultimaswordwielder/images/f/f1/Aang-2-.jpg/revision/latest?cb=20111128030857")
