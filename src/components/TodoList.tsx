import { useState } from "react";

type Todo = {
    id: number;
    text: string;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input) return;

        const newTodo = {
            id: Date.now(),
            text: input
        };

        setTodos(prev => [...prev, newTodo]);
        setInput("");
    }

    // const deleteTodo = (id: number) => {
    //     setTodos(prev => prev.filter(todo => todo.id !== id));
    // };

    const deleteTodo = (id: number) => {

    setTodos(prev => {

        console.log("Danh sách cũ:", prev);

        const newTodos = prev.filter(todo => {

            console.log("Đang kiểm tra:", todo);

            if (todo.id !== id) {
                console.log("ID không trùng, giữ lại:", todo);
                console.log("Giữ lại:", todo);
                return true;
            }

            console.log("Xóa:", todo);
            return false;
        });

        console.log("Danh sách mới:", newTodos);

        return newTodos;
    });
};  
     return (
    <div style={{ border: "1px solid gray", padding: 20, marginBottom: 20 }}>
      <h2>Todo Array Demo</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập todo"
      />

      <button onClick={addTodo}>
        Thêm
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}
