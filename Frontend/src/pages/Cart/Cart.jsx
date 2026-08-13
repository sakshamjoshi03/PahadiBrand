import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotifications } from "../../components/UI/NotificationProvider";
import { getProductById } from "../../services/productService";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ChevronLeft, 
  CheckCircle,
  CreditCard,
  Truck,
  Sparkles
} from "lucide-react";
import "./Cart.css";

export default function Cart({ darkMode }) {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const { addNotification } = useNotifications();

  // Real-time backend enriched product data state
  const [enrichedProducts, setEnrichedProducts] = useState({});

  // Simulated Checkout Stepper State: 'cart' | 'checkout' | 'success'
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "cod"
  });
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse price safely
  const parsePrice = (priceVal) => {
    if (priceVal === undefined || priceVal === null) return 0;
    if (typeof priceVal === "number") return priceVal;
    const cleaned = priceVal.toString().replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Format price helper
  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  // Fetch real-time product details from the backend (latest image URL, stock, price)
  useEffect(() => {
    let active = true;
    const fetchLatestDetails = async () => {
      if (cartItems.length === 0) return;
      
      const newEnriched = { ...enrichedProducts };
      let updated = false;

      for (const item of cartItems) {
        const productId = item.product?._id || item.product?.id;
        if (productId && !newEnriched[productId]) {
          try {
            const data = await getProductById(productId);
            if (data && active) {
              newEnriched[productId] = data;
              updated = true;
            }
          } catch (err) {
            console.error(`Failed to fetch product ${productId} in real-time:`, err);
          }
        }
      }

      if (updated && active) {
        setEnrichedProducts(newEnriched);
      }
    };

    fetchLatestDetails();

    return () => {
      active = false;
    };
  }, [cartItems]);

  // Calculations (utilizing real-time pricing from backend)
  const subtotal = cartItems.reduce((total, item) => {
    const productId = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
    const realProduct = enrichedProducts[productId] || item.product;
    return total + parsePrice(realProduct?.price) * (item.quantity || 1);
  }, 0);
  
  const shippingThreshold = 1000;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 99;
  const total = subtotal + shippingCost;

  const getProductImage = (product) => {
    if (!product) return "/placeholder.jpg";
    
    let imageUrl = "";
    
    // Check if the backend images array is present and has items
    if (Array.isArray(product.images) && product.images.length > 0) {
      const primaryImg = product.images.find(img => img.isPrimary) || product.images[0];
      imageUrl = primaryImg?.url || "";
    } else if (product.image) {
      imageUrl = product.image;
    } else if (product.images && typeof product.images === "string") {
      imageUrl = product.images;
    }

    if (!imageUrl) return "/placeholder.jpg";

    // Prefix relative backend upload paths with backend server host url
    if (imageUrl.startsWith("uploads/") || imageUrl.startsWith("/uploads/")) {
      const backendHost = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
      return `${backendHost}${cleanPath}`;
    }

    return imageUrl;
  };

  const handleQuantityDecrement = (item) => {
    const productId = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
    if (item.quantity <= 1) {
      if (confirm(`Remove "${item.product?.name || "this item"}" from cart?`)) {
        removeFromCart(productId);
        if (addNotification) addNotification("Item removed from cart.", "info");
      }
    } else {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  const handleQuantityIncrement = (item) => {
    const productId = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
    updateQuantity(productId, item.quantity + 1);
  };

  const handleRemoveItem = (item) => {
    const productId = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
    removeFromCart(productId);
    if (addNotification) addNotification("Item removed from cart.", "info");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep("checkout");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.address || !shippingForm.city || !shippingForm.postalCode) {
      if (addNotification) addNotification("Please fill in all required shipping fields.", "warning");
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement processing time
    setTimeout(() => {
      const generatedOrderId = `PB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrderId);
      setIsSubmitting(false);
      setCheckoutStep("success");
      if (addNotification) addNotification("Order placed successfully!", "success");
      clearCart();
    }, 1500);
  };

  // Render Step 1: Cart Items List
  if (checkoutStep === "cart") {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container">
          <div className="cart-header-row">
            <Link to="/" className="continue-shopping-btn">
              <ChevronLeft size={18} />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="cart-title">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon-wrapper">
                <ShoppingBag size={48} className="empty-cart-icon" />
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet. Explore our fresh organic Pahadi products!</p>
              <Link to="/" className="explore-products-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="cart-grid">
              {/* Left Column: Items */}
              <div className="cart-items-section">
                {subtotal < shippingThreshold && (
                  <div className="shipping-alert">
                    <Sparkles size={16} className="shipping-alert-icon" />
                    <span>
                      Add <strong>{formatPrice(shippingThreshold - subtotal)}</strong> more for <strong>FREE Shipping</strong>!
                    </span>
                  </div>
                )}

                <div className="cart-list">
                  {cartItems.map((item, index) => {
                    const productId = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
                    const realProduct = enrichedProducts[productId] || item.product;
                    const name = realProduct?.name || realProduct?.title || "Pahadi Product";
                    const price = parsePrice(realProduct?.price);
                    const imageSrc = getProductImage(realProduct);

                    return (
                      <div key={productId || index} className="cart-item-card">
                        <div className="cart-item-image-container">
                          <img 
                            src={imageSrc} 
                            alt={name} 
                            onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                          />
                        </div>

                        <div className="cart-item-details">
                          <div className="cart-item-info-header">
                            <h3 className="cart-item-name">{name}</h3>
                            <p className="cart-item-category">{item.product?.category || "Organic"}</p>
                          </div>
                          
                          <div className="cart-item-price-row">
                            <span className="cart-item-price">{formatPrice(price)}</span>
                          </div>
                        </div>

                        <div className="cart-item-actions-wrapper">
                          <div className="quantity-controls">
                            <button 
                              type="button" 
                              className="qty-btn"
                              onClick={() => handleQuantityDecrement(item)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="qty-val">{item.quantity}</span>
                            <button 
                              type="button" 
                              className="qty-btn"
                              onClick={() => handleQuantityIncrement(item)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button 
                            type="button" 
                            className="remove-item-btn"
                            onClick={() => handleRemoveItem(item)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="cart-summary-section">
                <div className="order-summary-card">
                  <h2>Order Summary</h2>
                  
                  <div className="summary-row">
                    <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                    <span className="summary-val">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping estimate</span>
                    <span className="summary-val shipping-val">
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Tax estimate</span>
                    <span className="summary-val text-muted">Calculated at checkout</span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span className="summary-val total-val">{formatPrice(total)}</span>
                  </div>

                  <button 
                    type="button" 
                    className="checkout-proceed-btn"
                    onClick={handleProceedToCheckout}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="security-assurance">
                    <CheckCircle size={14} />
                    <span>Secure checkout powered by PahadiBrand</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render Step 2: Checkout Form
  if (checkoutStep === "checkout") {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container checkout-container">
          <div className="cart-header-row">
            <button 
              type="button" 
              className="continue-shopping-btn"
              onClick={() => setCheckoutStep("cart")}
            >
              <ChevronLeft size={18} />
              <span>Back to Cart</span>
            </button>
            <h1 className="cart-title">Billing & Shipping</h1>
          </div>

          <div className="cart-grid">
            {/* Left Side: Shipping Form */}
            <div className="cart-items-section">
              <form onSubmit={handlePlaceOrder} className="checkout-form-card">
                <h2>Shipping Address</h2>
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="checkout-name">Full Name *</label>
                    <input 
                      id="checkout-name"
                      type="text" 
                      name="name"
                      value={shippingForm.name} 
                      onChange={handleInputChange} 
                      placeholder="Saksham Joshi"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-email">Email Address</label>
                    <input 
                      id="checkout-email"
                      type="email" 
                      name="email"
                      value={shippingForm.email} 
                      onChange={handleInputChange} 
                      placeholder="saksham@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-address">Street Address *</label>
                  <input 
                    id="checkout-address"
                    type="text" 
                    name="address"
                    value={shippingForm.address} 
                    onChange={handleInputChange} 
                    placeholder="12 Main Street, Almora Market"
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="checkout-city">City *</label>
                    <input 
                      id="checkout-city"
                      type="text" 
                      name="city"
                      value={shippingForm.city} 
                      onChange={handleInputChange} 
                      placeholder="Almora"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-postalCode">Postal Code / PIN *</label>
                    <input 
                      id="checkout-postalCode"
                      type="text" 
                      name="postalCode"
                      value={shippingForm.postalCode} 
                      onChange={handleInputChange} 
                      placeholder="263601"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-phone">Phone Number</label>
                    <input 
                      id="checkout-phone"
                      type="tel" 
                      name="phone"
                      value={shippingForm.phone} 
                      onChange={handleInputChange} 
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="payment-method-section">
                  <h2>Payment Method</h2>
                  <div className="payment-methods-grid">
                    <label className={`payment-method-option ${shippingForm.paymentMethod === "cod" ? "selected" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={shippingForm.paymentMethod === "cod"}
                        onChange={handleInputChange}
                      />
                      <Truck size={20} />
                      <div className="payment-option-details">
                        <span className="payment-name">Cash on Delivery (COD)</span>
                        <span className="payment-desc">Pay with cash upon delivery</span>
                      </div>
                    </label>

                    <label className={`payment-method-option ${shippingForm.paymentMethod === "card" ? "selected" : ""}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={shippingForm.paymentMethod === "card"}
                        onChange={handleInputChange}
                      />
                      <CreditCard size={20} />
                      <div className="payment-option-details">
                        <span className="payment-name">Simulated Card</span>
                        <span className="payment-desc">Instant online processing</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="checkout-proceed-btn place-order-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Place Order ({formatPrice(total)})</span>
                      <CheckCircle size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side: Order Summary sticky */}
            <div className="cart-summary-section">
              <div className="order-summary-card">
                <h2>Your Order</h2>
                <div className="checkout-summary-items">
                  {cartItems.map((item, idx) => {
                    const productId = item.product?._id || item.product?.id || item.product?.name || item.product?.title;
                    const realProduct = enrichedProducts[productId] || item.product;
                    const price = parsePrice(realProduct?.price);
                    const name = realProduct?.name || "Product";
                    return (
                      <div key={idx} className="checkout-summary-item">
                        <span className="summary-item-name-qty">
                          {name} <span className="summary-item-qty">x{item.quantity}</span>
                        </span>
                        <span className="summary-item-total">{formatPrice(price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total-row">
                  <span>Total Due</span>
                  <span className="total-val">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 3: Success Confirmation Page
  if (checkoutStep === "success") {
    return (
      <div className="cart-page-wrapper">
        <div className="success-page-container">
          <div className="success-card">
            <div className="success-icon-badge">
              <CheckCircle size={64} className="success-icon animate-pop" />
            </div>
            
            <h1 className="success-title">Order Confirmed!</h1>
            <p className="success-tagline">Thank you for your purchase from PahadiBrand.</p>

            <div className="success-order-details">
              <div className="order-detail-row">
                <span className="detail-label">Order Reference:</span>
                <span className="detail-value order-id-value">{orderId}</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">Delivery Estimate:</span>
                <span className="detail-value">5 - 7 Business Days</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value status-badge">Preparing Shipment</span>
              </div>
            </div>

            <div className="success-assurance-info">
              <p>A simulated receipt and tracking details have been sent to your email. We're getting your fresh organic Pahadi treasures ready!</p>
            </div>

            <div className="success-action-row">
              <button 
                type="button" 
                className="explore-products-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
