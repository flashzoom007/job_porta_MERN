# Job Portal - Web Application

# Getting started

Follow these steps to set up the application:

## Step 1: Clone the repository

```bash
git clone https://gitlab.com/shivohm/shivohm-labs/analyticaldashboard.git
cd analyticaldashboard
```

## Step 2: Download Project Dependencies

Now, you need to download the project dependencies. Open your terminal/command prompt and navigate to the project directory. Then, run the following command:

For frontend (react.js)

```bash
cd client/
npm install
npm run build
```

For backend (node.js)

```bash
cd backend/
npm install
npm run build
npm run start
```

## Step 3: Create .env files

```bash
cd client/.env
VITE_BACKEND_URL=http://your-backend-url.com
VITE_PYTHON_API=http://your-python-api-url.com
VITE_INDEXDB_DATABASE=my_database_name
```

```bash
cd backend/.env
PORT=5001   
DATASET_ID=your_id
API=http://backend-url.com
LOCALHOST=http://localhost:3000
```

<!--! Database Name -->
data_structure

<!--! Front End (React Js) -->
client
    <!-- start -->
    bun dev

<!--! Back End (Node Js/ Express Js) -->
backend
    <!-- start -->
    Nodemon server.js

Update versions:

[1.0] = Initial code

[1.1] = Add user create, delete, update, show, login, signup

[1.2] = Add image upload

[1.3] = Add log file

[1.4] = Add JWT token

[1.5] = Add bcryptjs for password hashing

[1.6] = Add multer for image upload

[1.7] = Add logger for log file

[1.8] = in log file user name show

[1.9] =  Add deleteAll users, new chart display

[2.0] =  add new job role, front ned half create(db and backend reaming)

[2.1] =  add new database, with also download the youtube playlist video

[2.2] = Show, update and delete the company names in react, node and databse

[2.3] = New compnay page and profile, sync with databse with api, working properly

[2.4] = Up to company, company profile, position add - complete

[2.5] = CRUD on New job role done

[2.6] = Read, Delete & Delete all for appy for the user Done

=> Date convert
    --> 2025-02-26T18:30:00.000Z == 2025-02-26
    --> {company.created.split('T')[0]}