import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import prismadb from "@/lib/prismadb";
import CategorySwitcher from "./category-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <CategorySwitcher items={categories} /> */}
        <MainNav className="" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
