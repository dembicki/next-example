import { FC } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  brand: string;
  sku: string;
  thumbnail: string;
}

interface PageProps {
  products?: Product[];
}

const Home: FC<PageProps> = ({ products }) => {
  return (
    <main className="flex justify-center items-center p-6">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mx-auto">Products</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thumbnail
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sku
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.id}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.brand}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Home;

export async function getServerSideProps() {
  const getProducts = async (): Promise<Product[]> => {
    const API_URL = "https://dummyjson.com/products";
    const params = new URLSearchParams({
      limit: "15",
    });

    try {
      const response = await fetch(`${API_URL}?${params.toString()}`);
      const { products } = await response.json();
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const products = await getProducts();
  return {
    props: { products },
  };
}
