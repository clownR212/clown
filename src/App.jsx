import { Link, Outlet, useLocation } from "react-router-dom";

function Tab({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to || (to === "/clown" && pathname === "/");
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl transition ${
        active ? "bg-gray-900 text-white" : "hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-gray-900">
      <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2 font-semibold">
            <img
              src={`${import.meta.env.BASE_URL}logo_gold.png`}
              alt="Clown League"
              className="h-16 w-16 sm:h-16 sm:w-16 object-contain shrink-0"
              loading="lazy"
            />
            <span>Clown League</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Tab to="/clown">Clown</Tab>
            <Tab to="/miniclown">MiniClown</Tab>
            <Link
              to="/inscription"
              className="px-4 py-2 rounded-xl border border-yellow-700 text-yellow-700 hover:bg-yellow-50 transition"
            >
              Inscrire son équipe
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Clown League
      </footer>
    </div>
  );
}
