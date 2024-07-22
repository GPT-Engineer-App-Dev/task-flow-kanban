import { Package2 } from "lucide-react";
import { UserMenu } from "@/layouts/navbar/_components/UserMenu";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span>Kanban Board</span>
      </div>
      <div className="flex-1" />
      <UserMenu />
    </header>
  );
};

export default Header;