'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCart, updateQuantity, removeFromCart, Cart } from '@/lib/store/cart';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());

    const handleCartUpdate = (e: CustomEvent) => {
      setCart(e.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const updatedCart = updateQuantity(productId, newQuantity);
    setCart(updatedCart);
  };

  const handleRemove = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
  };

  const handleApplyDiscount = () => {
    // Mock discount codes
    const validCodes: Record<string, number> = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
      'WELCOME': 0.15,
      'STUDENT': 0.25,
    };

    const code = discountCode.toUpperCase();
    if (validCodes[code]) {
      setDiscountApplied(true);
      setDiscountAmount(cart.total * validCodes[code]);
    } else {
      alert('Invalid discount code');
    }
  };

  const subtotal = cart.total;
  const finalTotal = subtotal - discountAmount;

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-slate-600 mb-8">
              Browse our store and add products to your cart
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-2xl md:text-3xl lg:text-4xl">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="128px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          href={`/store/${item.product.slug}`}
                          className="text-xl font-bold text-slate-900 hover:text-blue-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-slate-600 mt-1">
                          {item.product.category.replace('-', ' ').toUpperCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {item.product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">Quantity:</span>
                        <div className="flex items-center border border-slate-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-slate-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 font-semibold text-slate-900 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-slate-100 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">
                          ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                        </div>
                        {item.product.salePrice && (
                          <div className="text-sm text-slate-500 line-through">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

              {/* Discount Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={discountApplied}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={discountApplied || !discountCode}
                    className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <div className="mt-2 text-sm text-green-600 font-medium">
                    ✓ Discount applied!
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-700">
                  <span>Tax</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-slate-900">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push('/store/checkout')}
                className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/store"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant Digital Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
