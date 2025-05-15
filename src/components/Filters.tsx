import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const Filters = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="flex gap-4 mb-4">
      <Input
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select value={filter} onValueChange={setFilter}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
    <SelectItem value="full-time">Full-time</SelectItem>
    <SelectItem value="part-time">Part-time</SelectItem>
    <SelectItem value="remote">Remote</SelectItem>
  </SelectContent>
</Select>
    </div>
  );
};

export default Filters;
