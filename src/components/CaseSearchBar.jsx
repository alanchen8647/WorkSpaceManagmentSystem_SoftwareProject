export default function CaseSearchBar({ searchQuery, setSearchQuery}) {
    return (
        <div className="flex items-center gap-6">
            <label className="block mb-1 text-lg font-semibold text-black">Search by Client Name:</label>

            <input 
                type="text"
                placeholder="Enter client name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-3 py-1 rounded w-64"
            />
        </div>
    );
}