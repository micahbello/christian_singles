# Christian Singles

[Live site](https://christian-singles.herokuapp.com/#/)

**_Christian Singles_ is an early stage single page web app inspired by the popular dating site _Christian Mingle_. It uses a Ruby on Rails backend combined with a React/Redux frontend.**

<img width= "50%" src="./app/assets/images/screenshot1.png" />

### Key Features

- [x] Hosted on Heroku
- [x] User authentication
- [x] Create and maintain user profile, including preferences form
- [x] Browse profiles
- [x] Display match percentage between users based on preferences

#### User Authentication
BCrypt gem used for safely hashing users passwords.

<img width= "50%" src="./app/assets/images/auth_demo.gif" />

#### Profile Maintenance

Users have the ability to create and maintain a profile that contains all the information necessary for formulating percentage matches with other users. Individual profiles display each user's personal information. Users also fill out a preference form that corresponds to what he or she looks for in a potential romantic partner.

<img width= "50%" src="./app/assets/images/profile_demo.gif" />

#### Browse

Users are able to browse the profiles of others.

<img width= "50%" src="./app/assets/images/browse_demo.gif" />

### Match Percentages

The meat of any dating site. Matches were made on the backend based on taking into account the number of stats/preferences being compared to the number that matched between users. A percentage was then derived from this ratio.


Below is a very, very, small snippet of the code for the percentages method (with Ruby):

```ruby
def match_percent_and_summary(user_viewed)

  matching_points_total = 65 ##total possible points available via comparisons
  #(9 for gender, 9 for distance, 9 for age,
  #18 for two sided attributes, 4 for multi_select_attributes,
  #5 for relationship_seek, 1 for first date match, 6 for height, 4 for hobbies)

  if !match_gender(self.sex_seek, self.gender, self.id).include?(user_viewed) || self.id == user_viewed.id
    return ["no_percent_allowed", "This user is incompatible with you."]
  end
  #^^will return if the gender preferences do not match.

  matching_points = 9 #points earned for meeting gender preferences
  match_summary = "User meets your gender preference. "

  if within_distance?(user_viewed) == true
    matching_points += 9 #points earned for being within distance
    match_summary = match_summary.concat("user is within your desired distance. ")
  else
    match_summary = match_summary.concat("user is NOT within your desired distance. ")
  end

  if within_age?(user_viewed) == true
    matching_points += 9 #points earned for being within age
    match_summary = match_summary.concat("user is within your desired age range. ")
  else
    match_summary = match_summary.concat("user is NOT within your desired age range. ")
  end

  #call method to return points from height
  height_results = return_match_height(user_viewed)
  matching_points += height_results[0]
  match_summary += height_results[1]

  #arrays of "attributes" to compare through in order to make calculations
  #two_sided_attributes allow user to only pick one for himself
  two_sided_attributes = [["religion","religion_seek"], ["education", "education_seek"],
                          ["attendance", "attendance_seek"], ["have_kids", "have_kids_seek"],
                          ["want_kids", "want_kids_seek"], ["relocate", "relocate_seek"],
                          ["marital_status", "marital_status_seek"], ["drink", "drink_seek"],
                          ["smoke", "smoke_seek"]]

  #multi_select_attributes allow user to pick multiple for himself
  multi_select_attributes = [["language", "language_seek"], ["ethnicity", "ethnicity_seek"]]

  #call methods that calculate the points from two above arrays
  two_sided_attributes.each do |attribute_set|
    results = return_match_number_two_sid_attr(user_viewed, attribute_set[0], attribute_set[1])
    matching_points += results[0]
    match_summary = match_summary.concat(results[1])
  end

  multi_select_attributes.each do |attribute_set|
    results = return_match_number_multi_select(user_viewed, attribute_set[0], attribute_set[1])
    matching_points += results[0]
    match_summary = match_summary.concat(results[1])
  end

  #call method to return points from relationship_seek
  results = return_relationship_seek_match(user_viewed)
  matching_points += results[0]
  match_summary = match_summary.concat(results[1])

  #call method to return points from first_date
  results = return_first_date_match(user_viewed)
  matching_points += results[0]
  match_summary = match_summary.concat(results[1])


  #call method to return points from hobbies shared
  hobbies_results = return_match_number_hobbies(user_viewed)
  matching_points += hobbies_results[0]
  match_summary += hobbies_results[1]

  percent_match = (100 * matching_points) / matching_points_total
  match_summary = finalize_match_summary(match_summary, user_viewed.username,
                                        user_viewed.display_name, user_viewed.gender)

  return [percent_match, match_summary]

end
```

### Future Features
1. Instant messaging
2. Option to send "wink" or "heart" to other users
