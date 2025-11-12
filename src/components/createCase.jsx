import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function CreateCase({ open, setIsOpen }) {
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

  return (
    <>
      <Modal
        open={open}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-lg font-bold mb-4 align-center justify-center">
            Create New Case
          </h2>
          <form className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_name"
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="floating_start_date"
                id="floating_start_date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                required
              />

              <label
                htmlFor="floating_start_date"
                className="absolute text-sm text-gray-500 dark:text-gray-400 transform 
      -translate-y-6 scale-75 top-3 origin-[0] left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
              >
                Start Date
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <select
                id="floating_select"
                name="floating_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
                required
              >
                <option value="" disabled selected hidden></option>
                <option value="xstart">Not Started</option>
                <option value="inprogress">In Progress</option>
                <option value="finish">Finished</option>
              </select>
              {/* ▼ Dropdown indicator */}
              <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
                ▼
              </span>

              <label
                htmlFor="floating_select"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
      -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
      peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
      peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Case Status
              </label>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <span className="absolute left-0 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="floating_payment"
                  id="floating_payment"
                  className="block py-2.5 pl-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
                <label
                  htmlFor="floating_payment"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
      transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
      peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
      peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Payment
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select
                  id="floating_select"
                  name="floating_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option value="single">True</option>
                  <option value="recurring">False</option>
                </select>
                {/* ▼ Dropdown indicator */}
                <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
                  ▼
                </span>

                <label
                  htmlFor="floating_select"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
      -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
      peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
      peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Payment Status
                </label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  id="floating_select"
                  name="floating_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option value="xstart">Not Started</option>
                  <option value="inprogress">In Progress</option>
                  <option value="finish">Finished</option>
                </select>
                {/* ▼ Dropdown indicator */}
                <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
                  ▼
                </span>

                <label
                  htmlFor="floating_select"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
      -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
      peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
      peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Case Status
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select
                  id="floating_select"
                  name="floating_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option value="single">Single</option>
                  <option value="recurring">Recurring</option>
                  <option value="audit">Audit</option>
                </select>
                {/* ▼ Dropdown indicator */}
                <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
                  ▼
                </span>

                <label
                  htmlFor="floating_select"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
      -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
      peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
      peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Case Type
                </label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  id="floating_select"
                  name="floating_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
      border-b-2 border-gray-300 appearance-none dark:border-gray-600 
      focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                {/* ▼ Dropdown indicator */}
                <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
                  ▼
                </span>

                <label
                  htmlFor="floating_select"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
      -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
      peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
      peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Has Dependent
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Employee
                </label>
              </div>
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
