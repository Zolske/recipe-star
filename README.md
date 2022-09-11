# recipe-star
"Recipe star" is a social media platform. It has been designed for its users to share their favourite recipes. The application consists of the React app and an API.

## Features
- Full featured recepie sharing service
  - user can upload recepies with images and description
  - recepies apear from top to bottom, more are added when user scrolles down
- Social media website
  - user can create account with profile picture and bio
  - user can set a username and password
- when logged in the user can ...  
  - Like and comment on recepies
  - create, edite, and delete his comments
  - Make new friends and gain followers
  - user can follow and read recepiece of other user
  - can see other posts they have liked
  
  ## API endpoints
  | Methods | PROFILES <br> *name, content* | RECIPE <br> *images, title, category, filter_category, ingredients, instruction* | COMMENTS <br> *content* | LIKES <br> *id* | FOLLOWERS <br> *id* |
  | --- | :----: | :----: | :----: | :----: | :----: |
  | **create /<br> RECIPES** | no | yes | yes | yes | yes |
  | **retrieve<br> GET** | yes | yes | yes | yes | yes |
  | **update<br> PUT** | yes | yes | yes | no | no |
  | **destroy<br>DELETE** | no | yes | yes | yes | yes |
  | **list<br>GET** | yes | yes | yes | yes | yes |
  | **serch<br>GET** | no | yes | no | no | no |
  
  | Authentication | registration <br> **POST** | login <br> **POST** | logout <br> **POST** |
  | --- | :----: | :----: | :----: |
  | endpoint | "/dj-rest-auth/registration/" | "/dj-rest-auth/login/" | "/dj-rest-auth/logout/" |
  | expected value | username password1 password2 | username password |
  | | user GET | refresh token POST | change password POST |
  | endpoint | "/dj-rest-auth/logout/" | "/dj-rest-auth/token/refresh/" | "/dj-rest-auth/password/change/" |
  | expected value | | refresh token | new_password1 new_password2 |
  
  
