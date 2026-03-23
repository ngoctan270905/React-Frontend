import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState<number>(0);

    console.log("PostList rendered");

    // use effect fetch api 
    useEffect(() => {
        console.log("Fetch posts - mounted");

        const fetchPosts = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");

                if (!res.ok) {
                    throw new Error("API looi");
                }

                const data: Post[] = await res.json();
                setPosts(data);
            } catch (error) {
                setError("Không thể tải bài viết");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        console.log("Timer started");

        const id = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 1000);

        return () => {
            console.log("Cleanup timer");
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        console.log("Tick changed:", tick);
    }, [tick]);

    if (loading) return <h2>Đang tải dữ liệu...</h2>;
    if (error) return <h2>{error}</h2>;
    return (
        <div>
            <h2>Danh sách bài viết</h2>

            <p>Timer: {tick} giây</p>

            {posts.slice(0, 5).map((post) => (
                <div
                    key={post.id}
                    style={{
                        border: "1px solid gray",
                        margin: "10px 0",
                        padding: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );

}