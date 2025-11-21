import {subscribeToUsersCollection} from "../firebaseFunction/cloudDatabase.jsx";
import {useEffect, useState} from "react";
import AdminUserList from "./adminUser.jsx";

function Adminpanel() {
    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        const unsubscribe = subscribeToUsersCollection((users) =>{
            setUsersData(users);
        });
        return unsubscribe;
    }, []);

    return (
        <>
            {/* <div class="overflow-x-auto max-w-5xl pt-8">
            <table class="min-w-full border border-gray-500 text-sm text-gray-800"> */}
            {usersData.length > 0 && usersData.map(user => (
                <AdminUserList user={user} />
            ))}
            {/* <thead class="bg-gray-300 text-left">
                <tr>
                <th class="px-4 py-2 border-b border-gray-400">Employee Name</th>
                <th class="px-4 py-2 border-b border-gray-400">Clock In Status</th>
                <th class="px-4 py-2 border-b border-gray-400">Clock In Time</th>
                <th class="px-4 py-2 border-b border-gray-400">Clock Out Time</th>
                <th class="px-4 py-2 border-b border-gray-400">Cash Collected</th>
                <th class="px-4 py-2 border-b border-gray-400">Online Payment</th>
                <th class="px-4 py-2 border-b border-gray-400">Case Done Today</th>
                <th class="px-4 py-2 border-b border-gray-400">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
                <tr class="bg-gray-100">
                <td class="px-4 py-2">Alan</td>
                <td class="px-4 py-2">ClockedOut</td>
                <td class="px-4 py-2">10:00 AM</td>
                <td class="px-4 py-2">6:00 PM</td>
                <td class="px-4 py-2">$100.00</td>
                <td class="px-4 py-2">$100.00</td>
                <td class="px-4 py-2">5</td>
                <td class="px-4 py-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg></td>
                </tr>
                <tr class="bg-white">
                <td class="px-4 py-2">Alan</td>
                <td class="px-4 py-2">ClockedOut</td>
                <td class="px-4 py-2">10:00 AM</td>
                <td class="px-4 py-2">6:00 PM</td>
                <td class="px-4 py-2">$500.00</td>
                <td class="px-4 py-2">$500.00</td>
                <td class="px-4 py-2">5</td>
                </tr>
                <tr class="bg-gray-100">
                <td class="px-4 py-2">Alan</td>
                <td class="px-4 py-2">ClockedOut</td>
                <td class="px-4 py-2">10:00 AM</td>
                <td class="px-4 py-2">6:00 PM</td>
                <td class="px-4 py-2">$500.00</td>
                <td class="px-4 py-2">$500.00</td>
                <td class="px-4 py-2">5</td>
                </tr>
                <tr class="bg-white">
                <td class="px-4 py-2">Alan</td>
                <td class="px-4 py-2">ClockedOut</td>
                <td class="px-4 py-2">10:00 AM</td>
                <td class="px-4 py-2">6:00 PM</td>
                <td class="px-4 py-2">$500.00</td>
                <td class="px-4 py-2">$500.00</td>
                <td class="px-4 py-2">5</td>
                </tr>
            </tbody> */}
            {/* </table>
        </div> */}
    </>
    )
}

export default Adminpanel;