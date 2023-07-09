import React, { useEffect, useState } from "react";

const DateTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanUp() {
            clearInterval(timer)
        }
    });
    return (
        <div>
            {date.toLocaleTimeString()}
        </div>
    )
}
export default DateTime;