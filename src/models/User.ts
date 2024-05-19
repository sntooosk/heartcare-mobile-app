interface User {
    id: number;
    name: string;
    lastName: string;
    dob: string;
    gender: string;
    photo: string;
    auth: {
        id: number;
    };
  }
  
  export default User;
  