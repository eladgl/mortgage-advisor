
# Project README

## Overview
This project is a part of the "Client-Server" course taught by Tamir at ORT Braude College. It is designed to demonstrate a full-stack application incorporating both client and server-side functionalities.

## Mortgage Advisor Application

This project contains both client and server applications for the Mortgage Advisor.

## Technology Stack
- **Frontend:**
  - **React**: A JavaScript library for building user interfaces.
  - **TailwindCSS**: A utility-first CSS framework for rapid UI development.
  - **Axios**: A JavaScript library used to make HTTP requests.
  - **Bootstrap**: A front-end framework for developing responsive and mobile-first websites.
  - **Styled Components**: A library for writing CSS in JS to style React components.
  - **Vite**: A module bundler that also used for relative path importing in the project.

- **Backend:**
  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express.js**: A web application framework for Node.js.
  - **Firebase Firestore**: A NoSQL database provided by Firebase for storing and synchronizing data in real time.
  - **JWT (JSON Web Tokens)**: A method for securely transmitting information between parties as a JSON object.
  - **Nodemailer**: A module for Node.js applications to allow email sending.
## Getting Started

To get a copy of the project, clone the repository and navigate into it:
```
git clone https://github.com/eladgl/mortgage-advisor.git
cd mortgage-advisor
```
The repository includes two projects: mortgage-advisor-client and mortgage-advisor-server, we need to install each of their dependencies, for developing convenience we also
added a way to run them both from the project root folder so we also need to install its dependencies for unlocking this capability
###Installing Dependencies:
```
npm install
cd mortgage-advisor-client
npm install
cd ..
cd mortgage-advisor-server
npm install
cd ..
```
## Setting up Firebase
As the server utilizes Firebase as its database, make sure to create a .env file in the server root directory with the following content:
```
FIREBASE_API_KEY=AIzaSyBdwQxXVzf5jh-F_Lp8zI5ekrdv-xV6kjw
FIREBASE_AUTH_DOMAIN=mortgageadvisor-2024.firebaseapp.com
FIREBASE_PROJECT_ID=mortgageadvisor-2024
FIREBASE_STORAGE_BUCKET=mortgageadvisor-2024.appspot.com
FIREBASE_MESSAGING_SENDER_ID=544583728506
FIREBASE_APP_ID=1:544583728506:web:733ac7b4062e623e846ac3
FIREBASE_MEASUREMENT_ID=G-LCE42JE9KZ


FIREBASE_PRIVATE_KEY_ID=-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCv03I9aMMzUUjt\npVyrYbOoa94tx5dVc8T6ShMX/ZB+8QTcmbpQmqoYNFHRciY0QEKCxr7wI09ekpXO\n9ZKKHEszEidMkDkTu5KcBC9ON+nXusbpGhmZ0Kb8C2yruU8tvWR8jEfArB9M9AXO\nit1RCsH7GykJDJq23RE3gQyXEtaWG3B5LIxq4NY3gzegkHmDb/qI09zy/1x4wnvN\n735c/T2OyImx3scz75U9YYFIb/tfg7EAjcfuHjCOi+GCr9ggBUfwtkZl8ZNO6jCQ\n4IZR/iCDHyUcC8pOweoc05FhsE2s73fhIqWoeB4L6s6M1sd79ilQApRWDaaIc9pc\nNKyZZq2NAgMBAAECggEACcP8vFxtOxRwsIJWu04Z5GjZVkGXri9X6W7j0JlMxUAt\nvPLs3j045U9CnBdy98P57bmMMVpEtkP9/hi1ouYfZx7DAAWipe3tHq0802NXoZvG\nIHxKn7hvDeC0kHUiaK/0PNatxY3Jz0RebjJYSIAIdiH0DYSdszpkEmkggeOR95RG\n/2iFNYtouSPotnt8m0aHhzeOGk0XlP3nSHrZCLeC1Jew8xSRYnudrjhDMPYTIfj9\n5uRpqb/hZZ4mTyqhhYbzNjFqPn6P6qPZ2qWPbjgIKWgdd0UCmz94RNLIWilYOPi0\npJAvqrpVlr3QUp7WIwdI4t7oMFLziG2TpF3PfBtgIQKBgQDaEBbhsEt+Y18FyuC8\nSVpSsDM5q4mhVlwkwDWer2VnrmMr/KLdLbwi34N7gdYV5i6Q/xXvHFhSQ8EB1lva\nSTvOxOYDnjOqU0f9HXL3K644COhXsD74S/vN1Fqerk0CNeeIOLWzEeIvMMET2d59\nXCFaMJYRwJrIvMFhidzR5JquTwKBgQDOaj5qKWEjvv9+L2nBQJ2d4JGilgEh81Co\nv+6nue7LdeFRsphvb6AGNhCPiS9FHnU0RNJke5SylRetyYTkglu1AvptjAuqchXJ\nx91gv2Mm1DdxwSWVyl02bNRLP+2JMTLdSHAGo2K19D4M0ElBjboW/R4WnIrJ3Z+e\nYbarT1IrYwKBgGmBkWCfKNe9ArPNxlCzeQU7BX3otk2eeDS73vWpTXoN0SPuN2qm\nfzmsRXSTjF7KIUu8cANiBoW/DHp0GbsS5eIUOGoVuE+3vcQE5KQcuU2ZWblbqAwA\nz5N2JGZUVSQ1qpGpRpielX5Zq4GMT27+DZESovlx5DItya8Ewhe38PNXAoGAMCHS\nIAs6HY3CIfiIXonktxXQn+r+pJ4KJu9qhS30Ivl/6v8MUJ/k3s3omq/Ql/t8NQ3/\nSXMPv3zIorulA2vqWpExOC454irsLbsvQgoe4sUFkL8LNpyTk8dY0Zs8loskYzkq\n9kFPGUK03WQMUP7tb8LiKz+hlWTafaInaFb8wCUCgYAUmf9JKeDI32sRXBcGZKfh\n4n1nLBXlvq3I2onMAgWrqiFG4Tz0r9GDawt30Kj1NaHcNGLtaPpa4FuZ+kChIEeD\n2/pQMv8s4fkJnIOi895kK67NyY+JNl9GhA8BFJr+hVDhB4nip1VyoH6R7PdZzELu\n1V7MIxoQxWK0+JX2avIh5Q==\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-cvojn@mortgageadvisor-2024.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=105220906803778842756
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cvojn%40mortgageadvisor-2024.iam.gserviceaccount.com
JWT_SECRET=s3cr3tKey1234567890+abcdefABCDEF==
```


