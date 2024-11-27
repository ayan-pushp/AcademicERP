class User {
    constructor(email, name, token) {
      this.email = email;
      this.name = name;
      this.token = token;
    }
  
    // You can add methods here to manipulate the user data
    isAuthenticated() {
      return !!this.token;
    }
  }
  
  export default User;
  