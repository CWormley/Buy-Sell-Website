# Application Folder

## Purpose
The purpose of this folder is to store all the source code and related files for your team's application. Source code MUST NOT be in any of folder. <strong>YOU HAVE BEEN WARNED.</strong>

You are free to organize the contents of the folder as you see fit. But remember your team is graded on how you use Git. This does include the structure of your application. Points will be deducted from poorly structured application folders.

***

## Clone the project

```
git clone git@github.com:CSC-648-SFSU/csc648-sp25-03-team02.git
cd csc648-sp25-03-team02/application
```

***

## Backend

### Setup

```
cd backend
npm install
```

Add flag **--production** if you don't want to install devDependencies.

### Run tests

```
npm run test
```

You can access detailed results of the tests by opening in your browser the file **./coverage/lcov-report/index.html**.

### Run project

```
npm run start
```

You can find the project running on http://localhost:5000.

***

## Frontend

### Setup

```
cd frontend
npm install
```

Add flag **--production** if you don't want to install devDependencies.

### Run tests

```
npm run test
```

You can access detailed results of the tests by opening in your browser the file **./coverage/lcov-report/index.html**.

### Run project

```
npm run start
```

You can find the project running on http://localhost:8080.
