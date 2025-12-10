import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProductsByCategory } from '@/lib/store/products';
import { Metadata } from 'next';
import AddToCartButton from '@/components/store/AddToCartButton';
import ProductGallery from '@/components/store/ProductGallery';
import ProductReviews from '@/components/store/ProductReviews';
import RelatedProducts from '@/components/store/RelatedProducts';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Elevate For Humanity Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category).filter(
    p => p.id !== product.id
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link href="/store" className="hover:text-slate-900">Store</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <div>
              <ProductGallery product={product} />
              
              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-xs font-semibold text-slate-900">Secure Payment</div>
                  <div className="text-xs text-slate-600">SSL Encrypted</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-xs font-semibold text-slate-900">Instant Access</div>
                  <div className="text-xs text-slate-600">Download Now</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl mb-2">💯</div>
                  <div className="text-xs font-semibold text-slate-900">Money Back</div>
                  <div className="text-xs text-slate-600">30-Day Guarantee</div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                {product.category.replace('-', ' ').toUpperCase()}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-600">4.9 (127 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                {product.salePrice ? (
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-slate-900">${product.salePrice.toFixed(2)}</span>
                    <span className="text-2xl text-slate-400 line-through">${product.price.toFixed(2)}</span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                      SAVE {Math.round((1 - product.salePrice / product.price) * 100)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {product.longDescription || product.description}
              </p>

              {/* What's Included */}
              {product.includes && product.includes.length > 0 && (
                <div className="mb-8 p-6 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">What's Included:</h3>
                  <ul className="space-y-2">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add to Cart */}
              <AddToCartButton product={product} />

              {/* Stock Status */}
              <div className="mt-4 flex items-center gap-2 text-sm">
                {product.inStock ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-semibold">In Stock - Ready to Ship</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-semibold">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Digital Product Notice */}
              {product.digital && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Digital Product</h4>
                      <p className="text-sm text-blue-700">
                        This is a digital product. You'll receive instant access after purchase. No physical items will be shipped.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* License Info */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">License Information</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Single User License - For personal use only
                </p>
                <Link href="/store/licenses" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all license options →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Description Tab */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Description</h2>
              <div className="prose max-w-none text-slate-700">
                <p className="text-lg leading-relaxed mb-4">
                  {product.longDescription || product.description}
                </p>
                
                {product.requirements && product.requirements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {product.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Documentation */}
            <div className="mb-12 pb-12 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Documentation</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href={`/store/docs/${product.slug}`} className="p-6 border-2 border-slate-200 rounded-lg hover:border-blue-500 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">User Guide</h3>
                      <p className="text-sm text-slate-600">Complete documentation and setup instructions</p>
                    </div>
                  </div>
                </Link>

                <Link href={`/store/support/${product.slug}`} className="p-6 border-2 border-slate-200 rounded-lg hover:border-blue-500 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Support Forum</h3>
                      <p className="text-sm text-slate-600">Get help from our community and support team</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Reviews */}
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">How do I access my purchase?</h3>
              <p className="text-slate-700">
                After completing your purchase, you'll receive an email with download links and access instructions. Digital products are available immediately.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">What's your refund policy?</h3>
              <p className="text-slate-700">
                We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us for a full refund.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Do you offer technical support?</h3>
              <p className="text-slate-700">
                Yes! All purchases include free technical support via email and our support forum. Premium support packages are also available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
