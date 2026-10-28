import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  BadgeCheck,
  Receipt,
  UserX,
  UserPlus,
  FileSpreadsheet,
  LogOut,
  ChevronRight,
  TrendingUp,
  FolderArchive,
  Menu,
  X
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    name: "Employees",
    icon: Users,
    children: [
      { name: "Add Employee", path: "/employees/add", icon: UserPlus },
      { name: "Manage Employees", path: "/employees", icon: Users },
    ],
  },
  { name: "Document Vault", path: "/documents", icon: FolderArchive, highlight: true },
  { name: "Offer Letter", path: "/offer", icon: FileText },
  { name: "Appointment Letter", path: "/appointment", icon: BadgeCheck },
  { name: "Increment Letter", path: "/increment", icon: TrendingUp },
  { name: "Salary Slip", path: "/salary", icon: Receipt },
  { name: "Termination Letter", path: "/termination", icon: UserX },
  { name: "Onboarding", path: "/onboarding", icon: UserPlus },
  { name: "FNF", path: "/fnf", icon: FileSpreadsheet },
];

const baseItemClasses =
  "group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-300";

const activeClasses =
  "bg-orange-500/10 text-orange-500 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)]";

const inactiveClasses =
  "text-slate-400 hover:bg-slate-800/40 hover:text-slate-100";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEmployeesOpen, setIsEmployeesOpen] = useState(
    location.pathname.startsWith("/employees")
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;
  const isSectionActive = (base) => location.pathname.startsWith(base);

  const renderMenu = () => (
    <>
      <div className="mb-3 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-600">
        Workflows & Letters
      </div>

      {menuItems.filter(item => JSON.parse(localStorage.getItem('user') || 'null')?.role !== 'employee' || item.path === '/documents').map((item) => {
        if (item.children) {
          const isOpen = isEmployeesOpen;
          const isActiveSection = isSectionActive("/employees");

          return (
            <li key={item.name} className="list-none relative">
              {isActiveSection && (
                <div className="absolute left-[-16px] top-2 bottom-2 w-1 bg-orange-500 rounded-r-full shadow-[2px_0_10px_rgba(249,115,22,0.5)]" />
              )}
              <div
                onClick={() => setIsEmployeesOpen((prev) => !prev)}
                className={`${baseItemClasses} w-full justify-between cursor-pointer ${
                  isActiveSection ? activeClasses : inactiveClasses
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActiveSection ? 'text-orange-500' : 'text-slate-500 group-hover:text-slate-300'} />
                  <span className={isActiveSection ? "font-bold" : ""}>{item.name}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-orange-500" : "text-slate-600"}`} />
              </div>

              <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="ml-4 mt-1 border-l border-slate-800/80 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.name} className="pl-4 pt-1">
                      <Link
                        to={child.path}
                        className={`${baseItemClasses} ${isActive(child.path) ? "text-orange-500 font-bold bg-orange-500/5" : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/30"}`}
                      >
                        <child.icon size={16} />
                        <span>{child.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        }

        return (
          <li key={item.name} className="list-none relative">
            {isActive(item.path) && (
              <div className="absolute left-[-16px] top-2 bottom-2 w-1 bg-orange-500 rounded-r-full shadow-[2px_0_10px_rgba(249,115,22,0.5)]" />
            )}
            <Link
              to={item.path}
              className={`${baseItemClasses} ${isActive(item.path) ? activeClasses : inactiveClasses} ${item.highlight ? 'border border-orange-500/30 bg-orange-500/5' : ''}`}
            >
              <item.icon size={18} className={isActive(item.path) || item.highlight ? 'text-orange-500' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className={isActive(item.path) || item.highlight ? "font-bold" : ""}>{item.name}</span>
              {item.highlight && (
                <span className="ml-auto text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-500 text-white">
                  Vault
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden print:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between bg-[#0f172a] border-b border-slate-800/50 px-4 py-3">
        <svg viewBox="400 1800 4000 1480" role="img" aria-label="Viral Ads Media" className="block h-10 w-auto">
          <image href="/logo.png" width="5000" height="5000" />
        </svg>
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open menu"
          className="rounded-xl p-2 text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 shrink-0 bg-[#0f172a] text-slate-100 h-screen sticky top-0 border-r border-slate-800/50 select-none">
        <div className="flex shrink-0 items-center justify-center border-b border-slate-800/50 px-8 py-6 mb-5">
          {/* Frame the artwork inside the square asset without its empty margins. */}
          <svg viewBox="400 1800 4000 1480" role="img" aria-label="Viral Ads Media" className="block h-auto w-full max-w-56">
            <image href="/logo.png" width="5000" height="5000" />
          </svg>
        </div>

        <nav className="min-h-0 flex-1 px-4 overflow-y-auto scrollbar-hide space-y-1">
          {renderMenu()}
        </nav>

        <div className="p-4 border-t border-slate-800/50 bg-slate-900/20">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden print:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#0f172a] text-slate-100 border-r border-slate-800/50 select-none shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800/50 px-5 py-4">
              <svg viewBox="400 1800 4000 1480" role="img" aria-label="Viral Ads Media" className="block h-10 w-auto">
                <image href="/logo.png" width="5000" height="5000" />
              </svg>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
                className="rounded-xl p-2 text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="min-h-0 flex-1 px-4 py-4 overflow-y-auto scrollbar-hide space-y-1">
              {renderMenu()}
            </nav>

            <div className="p-4 border-t border-slate-800/50 bg-slate-900/20">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
