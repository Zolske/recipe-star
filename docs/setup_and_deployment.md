[back to README "Recipe Star" - "Setup & Deployment"](./../README.md#setup-and-deployment)
# Setup & Deployment
## Setup "Recipe Star" (*frontend app*)
1. create a project folder linked to the GitHub repository of the project
2. run the following command (*from within the project folder*) to create a react app with the dependencies listed in the table below:
```
npx create-react-app . --template git+https://github.com/Code-Institute-Org/cra-template-moments.git --use-npm
```
|dependencies|version|
|---|---|
|"@testing-library/jest-dom":| "^5.16.5",|
|"@testing-library/react":| "^11.2.7",|
|"@testing-library/user-event":| "^12.8.3",|
|"axios":| "^0.21.4",|
|"bootstrap":| "^4.6.2",|
|"jwt-decode":| "^3.1.2",|
|"react":| "^17.0.2",|
|"react-bootstrap":| "^1.6.6",|
|"react-dom":| "^17.0.2",|
|"react-infinite-scroll-component":| "^6.1.0",|
|"react-router-dom":| "^5.3.3",|
|"react-scripts":| "^4.0.3",|
|"web-vitals":| "^1.1.2"|  
**link to GitHub repository containing the template->** [cra-template-moments](https://github.com/Code-Institute-Org/cra-template-moments)
3. add the Bootstrap CSS link to the head of the **index.html** file in the **public** folder
```
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
```
## Deployment "Recipe Star" (*frontend app*)
1. **add**, **commit** and **push** to GitHub
2. **create** a Heroku app, **connect** it to your GitHub repository, and **"Deploy Branch"**
3. set the the **config var** for the **heroku api app** to `CLIENT_ORIGIN` and as its value the web address of the **heroku client site** `https://recipe-star.herokuapp.com/`
4. create the `api` **folder** under the `src` **folder** with the **file** `axiosDefaults.js` add the following content:  
```
import axios from "axios";

axios.defaults.baseURL = "https://recipe-star-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
```  
5. import `axiosDefaults.js` to `app.js`  
```
import "./api/axiosDefaults";
```  
6. check that the package.json file has under “scripts” the following code:  
```
"heroku-prebuild": "npm install -g serve",
```  
7. Add a `Procfile` at the root of the project with the following code:  
```
web: serve -s build
``` 
