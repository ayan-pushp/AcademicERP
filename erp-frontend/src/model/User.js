class User {
    constructor(pic,title,department, name, token) {
      this.pic=pic;
      this.department = department;
      this.title=title;
      this.name = name;
      this.token = token;
    }
  
    // You can add methods here to manipulate the user data
    isAuthenticated() {
      return !!this.token;
    }
  }
  
  export default User;
  