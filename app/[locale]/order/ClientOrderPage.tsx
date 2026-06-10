'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  MapPin, CreditCard, CheckCircle, ChevronRight, ChevronLeft, 
  Truck, Shield, Clock, ArrowRight, Edit, Trash2, Plus, Minus,
  Package, DollarSign, Calendar, AlertCircle, X, User, Mail, Lock,
  Building2, CreditCard as CreditCardIcon, Eye, EyeOff
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Address {
  id: number;
  full_name: string;
  address_line: string;
  city: string;
  region?: string;
  phone: string;
  is_default?: boolean;
}

interface CartItem {
  product_id: string;
  name: string;
  slug: string;
  price: number;
  compare_price?: number;
  image?: string;
  quantity: number;
}

const STEPS = [
  { id: 1, name: 'Identification', icon: User },
  { id: 2, name: 'Adresse', icon: MapPin },
  { id: 3, name: 'Livraison', icon: Truck },
  { id: 4, name: 'Paiement', icon: CreditCard },
  { id: 5, name: 'Confirmation', icon: CheckCircle },
];

const DELIVERY_OPTIONS = [
  { id: 'standard', name: 'Livraison standard', price: 40, days: '3-5 jours', icon: Truck },
  { id: 'express', name: 'Livraison express', price: 80, days: '1-2 jours', icon: Clock },
  { id: 'pickup', name: 'Retrait en magasin', price: 0, days: 'Gratuit', icon: MapPin },
];

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Paiement à la livraison', description: 'Payez en espèces à la réception', icon: '💰', disabled: false },
  { id: 'card', name: 'Carte bancaire', description: 'Paiement sécurisé par carte', icon: '💳', disabled: true, badge: 'Bientôt' },
  { id: 'bank_transfer', name: 'Virement bancaire', description: 'Virement + envoi du reçu', icon: '🏦', disabled: false },
];

const ClientOrderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] ?? 'fr';
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { items, subtotal, clearCart, hydrate } = useCartStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'new' | 'existing'>('new');
  
  // New user form
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserCompany, setNewUserCompany] = useState('');
  const [newUserIce, setNewUserIce] = useState('');
  
  // Existing user form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    full_name: '',
    address_line: '',
    city: '',
    phone: '',
  });

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true);
      setCurrentStep(2);
    }
  }, [isAuthenticated]);

  // Load addresses from localStorage
  useEffect(() => {
    if (!isLoggedIn) return;
    
    const storedAddresses = JSON.parse(localStorage.getItem('user_addresses') || '[]');
    setAddresses(storedAddresses);
    
    const savedAddressId = localStorage.getItem('selected_address_id');
    if (savedAddressId) {
      const found = storedAddresses.find((a: Address) => a.id === Number(savedAddressId));
      if (found) setSelectedAddressId(Number(savedAddressId));
      else if (storedAddresses[0]?.id) setSelectedAddressId(storedAddresses[0].id);
    } else if (storedAddresses[0]?.id) {
      setSelectedAddressId(storedAddresses[0].id);
    }
  }, [isLoggedIn]);

  // Hydrate cart
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const deliveryPrice = DELIVERY_OPTIONS.find(d => d.id === deliveryOption)?.price || 0;
  const selectedAddress = addresses.find(a => a.id === selectedAddressId);
  const total = Math.max(0, subtotal + deliveryPrice - couponDiscount);

  const handleNewUserSubmit = () => {
    if (!newUserEmail || !newUserFirstName || !newUserLastName) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    // Simulate account creation
    setIsLoggedIn(true);
    setCurrentStep(2);
  };

  const handleExistingUserLogin = () => {
    if (!loginEmail || !loginPassword) {
      alert('Veuillez entrer votre email et mot de passe');
      return;
    }
    // Simulate login
    setIsLoggedIn(true);
    setCurrentStep(2);
  };

  const handleAddAddress = () => {
    if (!newAddress.full_name || !newAddress.address_line || !newAddress.city || !newAddress.phone) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    const address: Address = {
      id: Date.now(),
      ...newAddress,
      is_default: addresses.length === 0,
    };
    
    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    localStorage.setItem('user_addresses', JSON.stringify(updatedAddresses));
    setSelectedAddressId(address.id);
    localStorage.setItem('selected_address_id', String(address.id));
    setNewAddress({ full_name: '', address_line: '', city: '', phone: '' });
    setShowAddressForm(false);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      full_name: address.full_name,
      address_line: address.address_line,
      city: address.city,
      phone: address.phone,
    });
    setShowAddressForm(true);
  };

  const handleUpdateAddress = () => {
    if (!editingAddress) return;
    
    const updated = addresses.map(a => 
      a.id === editingAddress.id 
        ? { ...a, ...newAddress }
        : a
    );
    setAddresses(updated);
    localStorage.setItem('user_addresses', JSON.stringify(updated));
    setEditingAddress(null);
    setNewAddress({ full_name: '', address_line: '', city: '', phone: '' });
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id: number) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('user_addresses', JSON.stringify(updated));
    if (selectedAddressId === id) {
      const newDefault = updated[0]?.id || null;
      setSelectedAddressId(newDefault);
      if (newDefault) localStorage.setItem('selected_address_id', String(newDefault));
      else localStorage.removeItem('selected_address_id');
    }
  };

  const applyCoupon = () => {
    const validCoupons: Record<string, { discount: number; type: string }> = {
      'WELCOME10': { discount: 100, type: 'fixed' },
      'SAVE20': { discount: 20, type: 'percentage' },
    };
    
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (!coupon) {
      alert('Code promo invalide');
      return;
    }
    
    let discount = 0;
    if (coupon.type === 'fixed') {
      discount = Math.min(coupon.discount, subtotal);
    } else {
      discount = (subtotal * coupon.discount) / 100;
    }
    
    setCouponDiscount(discount);
    setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !isLoggedIn) {
      alert('Veuillez vous identifier');
      return;
    }
    if (currentStep === 2 && !selectedAddressId) {
      alert('Veuillez sélectionner une adresse');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitOrder = async () => {
    if (items.length === 0) {
      alert('Votre panier est vide');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const orderNumber = `ORD-${Date.now()}`;
      const newOrder = {
        id: Date.now(),
        order_number: orderNumber,
        date: new Date().toISOString(),
        status: 'pending',
        payment_method: paymentMethod,
        delivery_option: deliveryOption,
        delivery_price: deliveryPrice,
        subtotal: subtotal,
        discount: couponDiscount,
        total: total,
        items: items,
        address: selectedAddress,
        notes: notes || null,
        coupon: appliedCoupon,
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      localStorage.setItem('user_orders', JSON.stringify([newOrder, ...existingOrders]));
      
      clearCart();
      setOrderComplete(true);
      
      setTimeout(() => {
        router.push(`/${locale}/order/success?order=${orderNumber}&method=${paymentMethod}`);
      }, 1500);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Commande confirmée !</h2>
          <p className="text-gray-500">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Panier vide</h2>
          <p className="text-gray-500 mb-4">Ajoutez des produits avant de passer commande</p>
          <button
            onClick={() => router.push(`/${locale}/catalogue`)}
            className="bg-[#0F3460] text-white px-6 py-2 rounded-lg"
          >
            Voir les produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Commander</h1>

      {/* Stepper */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    currentStep >= step.id
                      ? 'bg-[#0F3460] text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <span className="text-xs font-medium text-gray-500 mt-1 whitespace-nowrap">
                  {step.name}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="w-16 h-0.5 mx-2 bg-gray-200">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      currentStep > step.id ? 'bg-[#0F3460] w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Step 1: Identification */}
          {currentStep === 1 && !isLoggedIn && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              {/* Toggle Buttons */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                <button
                  onClick={() => setUserType('new')}
                  className={cn(
                    'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all',
                    userType === 'new'
                      ? 'bg-[#0F3460] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  )}
                >
                  Nouveau client
                </button>
                <button
                  onClick={() => setUserType('existing')}
                  className={cn(
                    'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all',
                    userType === 'existing'
                      ? 'bg-[#0F3460] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  )}
                >
                  Déjà client
                </button>
              </div>

              {/* Nouveau Client Form */}
              {userType === 'new' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={newUserFirstName}
                          onChange={(e) => setNewUserFirstName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={newUserLastName}
                          onChange={(e) => setNewUserLastName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Société / Organisme <span className="text-gray-400 text-xs">(Optionnel)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={newUserCompany}
                        onChange={(e) => setNewUserCompany(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        placeholder="Nom de votre société"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ICE <span className="text-gray-400 text-xs">(Optionnel)</span>
                    </label>
                    <div className="relative">
                      <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={newUserIce}
                        onChange={(e) => setNewUserIce(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        placeholder="Identifiant Commun de l'Entreprise"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNewUserSubmit}
                    className="w-full mt-4 py-3 bg-[#0F3460] text-white rounded-lg font-semibold hover:bg-[#0a2444] transition"
                  >
                    Créer mon compte et continuer
                  </button>
                </div>
              )}

              {/* Déjà Client Form */}
              {userType === 'existing' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        placeholder="Votre mot de passe"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <button className="text-sm text-[#0F3460] hover:underline">
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <button
                    onClick={handleExistingUserLogin}
                    className="w-full mt-2 py-3 bg-[#0F3460] text-white rounded-lg font-semibold hover:bg-[#0a2444] transition"
                  >
                    Se connecter
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && isLoggedIn && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0F3460]" />
                Adresse de livraison
              </h2>

              {addresses.length > 0 && !showAddressForm && (
                <div className="space-y-3 mb-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="relative">
                      <label
                        className={cn(
                          'flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all',
                          selectedAddressId === addr.id
                            ? 'border-[#0F3460] bg-[#0F3460]/5 ring-2 ring-[#0F3460]/20'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 w-4 h-4 text-[#0F3460]"
                        />
                        <div className="flex-1 text-sm">
                          <p className="font-semibold text-gray-800">{addr.full_name}</p>
                          <p className="text-gray-600">{addr.address_line}</p>
                          <p className="text-gray-600">{addr.city}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{addr.phone}</p>
                        </div>
                        {addr.is_default && (
                          <span className="text-xs font-semibold text-[#0F3460] bg-[#0F3460]/10 px-2 py-0.5 rounded-full">
                            Par défaut
                          </span>
                        )}
                      </label>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="p-1 text-gray-400 hover:text-[#0F3460] transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(showAddressForm || addresses.length === 0) && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {editingAddress ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={newAddress.full_name}
                      onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                    />
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={newAddress.address_line}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                    />
                    <input
                      type="text"
                      placeholder="Ville"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                        className="flex-1 bg-[#0F3460] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0a2444] transition"
                      >
                        {editingAddress ? 'Mettre à jour' : 'Ajouter'}
                      </button>
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                          setNewAddress({ full_name: '', address_line: '', city: '', phone: '' });
                        }}
                        className="flex-1 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-[#0F3460] hover:text-[#0F3460] transition"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une nouvelle adresse
                </button>
              )}
            </div>
          )}

          {/* Step 3: Delivery */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#0F3460]" />
                Mode de livraison
              </h2>
              
              <div className="space-y-3 mb-6">
                {DELIVERY_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={cn(
                      'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all',
                      deliveryOption === option.id
                        ? 'border-[#0F3460] bg-[#0F3460]/5 ring-2 ring-[#0F3460]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={deliveryOption === option.id}
                      onChange={() => setDeliveryOption(option.id)}
                      className="w-4 h-4 text-[#0F3460]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{option.name}</p>
                      <p className="text-sm text-gray-500">Délai: {option.days}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0F3460]">
                        {option.price === 0 ? 'Gratuit' : `${formatPrice(option.price)} DH`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Instructions de livraison (optionnel)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Code d'entrée, étage, instructions particulières..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20 transition resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0F3460]" />
                Mode de paiement
              </h2>
              
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      'flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all',
                      method.disabled && 'opacity-50 cursor-not-allowed',
                      paymentMethod === method.id && !method.disabled
                        ? 'border-[#0F3460] bg-[#0F3460]/5 ring-2 ring-[#0F3460]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      disabled={method.disabled}
                      onChange={() => setPaymentMethod(method.id)}
                      className="w-4 h-4 text-[#0F3460]"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">{method.name}</p>
                        {method.badge && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            {method.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#0F3460]" />
                Confirmation
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Adresse de livraison</p>
                  <p className="text-sm text-gray-600">{selectedAddress?.full_name}</p>
                  <p className="text-sm text-gray-600">{selectedAddress?.address_line}</p>
                  <p className="text-sm text-gray-600">{selectedAddress?.city}</p>
                  <p className="text-sm text-gray-600">{selectedAddress?.phone}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Livraison</p>
                  <p className="text-sm text-gray-600">
                    {DELIVERY_OPTIONS.find(d => d.id === deliveryOption)?.name}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Paiement</p>
                  <p className="text-sm text-gray-600">
                    {PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}
                  </p>
                </div>

                {notes && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Instructions</p>
                    <p className="text-sm text-gray-600">{notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {isLoggedIn && currentStep > 1 && (
            <div className="flex justify-between gap-3 mt-6">
              {currentStep > 2 && (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0F3460] text-white rounded-lg text-sm font-semibold hover:bg-[#0a2444] transition ml-auto"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#E94560] text-white rounded-lg text-sm font-semibold hover:bg-[#c73350] transition ml-auto disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Confirmer la commande
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Résumé de la commande</h3>
            
            {/* Items preview */}
            <div className="max-h-48 overflow-y-auto mb-4 space-y-2">
              {items.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-medium text-gray-900 ml-2">
                    {formatPrice(item.price * item.quantity)} DH
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sous-total</span>
                <span className="font-medium">{formatPrice(subtotal)} DH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Livraison</span>
                <span className="font-medium">
                  {deliveryPrice === 0 ? 'Gratuit' : `${formatPrice(deliveryPrice)} DH`}
                </span>
              </div>
              
              {/* Coupon */}
              {appliedCoupon ? (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction ({appliedCoupon.code})</span>
                  <span>-{formatPrice(couponDiscount)} DH</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Code promo"
                    className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-2 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200"
                  >
                    Appliquer
                  </button>
                </div>
              )}
              
              <div className="border-t border-gray-100 pt-3 mt-2">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-[#0F3460] text-xl">{formatPrice(total)} DH</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">TTC, livraison incluse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderPage;