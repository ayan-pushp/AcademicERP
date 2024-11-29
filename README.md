
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
│   │   │   │   ├── EmployeeNotFoundException.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── JWTAuthenticationException.java
│   │   │   │   ├── OfferNotFoundException.java
│   │   │   │   ├── StudentNotFoundException.java
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
│   ├── application.properties
├── test
```

#### **Backend Highlights**
- **Security**: Configured using Spring Security with JWT authentication.
- **Controllers**:
  - **AuthenticationController**: Handles user authentication and login requests.
  - **PlacementController**: Handles placements, student data, and offers-related requests.
- **Repositories**: Interfaces to access data from the database.
- **Services**:
  - `PlacementService`: Contains business logic for handling placements and offers.
- **Exception Handling**: Comprehensive handling using classes like `GlobalExceptionHandler` and custom exceptions.

---

### **Frontend: `erp-frontend`**

#### **Folder Structure**
```
src
├── components
│   ├── Filters.jsx
│   ├── LoginPage.css
│   ├── LoginPage.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── OfferCard.jsx
│   ├── PlacementPage.css
│   ├── PlacementPage.jsx
│   ├── StudentTable.jsx
├── hooks
│   ├── useLogin.js
│   ├── usePlacementPage.js
├── model
│   ├── User.js
├── utils
│   ├── api.js
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
- **Components**:
  - `LoginPage.jsx`: Handles user authentication and secure login.
  - `PlacementPage.jsx`: Displays placement data and offers, with options to manage students and filter data.
  - `StudentTable.jsx`: Displays a list of students and their details.
- **Custom Hooks**:
  - `useLogin.js`: Manages login-related API calls and states.
  - `usePlacementPage.js`: Handles placement-related business logic.
- **Styling**: 
  - Individual styles for pages like `LoginPage.css` and `PlacementPage.css`.
- **Utility Functions**:
  - `api.js`: Centralized API calls for the frontend.

---

## **Setup Instructions**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Academic-ERP.git
   cd Academic-ERP/erpBackend
   ```
2. Configure the database in `application.properties`.
3. Build and run the application:
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
3. **Student Filters**:
   - Filter by academic grade, specialization, or domain.
4. **Database Integration**:
   - Fully connected with pre-populated test data.

---

## **Technologies Used**
- **Backend**:
  - Spring Boot, Spring Security, JPA/Hibernate
  - MySQL
- **Frontend**:
  - React.js, React Hooks
  - CSS Modules
- **Other Tools**:
  - Maven, npm

---

## **Contributions**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit and push your changes.
4. Submit a pull request.

--- 
