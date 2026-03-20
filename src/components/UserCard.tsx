type UserCardProps = {
    name: string;
    email: string;
    phone?: string;
};

type UserCardProps2= {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
};

type Props = {
    user: UserCardProps2;
};

type FunctionProps = {
    onClick: () => void;
};

type Props2= {
    children: React.ReactNode;
};

export const Card = ({ children }: Props2)=> {
    return <div className="card">{children}</div>;
};

export const FunctionProps = ({ onClick }: FunctionProps) => {
    return <button onClick={onClick}>Click Me</button>;
    
}

export const UserCard = ({ name, email, phone }: UserCardProps) => {
    return (
        <div className="user-card">
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
        </div>
    )
}

export const UserCard2 = ({ user }: Props) => {
    return (
        <div className="user-card">
            <img src={user.avatar} alt={user.name} />
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
        </div>
    )
}

