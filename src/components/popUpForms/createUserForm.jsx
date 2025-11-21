import { useState } from "react";
import { Button, Dialog, DialogPanel} from '@headlessui/react'
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import {useAuth} from "../../context/authContext.jsx";
import createUser from "../functions/createUser";

const roles = [
  { id: 1, name: "Employee" },
  { id: 2, name: "Admin" },
];

export default function CreateUserForm() {
  const { userDetail } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(userDetail?.admin, form.userName, form.email, form.password, 
    selectedRole.name === "Admin" ? true:false
    );
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        className="px-10 py-2 text-white rounded transition bg-green-600 hover:bg-green-700"
      >
        Create New User
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
             <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
                <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6 rounded-xl p-6 shadow-xl ">
                    <h2 className="text-xl font-semibold text-gray-800">Create New User</h2>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <div className="mt-1 relative">
                        <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            name="userName"
                            value={form.userName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 relative">
                        <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative">
                        <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        </div>
                    </div>

                    {/* Role Selection (HeadlessUI Listbox) */}
                    <div>
                        <Listbox value={selectedRole} onChange={setSelectedRole}>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                            Role
                        </Listbox.Label>

                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                            <span className="block truncate">{selectedRole.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                            </span>
                            </Listbox.Button>

                            <Transition
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                                {roles.map((role) => (
                                <Listbox.Option
                                    key={role.id}
                                    value={role}
                                    className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                                    }`
                                    }
                                >
                                    {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                        {role.name}
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
                    

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium shadow hover:bg-indigo-700"
                    >
                        Create User
                    </button>
                    </form>
                    </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
    
  );
}