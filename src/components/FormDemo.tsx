import { useState } from "react";

type FormType = {
    name: string;
    email: string;
};

export default function FormDemo() {
    const [form, setForm] = useState<FormType>({
        name: "",
        email: "",
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, name: e.target.value }));
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, email: e.target.value }));
    }

    return (
    <div style={{ border: "1px solid gray", padding: 20, marginBottom: 20 }}>
      <h2>Form Object Demo</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleNameChange}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Email"
        value={form.email}
        onChange={handleEmailChange}
      />

      <br /><br />

      <p>Name: {form.name}</p>
      <p>Email: {form.email}</p>
    </div>
  );
}

