import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Address and payment state for checkout
  const [checkoutData, setCheckoutData] = useState({
    name: 'Parent Priya Sharma',
    phone: '9876543210',
    address: 'Flat 402, Sunshine Meadows, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    paymentMethod: 'upi'
  });

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const shippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= shippingThreshold || rawSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 79;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'LILHUMANS15') {
      setDiscountPercent(15);
      setCouponSuccess('15% off applied successfully!');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Welcome bonus discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try LILHUMANS15');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Your Little Bag ({cartItems.reduce((n, i) => n + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {orderPlaced ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-bold text-2xl text-slate-900">
                  Yay! Order Confirmed 🎉
                </h4>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  Thank you! Your little human's package is being lovingly prepared. Tracking code sent via SMS.
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl text-xs text-left max-w-xs mx-auto space-y-1">
                  <p><strong>Order ID:</strong> #LH-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong>Deliver to:</strong> {checkoutData.name}, {checkoutData.city}</p>
                  <p><strong>Estimated Delivery:</strong> Within 2-3 business days</p>
                </div>
                <button
                  onClick={() => {
                    setOrderPlaced(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-slate-800"
                >
                  Continue Exploring
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="font-bold text-slate-900 text-sm">Delivery &amp; Payment</span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-sky-600 hover:underline font-semibold"
                  >
                    ← Back to Bag
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Parent's Full Name</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.name}
                      onChange={e => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Phone Number (For updates)</label>
                    <input
                      type="tel"
                      required
                      value={checkoutData.phone}
                      onChange={e => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Shipping Street Address</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.address}
                      onChange={e => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.city}
                        onChange={e => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.pincode}
                        onChange={e => setCheckoutData({ ...checkoutData, pincode: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-slate-50 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['upi', 'card', 'cod'].map(method => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setCheckoutData({ ...checkoutData, paymentMethod: method })}
                          className={`py-2 px-1 rounded-xl border text-center uppercase font-bold text-[11px] ${
                            checkoutData.paymentMethod === method
                              ? 'border-sky-500 bg-sky-50 text-sky-700'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {method === 'upi' ? '⚡ UPI / GPay' : method === 'card' ? '💳 Card' : '📦 COD'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-700 pt-3">
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span className="font-bold text-slate-900">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order • ₹{grandTotal.toLocaleString()}</span>
                </button>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-heading font-bold text-slate-800 text-base">Your Bag is Empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Looks like you haven't added any sweet picks for your little humans yet!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-slate-800"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              /* Item List */
              <>
                {/* Free Shipping Alert Bar */}
                <div className="p-3 bg-sky-50 rounded-xl text-xs text-sky-800 border border-sky-100">
                  {rawSubtotal >= shippingThreshold ? (
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      🎉 Congratulations! You have unlocked FREE Express Delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{shippingThreshold - rawSubtotal}</strong> more for <strong>FREE Delivery</strong>!
                    </span>
                  )}
                  {/* Mini progress bar */}
                  <div className="w-full bg-sky-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (rawSubtotal / shippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="pt-3 flex gap-3 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-800 truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {item.product.brand} · {item.selectedSize || item.product.sizes?.[0] || 'Standard'}
                        </p>
                        <p className="text-xs font-bold text-slate-900 mt-1">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2 text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-3 border-t border-slate-100">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code (e.g. LILHUMANS15)"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase text-slate-800 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponSuccess && <p className="text-[11px] text-emerald-600 mt-1 font-medium">{couponSuccess}</p>}
                  {couponError && <p className="text-[11px] text-rose-500 mt-1 font-medium">{couponError}</p>}
                </div>
              </>
            )}

          </div>

          {/* Footer Subtotal & Action */}
          {!orderPlaced && cartItems.length > 0 && !isCheckingOut && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{rawSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-base text-slate-900">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
