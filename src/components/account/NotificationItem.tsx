import { useState } from "react";

export default function NotificationItem({ title, desc, defaultOff }: any) {
  const [isOff, setIsOff] = useState(defaultOff);
  return (
    <div className="notif-row">
      <div className="notif-info">
        <h5>{title}</h5>
        <p>{desc}</p>
      </div>
      <div 
        className={`toggle ${isOff ? "off" : ""}`} 
        onClick={() => setIsOff(!isOff)}
      ></div>
    </div>
  );
}