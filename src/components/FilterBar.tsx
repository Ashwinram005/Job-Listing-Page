import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  locationFilter,
  setLocationFilter,
}) {
  return (
    <section className="sticky top-[85px] z-30 bg-white border border-blue-200 p-4 sm:p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 rounded-lg shadow-md mt-6 mb-6">
      {/* Search input */}
      <Input
        type="text"
        placeholder="Search by job title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-base rounded-md shadow-sm"
        aria-label="Search jobs by title"
      />

      {/* Category select */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full rounded-md border border-blue-300 shadow-sm text-base focus:ring-2 focus:ring-blue-600">
          <SelectValue placeholder="Select job type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="full-time">Full-Time</SelectItem>
          <SelectItem value="part-time">Part-Time</SelectItem>
          <SelectItem value="remote">Remote</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
        </SelectContent>
      </Select>

      {/* Location input */}
      <Input
        type="text"
        placeholder="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 text-base rounded-md shadow-sm"
        aria-label="Filter jobs by location"
      />
    </section>
  );
}

export default FilterBar;
