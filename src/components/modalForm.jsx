import { Button } from "@headlessui/react";
import { useState } from "react";

export default function ModalForm({
  handleSubmit,
  caseData,
  setCaseData,
  handleChange,
  setIsOpen,
}) {
  const [isLabelsOpen, setIsLabelsOpen] = useState(false);

  const labelsOptions = ["S", "AP", "IP", "95", "BK", "DC"];

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="floating_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={caseData.name}
          onChange={handleChange}
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="startDate"
          id="floating_start_date"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          required
          value={caseData.startDate}
          onChange={handleChange}
        />

        <label
          htmlFor="floating_start_date"
          className="absolute text-sm text-gray-500 dark:text-gray-400 transform 
            -translate-y-6 scale-75 top-3 origin-left left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
        >
          Start Date
        </label>
      </div>

      {/* <div className="relative z-0 w-full mb-5 group">
        <inputx
          type="datetime-local"
          name="endDate"
          id="floating_end_date"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          required
          value={caseData.endDate}
          onChange={handleChange}
        />

        <label
          htmlFor="floating_start_date"
          className="absolute text-sm text-gray-500 dark:text-gray-400 transform 
            -translate-y-6 scale-75 top-3 origin-left left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
        >
          End Date
        </label>
      </div> */}
      <div class="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select
            id="floating_caseType"
            name="caseType"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
            value={caseData.caseType}
            onChange={(e) =>
              setCaseData((prev) => ({
                ...prev,
                caseType: e.target.value,
              }))
            }
            required
          >
            <option value="" disabled selected hidden></option>
            <option value="Single">Single</option>
            <option value="Multiple">Multiple</option>
          </select>
          {/* ▼ Dropdown indicator */}
          <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
            ▼
          </span>

          <label
            htmlFor="floating_select"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
            -translate-y-6 scale-75 top-3 -z-10 origin-left 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Case Type
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <span className="absolute left-0 top-2.5 text-gray-500">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            name="fee"
            id="floating_fee"
            className="block py-2.5 pl-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={caseData.fee}
            onChange={handleChange}
          />
          <label
            htmlFor="floating_fee"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Fee
          </label>
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <span className="absolute left-0 top-2.5 text-gray-500">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            name="cashCollected"
            id="floating_cashCollected"
            className="block py-2.5 pl-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={caseData.cashCollected}
            onChange={handleChange}
          />
          <label
            htmlFor="floating_cashCollected"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cash Collected
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <span className="absolute left-0 top-2.5 text-gray-500">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            name="electronicPayment"
            id="floating_electronicPayment"
            className="block py-2.5 pl-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={caseData.electronicPayment}
            onChange={handleChange}
          />
          <label
            htmlFor="floating_electronicPayment"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Electronic Payment
          </label>
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select
            id="floating_select"
            name="caseStatus"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
            required
            value={caseData.caseStatus}
            onChange={handleChange}
          >
            <option value="N">Not Started</option>
            <option value="IP">In Progress</option>
            <option value="H">Hold</option>
            <option value="OK">Ready</option>
            <option value="R">Rejected</option>
            <option value="A">Approved</option>
          </select>

          <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
            ▼
          </span>

          <label
            htmlFor="floating_select"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
            -translate-y-6 scale-75 top-3 -z-10 origin-left 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Case Status
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <div className="relative">
            {/* Dropdown button */}
            <button
              type="button"
              onClick={() => setIsLabelsOpen((prev) => !prev)}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
        border-b-2 border-gray-300 appearance-none dark:border-gray-600 
        focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8 text-left`}
            >
              <span className="block truncate">
                {caseData.labels.length > 0
                  ? caseData.labels.join(", ")
                  : "Select labels"}
              </span>
              <span className="absolute right-0 top-2.5 text-gray-500 pointer-events-none">
                ▼
              </span>
            </button>

            {/* Dropdown options */}
            {isLabelsOpen && (
              <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-gray-300 dark:border-gray-600">
                {labelsOptions.map((label) => (
                  <li
                    key={label}
                    className="cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-blue-100"
                    onClick={() => {
                      if (caseData.labels.includes(label)) {
                        setCaseData({
                          ...caseData,
                          labels: caseData.labels.filter((l) => l !== label),
                        });
                      } else {
                        setCaseData({
                          ...caseData,
                          labels: [...caseData.labels, label],
                        });
                      }
                    }}
                  >
                    <span
                      className={`block truncate ${
                        caseData.labels.includes(label)
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {label}
                    </span>
                    {caseData.labels.includes(label) && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        ✔
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <label
              htmlFor="floating_select"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
            -translate-y-6 scale-75 top-3 -z-10 origin-left 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Labels
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {/* Submit Button */}
        <Button
          type="submit"
          className="px-5 py-2.5 font-medium rounded-lg text-sm text-white 
               bg-blue-600 hover:bg-blue-700 
               shadow-sm transition-all duration-200"
        >
          Submit
        </Button>

        {/* Close Button */}
        <Button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-5 py-2.5 font-medium rounded-lg text-sm
               bg-gray-200 hover:bg-gray-300 
               text-gray-800 shadow-sm 
               transition-all duration-200"
        >
          Close
        </Button>
      </div>
    </form>
  );
}
