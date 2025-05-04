# Angular Homes App
- Install Angular if you don't have it installed

  `npm install -g @angular/cli`

- Clone this branch to your local machine

  `git clone -b homes-app-start git@github.com:angular/codelabs.git homes-app`

- Once the code has been downloaded

  `cd homes-app`

- Install the depencies

  `npm install` 
  
  This is a utility we use to emulate an api REST server.

  `npm i -g json-server`

- Run the application 

  `ng serve`

  To start up the json-server instance.

  `json-server --watch db.json`

- Useful cli commands


`ng generate component Home --standalone --inline-template`

`ng generate interface housingLocation`

`ng g c Details --standalone -inline-template`          

`ng g s housing`
