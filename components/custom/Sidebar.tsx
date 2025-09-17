import { Button } from "@/components/ui/button";

type SidebarProps = {
  currentView: string;
  setCurrentView: (view: string) => void;
};

export const Sidebar = ({ currentView, setCurrentView }: SidebarProps) => (
    <div
      className="w-72 flex flex-col h-screen bg-panel border-r"
      style={{ borderColor: "var(--divider)" }}
    >
      <div className="p-6 border-b" style={{ borderColor: "var(--divider)" }}>
        <img src="/logo.png" alt="Logo" className="w-fit h-16 rounded-2xl mx-auto" />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={currentView === "dashboard" ? "default" : "ghost"}
          className={`w-full justify-start h-12 cursor-pointer ${
            currentView === "dashboard"
              ? "btn-primary"
              : "text-secondary hover:bg-panel"
          }`}
          onClick={() => setCurrentView("dashboard")}
        >
          Dashboard
        </Button>

        <Button
          variant={currentView === "companies" ? "default" : "ghost"}
          className={`w-full justify-start h-12 cursor-pointer ${
            currentView === "companies"
              ? "btn-primary"
              : "text-secondary hover:bg-panel"
          }`}
          onClick={() => setCurrentView("companies")}
        >
          Companies
        </Button>

        <Button
          variant={currentView === "jobs" ? "default" : "ghost"}
          className={`w-full justify-start h-12 cursor-pointer ${
            currentView === "jobs"
              ? "btn-primary"
              : "text-secondary hover:bg-panel"
          }`}
          onClick={() => setCurrentView("jobs")}
        >
          Jobs
        </Button>
      </nav>
    </div>
  );