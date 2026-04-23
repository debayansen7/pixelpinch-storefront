import Link from "next/link";

export interface Product {
  id?: string | number;
  name?: string;
  price?: string | number;
  image?: string;
  description?: string;
}

export default function ProductCard({ product }: { product?: Product }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={
            product?.image ||
            "https://placehold.co/400x400/e2e8f0/1e293b?text=Product"
          }
          alt={product?.name || "Product Image"}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {product?.name || "Awesome Product"}
          </h3>
          <span className="text-lg font-black text-indigo-600">
            ${product?.price || "99.00"}
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product?.description ||
            "This is a short description of the amazing product to catch the customer's eye."}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-900 hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
