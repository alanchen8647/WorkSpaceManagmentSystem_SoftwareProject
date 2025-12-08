import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import Modal from "@mui/material/Modal";
import { Button, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { readAllEmployees, assignCaseToEmployee } from "../firebaseFunction/cloudDatabase";

export default function AssignCase({ open, setIsOpen, caseDataProp }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 9,
  };

  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(caseDataProp.employee || "");
  const [loading, setLoading] = useState(true);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await readAllEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Handle submit
const handleSubmit = async (event) => {
  event.preventDefault();

  const confirmed = window.confirm("Are you sure you want to assign this case?");
  if (!confirmed) return;

  try {
    await assignCaseToEmployee(caseDataProp.id, selectedUser);
    alert("Case Assigned Successfully");
    setIsOpen(false);
  } catch (err) {
    alert("Failed to assign case");
    console.error(err);
  }
};


  return (
    <Modal open={open} onClose={() => setIsOpen(false)} aria-labelledby="modal-title">
      <Box sx={style}>
        <h2 className="text-lg font-bold mb-4">Assign Case</h2>

        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <div>
            <Listbox value={selectedUser} onChange={setSelectedUser}>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Assign Employee
              </Listbox.Label>

              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm">
                  <span className="block truncate">{selectedUser || "Select User"}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {employees.map((u) => (
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
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                            >
                              {u.userName}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        )}

        <div className="flex justify-end mt-6 gap-2">
          <Button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
