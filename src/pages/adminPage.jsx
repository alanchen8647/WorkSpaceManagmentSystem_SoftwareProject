import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext.jsx';
import Adminpanel from '../components/adminPanel.jsx';
import CreateUserForm from '../components/popUpForms/createUserForm.jsx';

function AdminPage() {

  return (
    <>
    <div className="flex items-center justify-end mt-2 mb-2  ">
      <CreateUserForm />
    </div>
    <div class="overflow-x-auto max-w-5xl pt-1">
    <table class="min-w-full border border-gray-500 text-sm text-gray-800">
      <thead class="bg-gray-300 text-left">
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
        <Adminpanel />
      </tbody>
    </table>
  </div>
    </>
  )
}

export default AdminPage