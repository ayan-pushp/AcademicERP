
# **Academic ERP**

Academic ERP is a comprehensive system to manage placement processes, student details, employee data, and organizations within an academic institution. It consists of two main components:
1. **Backend (Spring Boot-based)**
2. **Frontend (React.js-based)**

---

## **Use Case Description**

### **Placement Student Selection**
This feature allows the employees of the Outreach department to manage placement-related activities efficiently:
1. **Login Access**: Employees can securely log in to the system using their credentials.
2. **View Organisation Offers**: Employees can view details of all placement offers provided by various organizations.
3. **Manage Student Details**:
   - Access the list of all students who are eligible for the placement offers.
   - Identify students who have applied for specific offers.
4. **Student Filtering**: Employees can filter students based on the following criteria:
   - **Grade**: Academic performance of students.
   - **Specialisation**: Field of expertise or study.
   - **Domain**: Specific industry domains related to the placement.
5. **Student Selection**: Employees can select and assign a student to a particular offer or reject the application directly through the interface.

---

## **Project Structure**

### **Backend: `erpBackend`**

#### **Folder Structure**
```
src
├── main
│   ├── java
│   │   ├── com.ayan.erpbackend
│   │   │   ├── configuration
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── WebConfig.java
│   │   │   ├── controller
│   │   │   │   ├── AuthenticationController.java
│   │   │   │   ├── PlacementController.java
│   │   │   ├── dto
│   │   │   │   ├── EmployeeRequest.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── PlacementOfferResponse.java
│   │   │   │   ├── PlacementStudentOfferRequest.java
│   │   │   │   ├── StudentResponse.java
│   │   │   ├── entity
│   │   │   │   ├── Department.java
│   │   │   │   ├── Domain.java
│   │   │   │   ├── Employee.java
│   │   │   │   ├── Organisation.java
│   │   │   │   ├── Placement.java
│   │   │   │   ├── PlacementFilter.java
│   │   │   │   ├── PlacementStudent.java
│   │   │   │   ├── Specialisation.java
│   │   │   │   ├── Student.java
│   │   │   ├── exception
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── helper
│   │   │   │   ├── EncryptionService.java
│   │   │   │   ├── JWTHelper.java
│   │   │   │   ├── RequestInterceptor.java
│   │   │   ├── repo
│   │   │   │   ├── DepartmentRepository.java
│   │   │   │   ├── EmployeeRepository.java
│   │   │   │   ├── PlacementRepository.java
│   │   │   │   ├── PlacementStudentRepository.java
│   │   │   │   ├── StudentRepository.java
│   │   │   ├── service
│   │   │   │   ├── PlacementService.java
│   │   │   ├── ErpBackendApplication.java
├── resources
│   ├── scripts
│   │   ├── alter_erp.sql
│   │   ├── create_erp.sql
│   │   ├── insert_erp.sql
│   ├── static
│   ├── templates
│   ├── application.properties
```

#### **Backend Highlights**
- **Security**: Configured using Spring Security with JWT authentication.
- **Controllers**:
  - **AuthenticationController**: Handles user authentication and login requests.
  - **PlacementController**: Handles placements, student data, and offers related requests.
- **Repositories**: Interfaces to access data from the database.
- **Services**:
  - `PlacementService`: Contains business logic for handling placements and offers.
- **Exception Handling**: Global exception handling with `GlobalExceptionHandler`.

#### **Database Setup**
SQL scripts in the `resources/scripts` folder:
1. `create_erp.sql`: Creates the database schema.
2. `alter_erp.sql`: Alters existing tables for enhancements.
3. `insert_erp.sql`: Contains sample data for testing.

---

### **Frontend: `erp-frontend`**

#### **Folder Structure**
```
src
├── components
│   ├── LoginPage.css
│   ├── LoginPage.jsx
│   ├── PlacementPage.css
│   ├── PlacementPage.jsx
├── hooks
│   ├── useLogin.js
│   ├── usePlacementPage.js
├── model
│   ├── User.js
├── utils
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
├── setupTests.js
```

#### **Frontend Highlights**
- **Component-Based Architecture**:
  - `LoginPage.jsx`: Handles user login functionality.
  - `PlacementPage.jsx`: Displays placement data with options to manage offers and view student details.
- **Custom Hooks**:
  - `useLogin.js`: Handles login-related state and API calls.
  - `usePlacementPage.js`: Manages placement-related logic and API interactions.
- **Styling**:
  - `LoginPage.css`: Contains styles for the login page.
  - `PlacementPage.css`: Styles for placement-related views.

#### **Assets**
Located in the `public/resources` folder:
- `cv.pdf`: Sample resume file.
- `pic.jpg`: Sample employee photo.

---

## **Setup Instructions**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Academic-ERP.git
   cd Academic-ERP/erpBackend
   ```
2. Configure the database in `application.properties`.
3. Run the SQL scripts in the `resources/scripts` folder to set up the database.
4. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd Academic-ERP/erp-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## **Features**
1. **Authentication**:
   - Secure login using JWT tokens.
2. **Placement Management**:
   - Manage placement offers.
   - View eligible and applied student details.
   - Accept or reject a student for an offer.
3. **Database Integration**:
   - Pre-populated data for testing.
4. **Modular Codebase**:
   - Separation of concerns with DTOs, controllers, and services.

---

## **Technologies Used**
- **Backend**:
  - Spring Boot, Spring Security, JPA/Hibernate
  - MySQL
- **Frontend**:
  - React.js, React Hooks
  - CSS Modules
- **Other Tools**:
  - Maven
  - npm

---

## **Contributions**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit and push your changes.
4. Submit a pull request.

---
---
