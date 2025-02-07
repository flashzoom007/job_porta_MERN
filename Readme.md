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