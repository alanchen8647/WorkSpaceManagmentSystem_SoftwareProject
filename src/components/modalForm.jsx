import { Button } from "@headlessui/react";

export default function ModalForm({
  handleSubmit,
  caseData,
  setCaseData,
  handleChange,
}) {
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
          type="datetime-local"
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

      <div className="relative z-0 w-full mb-5 group">
        <input
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
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <span className="absolute left-0 top-2.5 text-gray-500">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            name="fee"
            id="floating_payment"
            className="block py-2.5 pl-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={caseData.fee}
            onChange={handleChange}
          />
          <label
            htmlFor="floating_payment"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
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
            id="floating_payment_status"
            name="paymentStatus"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
            value={caseData.paymentStatus ? "true" : "false"}
            onChange={(e) =>
              setCaseData((prev) => ({
                ...prev,
                paymentStatus: e.target.value === "true",
              }))
            }
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
            -translate-y-6 scale-75 top-3 -z-10 origin-left 
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
            name="caseStatus"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
            required
            value={caseData.caseStatus}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Finished">Finished</option>
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
          <select
            id="floating_select"
            name="caseType"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
            required
            value={caseData.caseType}
            onChange={handleChange}
          >
            <option value="Single">Single</option>
            <option value="Recurring">Recurring</option>
            <option value="Audit">Audit</option>
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
            Case Type
          </label>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <select
            id="floating_has_dependent"
            name="hasDependent"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
            border-b-2 border-gray-300 appearance-none dark:border-gray-600 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-8"
            required
            value={caseData.hasDependent ? "true" : "false"}
            onChange={(e) =>
              setCaseData((prev) => ({
                ...prev,
                hasDependent: e.target.value === "true",
              }))
            }
          >
            <option value="" disabled selected hidden></option>
            <option value="true">True</option>
            <option value="false">False</option>
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
            Has Dependent
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="employee"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={caseData.employee}
            onChange={handleChange}
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Employee
          </label>
        </div>
      </div>
      <Button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </Button>
    </form>
  );
}
