import { FC } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { CategoryColumn } from "./components/columns";
import { CategoryClient } from "./components/client";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = async ({}) => {
  const categories = await prismadb.category.findMany();

  const formattedCategories: CategoryColumn[] = await Promise.all(
    categories.map(async (category) => {
      const numOfProducts = await prismadb.product.count({
        where: {
          categoryId: category.id,
        },
      });
      return {
        id: category.id,
        name: category.name,
        createdAt: format(category.createdAt, "MMMM do, yyyy"),
        products: numOfProducts,
      };
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
