'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Minus, Plus } from 'lucide-react';
import { getCart, removeFromCart, updateQuantity, type Cart } from '@/lib/store/cart';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });

  useEffect(() => {
    setCart(getCart());
    const sync = () => setCart(getCart());
    window.addEventListener('cartUpdated', sync);
    return () => window.removeEventListener('cartUpdated', sync);
  }, []);

  const remove = (id: string) => setCart(removeFromCart(id));
  const quantity = (id: string, next: number) => setCart(updateQuantity(id, next));

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-orange-600" />
          <h1 className="text-4xl font-black text-black">Shopping Cart</h1>
        </div>
        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
            <Link href="/store" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold">
              <ArrowLeft className="w-5 h-5" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.items.map(({ product, quantity: qty }) => (
                <div key={product.id} className="border-2 border-gray-200 rounded-xl p-6 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-black">{product.name}</h3>
                    <p className="text-black">${((product.salePrice || product.price) * qty).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button aria-label="Decrease quantity" onClick={() => quantity(product.id, qty - 1)} className="p-2 border rounded"><Minus className="w-4 h-4"/></button>
                    <span className="w-8 text-center">{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => quantity(product.id, qty + 1)} className="p-2 border rounded"><Plus className="w-4 h-4"/></button>
                    <button aria-label="Remove item" onClick={() => remove(product.id)} className="text-red-600 p-2"><Trash2 className="w-5 h-5"/></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex justify-between"><span className="text-xl font-bold">Total:</span><span className="text-3xl font-black text-orange-600">${cart.total.toFixed(2)}</span></div>
              <p className="text-sm mt-3">Checkout uses the current approved payment providers. Legacy Stripe identifiers are retained only for historical reconciliation.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/store" className="inline-flex justify-center gap-2 bg-gray-200 text-black px-8 py-4 rounded-xl font-bold"><ArrowLeft className="w-5 h-5"/>Continue Shopping</Link>
              <Link href="/store/checkout" className="inline-flex justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold flex-1">Proceed to Checkout<ArrowRight className="w-5 h-5"/></Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
