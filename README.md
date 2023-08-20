# URLShortner

URL Shortener is a web application that allows you to create shortened URLs for long links. It uses a Node.js backend with Express for routing and MongoDB for data storage.

## Features
- Generate short URLs for long links.
- Track the number of clicks and visit history for each shortened URL.
- Analytics dashboard to view click statistics.
- Redirect users to original URLs when accessing short links.
- User authentication for secure URL management.


## API Endpoints
- POST /url: Generate a short URL for a given long URL.
- GET /:shortId: Redirect to the original URL associated with the short ID.
- GET /url/:shortId/analytics: View click statistics and visit history for a short URL.


## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- HTML, CSS, JavaScript


##  Contributions are welcome! If you find any bugs or have ideas for improvements, feel free to open an issue or submit a pull request.
