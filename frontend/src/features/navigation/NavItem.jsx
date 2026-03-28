import Icon from "./icon/Icon";

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center border-none cursor-pointer transition-all duration-300
      ${
        active
          ? "bg-primary-container text-primary rounded-full px-4 py-1 opacity-100"
          : "bg-transparent text-primary opacity-60 px-2 py-1"
      }`}
  >
    <Icon name={icon} fill={active ? 1 : 0} />
    <span className="font-label text-[10px] uppercase tracking-[0.05em] font-medium mt-0.5">
      {label}
    </span>
  </button>
);

export default NavItem;
