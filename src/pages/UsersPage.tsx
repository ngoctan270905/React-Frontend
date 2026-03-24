import { Link } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {

  const users: User[] = [
    { id: 1, name: "Nguyễn Ngọc Tấn", email: "tan@gmail.com" },
    { id: 2, name: "Nguyễn Văn Nam", email: "nam@gmail.com" },
    { id: 3, name: "Trần Văn Hùng", email: "hung@gmail.com" }
  ];

  return (
    <div>

      <h1>👥 Users List</h1>

      {users.map(user => (
        <div key={user.id}>

          <Link to={`/users/${user.id}`}>
            {user.name}
          </Link>

        </div>
      ))}

    </div>
  );
}