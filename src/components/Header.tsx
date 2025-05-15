function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-blue-200 p-4 sm:p-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 rounded-b-lg">
      <h1 className="text-xl sm:text-2xl font-extrabold text-blue-700">
        Remote Job Board
      </h1>
      <p className="text-sm text-blue-500 text-center sm:text-left">
        Find your next remote opportunity easily
      </p>
    </header>
  );
}
export default Header;
