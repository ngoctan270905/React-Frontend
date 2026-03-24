import { useParams } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserDetailPage() {

  const { id } = useParams();

  const users: User[] = [
    { id: 1, name: "Nguyễn Ngọc Tấn", email: "tan@gmail.com" },
    { id: 2, name: "Nguyễn Văn Nam", email: "nam@gmail.com" },
    { id: 3, name: "Trần Văn Hùng", email: "hung@gmail.com" }
  ];

  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return <h2>Không tìm thấy user</h2>;
  }

  return (
    <div>

      <h1>👤 User Detail</h1>

      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

    </div>
  );
}