// import Login from './pages/Login'

import { useState } from "react";
import { Badge } from "./components/Badge";
import { ProductCard } from "./components/ProductCard";
import { Card, FunctionProps, UserCard, UserCard2 } from "./components/UserCard";
import SearchBox from "./components/SearchBox";
import { Greeting } from "./components/Greeting";
import FormDemo from "./components/FormDemo";
import TodoList from "./components/TodoList";
import ToggleDemo from "./components/ToggleDemo";
import PostList from "./components/PostList";
import ControllerdForm from "./components/ControllerdForm";

// function App() {
//   return <Login />
// }

// export default App;

export default function App() {
  // return (
  //   <>
  //   <Badge label="React App" color="green" />
  //   <Badge label="Welcome to the React App!" color="blue" />
  //   <UserCard name="John Doe" email="nguyentandev05@gmail.com" phone="123-456-7890" />
  //   <UserCard2 user={{ name: "Jane Smith", email: "nguyentandev05@gmail.com", phone: "987-654-3210", avatar: "https://via.placeholder.com/150" }} />   
  //   <FunctionProps onClick={() => alert("Button clicked!")} />
  //   <Card>
  //     <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f0f0f0" }}>
  //       <h2>Card Title</h2>
  //       <p>This is a card component that can contain any content.</p>

  //     </div>
  //   </Card>
  //   <ProductCard product={{ title: "Product 1", description: "This is a great product.", price: 19.99, imageUrl: "https://via.placeholder.com/150" }} />

  //   </>
  // );

  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPosts, setShowPosts] = useState(true);


  const handleIncrement = () => setCount((c) => c + 1);
  const handleDecrement = () => setCount((c) => c - 1);
  const handleReset = () => setCount(0);


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement} style={{ marginRight: "10px" }}>
        Increment
      </button>
      <button onClick={handleReset} style={{ marginRight: "10px" }}>
        Reset
      </button>
      <button onClick={handleDecrement} style={{ marginRight: "10px" }}>
        Decrement
      </button>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Search Example</h1>
        <SearchBox />
      </div>

      <Greeting isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setIsLoggedIn(true)} style={{ marginRight: 10 }}>
          Login
        </button>
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>

      <div>
        <h1>Counter with Object State</h1>
        <FormDemo />
      </div>

      <div>
        <h1>Todo List</h1>
        <TodoList />
      </div>

      <div>
        <h1>User Card</h1>
        <ToggleDemo />
      </div>

      <div>
        <h2>Toggle PostList</h2>

        <button onClick={() => setShowPosts(!showPosts)}>
          {showPosts ? "Ẩn PostList" : "Hiện PostList"}
        </button>

        <hr />

        {<PostList />}
      </div>

      <div>
        <ControllerdForm />
      </div>

    </div>
  );
}