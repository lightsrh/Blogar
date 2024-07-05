# Blogar

## Backend

``` bash
cd backend
./pocketbase serve
```

## Frontend

``` bash
cd ../blogar-front
npm i
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
```

Credentials to connect to the app :

login : professeur

password : motdepasse

## Features

- Login page with guard to check if you are connected before you can reach any other url that the /login
- Subjects page displaying a paginated list of all the created subjects with various informations. Everyone can create a subject but only the owner can update or delete it
- Posts page displaying a list of all the created posts with various informations. Everyone can create a post but only the owner can update or delete it
- Update page for subject and post

## Screenshots of the app

### Login Page

![Login page](/blogar-front/src/assets/login.png)

### Subjects page 

![Subjects page](/blogar-front/src/assets/subjects.png)

### Post page

![Posts page](/blogar-front/src/assets/posts.png)

### Edit pages

![Edit page](/blogar-front/src/assets/edit.png)

![Edit page](/blogar-front/src/assets/edit2.png)
