# recipe-star

"Recipe star" is a social media platform. It has been designed for its users to share their favourite recipes. The application consists of the React app and an API.

## Features

- Full featured recipe sharing service
  - user can upload recipes with images and description
  - recipes appear from top to bottom, more are added when user scroll's down
- Social media website
  - user can create account with profile picture and bio
  - user can set a username and password
- when logged in the user can ...

  - Like and comment on recipes
  - create, edit, and delete his comments
  - Make new friends and gain followers
  - user can follow and read recipe's of other user
  - can see other posts they have liked

  ## API endpoints

  | Methods                  | PROFILES <br> _name, content_ | RECIPE <br> _images, title, category, filter_category, ingredients, instruction_ | COMMENTS <br> _content_ | LIKES <br> _id_ | FOLLOWERS <br> _id_ |
  | ------------------------ | :---------------------------: | :------------------------------------------------------------------------------: | :---------------------: | :-------------: | :-----------------: |
  | **create /<br> RECIPES** |              no               |                                       yes                                        |           yes           |       yes       |         yes         |
  | **retrieve<br> GET**     |              yes              |                                       yes                                        |           yes           |       yes       |         yes         |
  | **update<br> PUT**       |              yes              |                                       yes                                        |           yes           |       no        |         no          |
  | **destroy<br>DELETE**    |              no               |                                       yes                                        |           yes           |       yes       |         yes         |
  | **list<br>GET**          |              yes              |                                       yes                                        |           yes           |       yes       |         yes         |
  | **search<br>GET**        |              no               |                                       yes                                        |           no            |       no        |         no          |

  | Authentication |  registration <br> **POST**   |      login <br> **POST**       |       logout <br> **POST**       |
  | -------------- | :---------------------------: | :----------------------------: | :------------------------------: |
  | endpoint       | "/dj-rest-auth/registration/" |     "/dj-rest-auth/login/"     |     "/dj-rest-auth/logout/"      |
  | expected value | username password1 password2  |       username password        |
  |                |       **user <br> GET**       |  **refresh token <br> POST**   |  **change password <br> POST**   |
  | endpoint       |    "/dj-rest-auth/logout/"    | "/dj-rest-auth/token/refresh/" | "/dj-rest-auth/password/change/" |
  | expected value |                               |         refresh token          |   new_password1 new_password2    |
