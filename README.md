# GroupWatch

## Environment Variables

Make sure to add the necessary environment variables before running.  

## Running Locally

Development mode runs the client and server separately (the server will not serve the client) and watches for changes.  
* `npm run client:dev` - Run client in development mode  
* `npm run server:dev` - Run server in development mode  
* `npm run dev` - Run application in development mode  

Production mode runs the server such that it serves the client.  
* `npm run client:build` - Build the client without running it  
* `npm run server:build` - Build the server without running it  
* `npm run build` - Build both the client and the server without running either  
* `npm run server:prod` - Run the application in production mode *without building*  
* `npm start` - Build and run the application in production mode  

In most cases, you'll just want to run `npm install` followed by `npm run dev` or `npm start`.