## Running the Project Locally
To run this project on your local machine, follow these steps:

1. **Root Folder:**
   - Navigate to the root folder of the project.
   - Run the command ```npm start``` to start the project. This will start both the frontend and backend parts of the application.
     ![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/39287dcc-5378-4aa1-b71a-ce73282c4920)

### Another Way - Run Client and Server Separately (2 terminals)
2. **Client:**
   - Go to the `client` directory within the project folder.
   - Run `npm run dev` to start the development server for the React frontend.
![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/223e00e2-34d8-491e-8ebd-90d140f37bc0)

3. **Server:**
   - Navigate to the `server` directory within the project folder.
   - Run `npm run server` to start the backend server using Node.js and Express.js.
![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/ac2d52c8-04e9-41b9-a1bb-3b074e14c6e4)


Ensure that all the dependencies are installed in both the client and server directories by running `npm install` in each directory before starting the servers.

**~Make Sure .env Files exist on client/server root folders~**

## Deployment
We used EC2 aws product to deploy to, got an Amazon Linux machine, opened the required ports for inbound and outbound traffic
On the machine after cloning the repository to it with ssh, we needed to overwrite a config file at the client and write our public ipv4 address as seen below
since client side has no global process variable
![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/aa86b507-1e58-400a-a8ce-e7d9e6be1bcd)

For the backend we need to write the following:
![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/d2d18e1c-8bc1-47b5-a99b-ec75050c2970)
And at the machine add REACT_APP_API_BASE_URL as an environment variable

~Adding as environment variable:
Connect to EC2 machine
```
ssh -i mortgage.pem ec2-user@ec2-13-49-175-232.eu-north-1.compute.amazonaws.com
```
![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/3cc8b81d-e96c-48bd-9a22-26171e0e934f)
Type: ```export REACT_APP_API_BASE_URL=13.49.175.232```
Check that it is saved 
![image](https://github.com/eladgl/mortgage-advisor/assets/59554824/1d94d45e-36d2-4ae0-b7d5-25e8d9f2e8db)

Install all dependencies as said above, now run the project with ```npm sun client``` instead from root folder to run both
Create a screen and detach it for the site to work even when terminal is shut
```
screen -S mortgage
npm run client
Ctrl + A, then press D
```
Then you will get:
```
screen -ls
There are screens on:
        34149.mortgage      (Detached)
```
## Contribution
This project is part of an educational course, and contributions are managed by the course participants and the instructor.
