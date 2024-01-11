import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  let product = null;

  if (params.productId) {
    try {
      product = await prismadb.product.findUnique({
        where: {
          id: params.productId,
        },
        include: {
          images: true,
        },
      });
    } catch (error) {
      product = null;
    }
  }

  const categories = await prismadb.category.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;