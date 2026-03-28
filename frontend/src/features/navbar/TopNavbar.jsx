import MenuIcon from "../icon/MenuIcon";
import SearchIcon from "../icon/SearchIcon";

const TopNavbar = () => (
  <header className="sticky top-0 z-60 bg-surface-container-low">
    <div className="flex justify-between items-center px-6 py-4">
      <button className="text-primary p-2.5 rounded-full hover:bg-primary-container/40 transition-colors duration-300">
        <MenuIcon />
      </button>

      <h1 className="text-3xl font-company text-primary tracking-tight">
        BeautyCode
      </h1>

      <button className="text-primary p-2.5 rounded-full hover:bg-primary-container/40 transition-colors duration-300">
        <SearchIcon />
      </button>
    </div>
  </header>
);

export default TopNavbar;
