import { useState, useEffect } from "react";
import { Button, Dialog, DialogPanel} from '@headlessui/react'
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import {useAuth} from "../../context/authContext.jsx";
import {readAllEmployees} from "../../firebaseFunction/cloudDatabase.jsx";
import {addClockTicket} from "../../firebaseFunction/realTimeDatabase.jsx";


export default function CreateClockSheetForm() {
  const { userDetail } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    clockInDate: "",
    clockInTime: "",
    clockOutDate: "",
    clockOutTime: "",
});

  useEffect (() => {
    const fetchUsers = async () => {
      const employees = await readAllEmployees();
      setUsers(employees);
    };
    fetchUsers();
  }, []);

  const toTimestamp = (date, time) => new Date(`${date}T${time}:00`).getTime();


  const [selectedUser, setSelectedUser] = useState(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addClockTicket({
        user: selectedUser,
        clockIn: toTimestamp(form.clockInDate, form.clockInTime),
        clockOut: toTimestamp(form.clockOutDate, form.clockOutTime)
    });
    close();
  };



  return (
    <>
      <Button
        onClick={open}
        className="px-10 py-2 text-white rounded transition bg-green-600 hover:bg-green-700"
      >
        Create New Clock Entry
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4">
      <DialogPanel
        transition
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >

        <form onSubmit={handleSubmit} className="space-y-6">

          <h2 className="text-xl font-semibold text-gray-800">
            Create Clock Entry
          </h2>

          {/* Users Dropdown */}
          <div>
            <Listbox value={selectedUser} onChange={setSelectedUser}>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                User
              </Listbox.Label>

              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm">
                  <span className="block truncate">{selectedUser}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>

                <Transition>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {users.map((u) => (
                      <Listbox.Option
                        key={u.id}
                        value={u.userName}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-indigo-600 text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                              {u.userName}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Clock In Date + Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Clock In</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <input
                type="date"
                name="clockInDate"
                value={form.clockInDate}
                onChange={handleChange}
                className="border rounded-lg p-2"
                required
              />
              <input
                type="time"
                name="clockInTime"
                value={form.clockInTime}
                onChange={handleChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
          </div>

          {/* Clock Out Date + Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Clock Out</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <input
                type="date"
                name="clockOutDate"
                value={form.clockOutDate}
                onChange={handleChange}
                className="border rounded-lg p-2"
                required
              />
              <input
                type="time"
                name="clockOutTime"
                value={form.clockOutTime}
                onChange={handleChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700"
          >
            Create Entry
          </button>

        </form>
      </DialogPanel>
    </div>
  </div>
</Dialog>
    </>
    
  );
}