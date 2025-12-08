import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/lib/store/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/store"
  },
  title: 'Training Resources Store | Elevate For Humanity',
  description: 'Professional training materials, workbooks, and resources to support your career development.'
};

export default function StorePage() {
  const featuredProducts = allProducts.filter(p => p.featured);
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean Image Only */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden bg-white">
        <Image
          src="/images/gallery/image6.jpg"
          alt="Training resources and materials"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Title Section - Below Hero */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Training Resources
          </h1>
          <p className="text-xl sm:text-2xl text-slate-700">
            Professional workbooks, study guides, and materials to support your training and certification.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {allProducts.slice(0, 9).map((product) => (
              <div key={product.id} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill
className="object-cover group-hover:scale-105 transition-transform duration-300" 
          quality={100}
        /
          quality={100}
        
          sizes="100vw"
        >
                  {product.featured && <span className="absolute top-4 right-4 bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-bold">Featured</span>}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-700 uppercase">{product.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                    <button className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}