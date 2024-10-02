interface UserList extends Timestamps {
  user_id: string;
  name: string;
  email: string;
  is_active: boolean | 0 | 1;
}