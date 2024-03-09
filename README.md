# Project Title

## Setup

1. Clone the repository:
   ```sh
   git clone git@github.com:git-anandjha/movies-crud.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy the `default.env` file and rename it to `.env`. Update the environment variables as needed.

## Running the Application

To start the application, run:

```sh
npm start
```

# API Endpoints

Here are all the example curl commands to interact with the APIs:

### Create User

```
curl --location 'http://localhost:3001/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "tosendanandss@gmail.com",
  "password": "password",
  "firstName": "Anand",
  "lastName": "Jha",
  "role": "admin"
}'
```

### Login User

```
curl --location 'http://localhost:3001/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "tosendanandss@gmail.com",
  "password": "password",
  "firstName": "Anand",
  "lastName": "Jha",
  "role": "admin"
}'
```

### Create Movie

```
curl --location 'http://localhost:3001/movies' \
--header 'Content-Type: application/json' \
--data '{
  "title": "The Dark Knight",
  "genre": "Action",
  "rating": 9.0,
  "streamingLink": "https://www.youtube.com/watch?v=EXeTwQWrcwY"
}'
```

### List Movie

```
curl --location 'http://localhost:3001/movies?page=1&limit=1'
```

### Search movies

```
curl --location 'http://localhost:3001/movies/search?page=1&limit=1&q=knight'
```

### Update Movie

```
curl --location --request PUT 'http://localhost:3001/movies/65eb6e11102bbdc53af1c5b8' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWI3MjM2MGFiNmZiMDZmNWUwMjRkMCIsImVtYWlsIjoidG9zZW5kYW5hbmRzc0BnbWFpbC5jb20iLCJpYXQiOjE3MDk5MjkwMTR9.1R7-r6NP8XrkdSTRd1NSm3OtFZ0rdojl7BipwcT5mO0' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Updated Movie Title",
  "genre": "Updated Genre",
  "rating": 8.5,
  "streamingLink": "https://www.example.com"
}'
```

### Delete Movie

```
curl --location --request DELETE 'http://localhost:3001/movies/65eb6e11102bbdc53af1c5b8' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWI3MjM2MGFiNmZiMDZmNWUwMjRkMCIsImVtYWlsIjoidG9zZW5kYW5hbmRzc0BnbWFpbC5jb20iLCJpYXQiOjE3MDk5MjkwMTR9.1R7-r6NP8XrkdSTRd1NSm3OtFZ0rdojl7BipwcT5mO0'
```

## Running Tests

To run the tests, use the following command:

```
npm test
```
