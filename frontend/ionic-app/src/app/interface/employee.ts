export interface Employee {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // change data type the db is timestamp
  password: string;
  role_id: number;
}
