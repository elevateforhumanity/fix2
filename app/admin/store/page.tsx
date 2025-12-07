import ProductEditor from "./ProductEditor";
import ProductCard from "./ProductCard";

export default function StorePage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Codebase Store Builder</h1>
        <p className="text-gray-600 mt-2">Create and manage sellable codebase products</p>
      </div>

      <ProductEditor />

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
