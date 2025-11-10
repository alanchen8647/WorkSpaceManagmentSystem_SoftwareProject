import { useState, useEffect } from 'react'

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import  {getCurrentUser,checkIfLoggedIn,logoutUser}  from '../firebaseFunction/auth'

import { readCasesRecord } from '../firebaseFunction/cloudDatabase';



function App() {

  const navigate = useNavigate();
  //Check if user is logged in, if not, redirect to login page

  useEffect(() => {
    if (!checkIfLoggedIn()) {
      navigate("/login");
    } else {
      console.log("User is logged in:", getCurrentUser());
      // Optionally, you can fetch some data here
      console.log(readCasesRecord());
    }
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome, {getCurrentUser() ? getCurrentUser().email : 'Guest'}!</p>
      

    <div class="overflow-x-auto w-[90%] max-w-5xl">
    <table class="min-w-full border border-gray-500 text-sm text-gray-800">
      <thead class="bg-gray-300 text-left">
        <tr>
          <th class="px-4 py-2 border-b border-gray-400">name</th>
          <th class="px-4 py-2 border-b border-gray-400">start Date</th>
          <th class="px-4 py-2 border-b border-gray-400">Case Status</th>
          <th class="px-4 py-2 border-b border-gray-400">Payment</th>
          <th class="px-4 py-2 border-b border-gray-400">Employee</th>
          <th class="px-4 py-2 border-b border-gray-400">Fee</th>
          <th class="px-4 py-2 border-b border-gray-400">Note:</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        <tr class="bg-gray-100">
          <td class="px-4 py-2">Alan</td>
          <td class="px-4 py-2">11/9/2025</td>
          <td class="px-4 py-2">In Progress</td>
          <td class="px-4 py-2">Received</td>
          <td class="px-4 py-2">Jianping</td>
          <td class="px-4 py-2">$20.00</td>
          <td class="px-4 py-2">
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">AP</button>
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">BK</button>
          </td>
        </tr>
        <tr class="bg-white">
          <td class="px-4 py-2">Alan</td>
          <td class="px-4 py-2">11/9/2025</td>
          <td class="px-4 py-2">In Progress</td>
          <td class="px-4 py-2">Received</td>
          <td class="px-4 py-2">Jianping</td>
          <td class="px-4 py-2">$20.00</td>
          <td class="px-4 py-2">
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">AP</button>
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">BK</button>
          </td>
        </tr>
        <tr class="bg-gray-100">
          <td class="px-4 py-2">Alan</td>
          <td class="px-4 py-2">11/9/2025</td>
          <td class="px-4 py-2">In Progress</td>
          <td class="px-4 py-2">Received</td>
          <td class="px-4 py-2">Jianping</td>
          <td class="px-4 py-2">$20.00</td>
          <td class="px-4 py-2">
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">AP</button>
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">BK</button>
          </td>
        </tr>
        <tr class="bg-white">
          <td class="px-4 py-2">Alan</td>
          <td class="px-4 py-2">11/9/2025</td>
          <td class="px-4 py-2">In Progress</td>
          <td class="px-4 py-2">Received</td>
          <td class="px-4 py-2">Jianping</td>
          <td class="px-4 py-2">$20.00</td>
          <td class="px-4 py-2">
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">AP</button>
            <button class="bg-orange-300 text-gray-800 rounded-full px-3 py-1 mx-1 text-sm font-semibold">BK</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </>
  )
}

export default App
