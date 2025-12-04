import {useState} from "react";

// Function to format timestamp into readable time string
const formatTime = (ms) => {
    if (!ms) return "-";
    return new Date(ms).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    };

// AdminUserList component to display user information in a table row
export default function AdminUserList(user) {;
    return (
        <tr class="bg-gray-100">
                <td class="px-4 py-2">{user.user.userName}</td>
                <td class="px-4 py-2">{user.user.clockStatus.clockInStatus ? "Clocked In" : "Clocked Out"}</td>
                <td class="px-4 py-2">{formatTime(user.user.clockStatus.lastClockInTime) || 'N/A'}</td>
                <td class="px-4 py-2">{formatTime(user.user.clockStatus.lastClockOutTime) || 'N/A'}</td>
                <td class="px-4 py-2">${user.user.cashCollectedToday}</td>
                <td class="px-4 py-2">${user.user.onlinePayment}</td>
                <td class="px-4 py-2">{user.user.caseDoneToday}</td>
                <td class="px-4 py-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg></td>
        </tr>
    )
}