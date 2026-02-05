import React from "react";
import { useState } from "react";
import { getTimeRemaining } from "../utils/getTimeRemaining";
import { useEffect } from "react";

function ExpirationCountdown({ expiresAt }) {
  const [time, setTime] = useState(() => getTimeRemaining(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (time.expired) {
    return <span className="text-red-500 font-semibold">Expired</span>;
  }

  const isUrgent = time.days === 0 && time.hours < 1;

  return (
    <span className={isUrgent ? "text-red-500 font-semibold" : "text-gray-600"}>
      {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
    </span>
  );
}

export default ExpirationCountdown;
