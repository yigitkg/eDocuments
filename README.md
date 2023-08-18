# E-Invoice Tracking Application

![E-Invoice Tracking Application](./e-Invoice%20Screenshot.png)

This is a React-based E-Invoice tracking application, offering a range of features including filtering, a comprehensive dashboard, pagination, and secure login functionality using cookies.

## 🚀 Features

1. **Dashboard**: The core of the application where users can view and manage invoices.
2. **Pagination**: Efficient handling and display of large datasets by splitting them into manageable chunks.
3. **Filtering**: Easily narrow down the list of invoices based on specific criteria.
4. **Login System**: Securely manage user sessions using cookies.
5. **Login Persistence**: Uses cookies to maintain a user's logged-in status even after refreshing the browser.
6. **Log Out**: Provides the ability for users to securely log out, clearing their session.


## 🔧 Setup & Installation

### Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yigitkg/eDocuments.git
 
   cd e-invoice-tracking-app
   
   npm install
   
   npm start
    ```
   
   This will launch the application on http://localhost:3000.
   
# 📘 Documentation

## Usage
**Login**: Start by logging in using the provided credentials. For the sake of this demonstration, the username is *admin* and the password is *admin123*.

**Dashboard**: Once logged in, you'll be redirected to the dashboard. Here, you can view all the invoices and use the provided filtering options to narrow down your search.

**Pagination**: Navigate between different pages of invoices using the pagination component.

**Log Out**: You can log out from the application, which will erase the login cookie and secure your session

##  Code Structure
**LoginForm.jsx**: This component renders the login form and handles login functionality.

**cookies.js**: Contains helper functions to set, get, and erase browser cookies.

**authService.js**: Simulates an authentication service. This is where the login logic resides.

**App.jsx**: The main component of the application. It manages user authentication and routes.
Future Enhancement

## 📞 Contact & Support

    Should you have any inquiries, issues, or suggestions, feel free to open an issue, or reach out to us directly at yigitkg@gmail.com.
