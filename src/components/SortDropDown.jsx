export default function SortDropDown({ sortOption , setSortOption }) {
    const options = [
        { label: "Name (A -> Z)", value: "nameAsc" },
        { label: "Name (Z -> A)", value: "nameDesc" },
        { label: "Start Date (Old -> New)", value: "startDateAsc" },
        { label: "Start Date (New -> Old)", value: "startDateDesc" },
        { label: "End Date (Old -> New)", value: "endDateAsc" },
        { label: "End Date (New -> Old)", value: "endDateDesc" },
    ];

    return (
        <div className="flex items-center gap-6">
            <label className="block mb-1 text-lg font-semibold text-black"> 
                Sort by:</label>
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded px-3 py-2 text-black"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}