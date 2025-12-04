import {useState} from "react";

export default function ClockTickets(ticket) {

    // Helper functions to format time and date
    const formatTime = (ms) => {
    if (!ms) return "-";
    return new Date(ms).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    };

    // Format date helper function
    const formatDate = (ms) => {
    if (!ms) return "-";
    return new Date(ms).toLocaleDateString();
    };
    
    console.log("Clock Tickets Data:", ticket);
    return (
            <tr class="bg-gray-100" key={ticket.id}>
                <td class="px-4 py-2">{formatDate(ticket.clockIn)}</td>
                <td class="px-4 py-2">{ticket.user}</td>
                <td class="px-4 py-2">{formatTime(ticket.clockIn)}</td>
                <td class="px-4 py-2">{formatTime(ticket.clockOut)}</td>
                <td class="px-4 py-2">{ticket.caseDone || 'N/A'}</td>
                <td class="px-4 py-2">${ticket.cashCollected || '0'}</td>
                <td class="px-4 py-2">${ticket.onlinePayment || '0'}</td>
                <td class="px-4 py-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </td>
            </tr>
    )
}