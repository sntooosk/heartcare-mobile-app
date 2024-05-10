interface UserProfile {
  name: string;
  lastName: string;
  dob: string;
  number: string;
  gender: string;
  email: string;
  photo?: string | null;
}

export default UserProfile;
