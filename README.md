Dedrick's Summer Rental Resort

[Live Site Link]([https://dedricksapi.onrender.com/)

---

## **Introduction**


Dedrick's Summer Rental Resort is a full-stack web application inspired by Airbnb, designed for users looking to book their perfect getaway at a premier summer resort. This platform allows authenticated users to browse resort listings, read reviews from other guests, and manage their upcoming bookings, providing a seamless and intuitive user experience.

---

## **Technologies Used**

This project was built using the following technologies:

* **Frontend:** React, Redux, CSS, HTML
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL, Sequelize
* **Deployment:** Render

---

## **Key Features**

* **Secure User Authentication:** Users can create an account, sign up, and log in to access the platform's full functionality. Session management ensures a persistent and secure user experience.

* **Booking Management (Update & Delete):** After booking a stay, users can view all their upcoming trips on a personal dashboard and have the ability to easily update or cancel their existing bookings.

* **Reviews and Ratings System (Create & Read):** To help build a community of trust, users can write detailed reviews and leave a star rating (from 1 to 5) for properties where they have completed a stay. All reviews for a spot are publicly visible.

---

## **Getting Started**

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

You must have Node.js and npm installed on your machine.

### **Installation**

1.  Clone the repo
    ```sh
    git clone https://github.com/Dedrickj1/codingproject-2.git
    ```
2.  Navigate to the backend directory and install packages
    ```sh
    cd backend
    npm install
    ```
3.  Navigate to the frontend directory and install packages
    ```sh
    cd ../frontend
    npm install
    ```
4.  Create a `.env` file in the `backend` directory based on the provided `.env.example` file and add your database credentials and other required variables.
5.  Start the backend server
    ```sh
    cd ../backend
    npm start
    ```
6.  Start the frontend development server in a separate terminal
    ```sh
    cd ../frontend
    npm start
    ```

---

## **Future Improvements**

In the future, I plan to add the following features:

An actual reservation feature to reserve a place.
