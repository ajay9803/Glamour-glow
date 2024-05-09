import React from "react";
import AdminProductItem from "./admin_product_item";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import LoadError from "../home/load-error";

const AdminProductsPage: React.FC = () => {
  const { isLoading, error, data } = useFutureBuilder(
    "http://localhost:8080/products/all-products"
  );

  return (
    <div className="w-full">
      {isLoading && (
        <div className="h-44 flex flex-row justify-center items-center">
          <ThePulseLoader color="purple"></ThePulseLoader>
        </div>
      )}
      {error && <LoadError message={error.message}></LoadError>}
      {data && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3  gap-6">
          {data.products.map((product: any) => (
            <AdminProductItem
              key={product.id}
              product={{
                id: product._id,
                brand: product.brand,
                category: product.category,
                name: product.name,
                images: product.images,
                price: product.price,
                description: product.description,
                availableQuantity: product.quantityAvailable,
                rating: product.rating,
                totalReviews: product.totalReviews,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
