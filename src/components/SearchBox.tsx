import React, { useState } from "react";

export default function SearchBox() {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Tìm kiếm..." />
            <p>Bạn đã nhập: {query}</p>
        </div>
    )
}