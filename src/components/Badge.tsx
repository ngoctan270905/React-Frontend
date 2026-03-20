type BadgeProps = {
    label: string;
    color?: string;
};

export const Badge = ({ label, color = "blue" }: BadgeProps) => {
    return <span className={`badge badge-${color}`}>{label}</span>;
}; 
