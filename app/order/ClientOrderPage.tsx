'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  MapPin, CreditCard, CheckCircle, ChevronRight, ChevronLeft, 
  Truck, ArrowRight, Edit, Trash2, Plus,
  Package, User, Mail, Building2, CreditCard as CreditCardIcon,
  Home, Send, Check, AlertCircle, X,
  Info
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Address {
  id: number;
  address_line: string;
  city: string;
  postal_code?: string;
  is_default?: boolean;
}

interface CustomerInfo {
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  ice?: string;
  address: Address;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  address_line?: string;
  city?: string;
  delivery_address_line?: string;
  delivery_city?: string;
}

const STEPS = [
  { id: 1, name: 'Informations', icon: User },
  { id: 2, name: 'Adresse de livraison', icon: MapPin },
  { id: 3, name: 'Paiement', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: CheckCircle },
];

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Paiement à la livraison', description: 'Payez en espèces à la réception', icon: '💰' },
];

const ClientOrderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { items, subtotal, clearCart, hydrate } = useCartStore();

  const [currentStep, setCurrentStep] = useState(1);
  
  // Customer info with main address
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    ice: '',
    address: {
      id: Date.now(),
      address_line: '',
      city: '',
      postal_code: '',
      is_default: true,
    }
  });
  
  // Delivery address (optional)
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    id: Date.now() + 1,
    address_line: '',
    city: '',
    postal_code: '',
  });
  
  // Which address to use for delivery: 'main' or 'delivery'
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'main' | 'delivery'>('main');
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  // Hydrate cart
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const total = Math.max(0, subtotal);

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!customerInfo.full_name.trim()) {
      newErrors.full_name = 'Le nom complet est requis';
    }
    
    if (!customerInfo.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9]{9,10}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    if (!customerInfo.address.address_line.trim()) {
      newErrors.address_line = 'L\'adresse est requise';
    }
    
    if (!customerInfo.address.city.trim()) {
      newErrors.city = 'La ville est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleAddDeliveryAddress = () => {
    if (!deliveryAddress.address_line.trim() || !deliveryAddress.city.trim()) {
      setErrors({
        delivery_address_line: !deliveryAddress.address_line.trim() ? 'L\'adresse de livraison est requise' : undefined,
        delivery_city: !deliveryAddress.city.trim() ? 'La ville de livraison est requise' : undefined,
      });
      return;
    }
    setErrors({});
    setShowDeliveryAddress(true);
    setSelectedDeliveryOption('delivery');
    setShowDeliveryForm(false);
  };

  const handleRemoveDeliveryAddress = () => {
    setShowDeliveryAddress(false);
    setSelectedDeliveryOption('main');
    setDeliveryAddress({
      id: Date.now() + 1,
      address_line: '',
      city: '',
      postal_code: '',
    });
    setErrors({});
    setShowDeliveryForm(false);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
      return;
    }
    
    if (currentStep === 2) {
      // If delivery address is shown but empty, use main address
      if (showDeliveryAddress && (!deliveryAddress.address_line.trim() || !deliveryAddress.city.trim())) {
        setSelectedDeliveryOption('main');
        setShowDeliveryAddress(false);
        setShowDeliveryForm(false);
        setErrors({});
        setCurrentStep(3);
        return;
      }
      
      // If delivery form is shown but not saved, use main address
      if (showDeliveryForm) {
        setShowDeliveryForm(false);
        setSelectedDeliveryOption('main');
        setErrors({});
        setCurrentStep(3);
        return;
      }
      
      setCurrentStep(3);
      return;
    }
    
    if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      setErrors({});
    }
  };

  const handleSelectDelivery = (option: 'main' | 'delivery') => {
    setSelectedDeliveryOption(option);
  };

const handleSubmitOrder = async () => {
  if (items.length === 0) {
    alert('Votre panier est vide');
    return;
  }
  
  setSubmitting(true);
  
  try {
    // Determine which address to use for delivery
    const useDeliveryAddress = selectedDeliveryOption === 'delivery' && showDeliveryAddress;
    
    const orderData = {
      customer: {
        full_name: customerInfo.full_name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        company: customerInfo.company || null,
        ice: customerInfo.ice || null,
        address: {
          address_line: customerInfo.address.address_line,
          city: customerInfo.address.city,
          postal_code: customerInfo.address.postal_code || null,
        }
      },
      delivery_address: useDeliveryAddress ? {
        address_line: deliveryAddress.address_line,
        city: deliveryAddress.city,
        postal_code: deliveryAddress.postal_code || null,
      } : null,
      payment_method: paymentMethod,
      notes: notes || null,
    };
    
    // Send to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.errors?.[0]?.message || result.message || 'Failed to create order');
    }

    const orderNumber = result.data.order_number;

    // Save to localStorage as backup (with order number from backend)
    const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    localStorage.setItem('user_orders', JSON.stringify([{
      ...orderData,
      order_number: orderNumber,
      date: new Date().toISOString(),
    }, ...existingOrders]));

    clearCart();

    // Redirect to success page with order number from backend
    router.push(`/order/success?order=${orderNumber}&method=${paymentMethod}`);

  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    setSubmitting(false);
  }
};

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
            onClick={() => router.push(`/catalogue`)}
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

      {/* Stepper with clickable links */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep}
                className={cn(
                  'flex flex-col items-center transition-all',
                  step.id < currentStep && 'cursor-pointer',
                  step.id > currentStep && 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    currentStep >= step.id
                      ? 'bg-[#0F3460] text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className="text-xs font-medium text-gray-500 mt-1 whitespace-nowrap">
                  {step.name}
                </span>
              </button>
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
          {/* Step 1: Customer Information + Main Address */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0F3460]" />
                Vos informations
              </h2>
              
              <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                {/* Full Name - Single field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={customerInfo.full_name}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, full_name: e.target.value });
                        if (errors.full_name) setErrors({ ...errors, full_name: undefined });
                      }}
                      className={cn(
                        "w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                        errors.full_name ? "border-red-500" : "border-gray-200"
                      )}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  {errors.full_name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.full_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={cn(
                        "w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                        errors.email ? "border-red-500" : "border-gray-200"
                      )}
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">+212</span>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={cn(
                        "w-full pl-12 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                        errors.phone ? "border-red-500" : "border-gray-200"
                      )}
                      placeholder="6XXXXXXXX"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Société / Organisme <span className="text-gray-400 text-xs">(Optionnel)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={customerInfo.company}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
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
                      value={customerInfo.ice}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, ice: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                      placeholder="Identifiant Commun de l'Entreprise"
                    />
                  </div>
                </div>

                {/* Main Address Section inside Step 1 */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#0F3460]" />
                    Adresse principale <span className="text-red-500">*</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Adresse"
                        value={customerInfo.address.address_line}
                        onChange={(e) => {
                          setCustomerInfo({ 
                            ...customerInfo, 
                            address: { ...customerInfo.address, address_line: e.target.value }
                          });
                          if (errors.address_line) setErrors({ ...errors, address_line: undefined });
                        }}
                        className={cn(
                          "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                          errors.address_line ? "border-red-500" : "border-gray-200"
                        )}
                      />
                      {errors.address_line && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.address_line}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Code postal"
                        value={customerInfo.address.postal_code}
                        onChange={(e) => setCustomerInfo({
                          ...customerInfo,
                          address: { ...customerInfo.address, postal_code: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        required
                      />
                      <div>
                        <input
                          type="text"
                          placeholder="Ville"
                          value={customerInfo.address.city}
                          onChange={(e) => {
                            setCustomerInfo({ 
                              ...customerInfo, 
                              address: { ...customerInfo.address, city: e.target.value }
                            });
                            if (errors.city) setErrors({ ...errors, city: undefined });
                          }}
                          className={cn(
                            "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                            errors.city ? "border-red-500" : "border-gray-200"
                          )}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Delivery Address (Optional) */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0F3460]" />
                Adresse de livraison
              </h2>

              <div className="space-y-4">
                {/* Main Address Option */}
                <div 
                  className={cn(
                    "border-2 rounded-xl p-4 cursor-pointer transition-all",
                    selectedDeliveryOption === 'main' 
                      ? "border-[#0F3460] bg-[#0F3460]/5" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleSelectDelivery('main')}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0",
                      selectedDeliveryOption === 'main' 
                        ? "border-[#0F3460] bg-[#0F3460]" 
                        : "border-gray-300"
                    )}>
                      {selectedDeliveryOption === 'main' && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-[#0F3460]" />
                        <p className="font-semibold text-gray-800">Adresse principale</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Facturation</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{customerInfo.full_name}</p>
                      <p className="text-sm text-gray-600">{customerInfo.address.address_line}</p>
                      <p className="text-sm text-gray-600">
                        {customerInfo.address.postal_code && `${customerInfo.address.postal_code}, `}
                        {customerInfo.address.city}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{customerInfo.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address Option */}
                {showDeliveryAddress && deliveryAddress.address_line && (
                  <div 
                    className={cn(
                      "border-2 rounded-xl p-4 cursor-pointer transition-all",
                      selectedDeliveryOption === 'delivery' 
                        ? "border-[#0F3460] bg-[#0F3460]/5" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => handleSelectDelivery('delivery')}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0",
                        selectedDeliveryOption === 'delivery' 
                          ? "border-[#0F3460] bg-[#0F3460]" 
                          : "border-gray-300"
                      )}>
                        {selectedDeliveryOption === 'delivery' && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-[#0F3460]" />
                            <p className="font-semibold text-gray-800">Adresse de livraison</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveDeliveryAddress();
                            }}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{deliveryAddress.address_line}</p>
                        <p className="text-sm text-gray-600">
                          {deliveryAddress.postal_code && `${deliveryAddress.postal_code}, `}
                          {deliveryAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add Delivery Address Button or Form */}
                {!showDeliveryAddress ? (
                  <button
                    onClick={() => setShowDeliveryForm(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#0F3460] hover:bg-gray-100 transition"
                  >
                    <Send className="w-4 h-4" />
                    Ajouter une adresse de livraison différente
                  </button>
                ) : null}

                {/* Delivery Address Form */}
                {showDeliveryForm && !showDeliveryAddress && (
                  <div className="mt-4 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#0F3460]" />
                        Nouvelle adresse de livraison
                      </h3>
                      <button
                        onClick={() => {
                          setShowDeliveryForm(false);
                          setErrors({});
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Adresse"
                          value={deliveryAddress.address_line}
                          onChange={(e) => {
                            setDeliveryAddress({ ...deliveryAddress, address_line: e.target.value });
                            if (errors.delivery_address_line) setErrors({ ...errors, delivery_address_line: undefined });
                          }}
                          className={cn(
                            "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                            errors.delivery_address_line ? "border-red-500" : "border-gray-200"
                          )}
                        />
                        {errors.delivery_address_line && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.delivery_address_line}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Code postal"
                          value={deliveryAddress.postal_code}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postal_code: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20"
                        />
                        <div>
                          <input
                            type="text"
                            placeholder="Ville"
                            value={deliveryAddress.city}
                            onChange={(e) => {
                              setDeliveryAddress({ ...deliveryAddress, city: e.target.value });
                              if (errors.delivery_city) setErrors({ ...errors, delivery_city: undefined });
                            }}
                            className={cn(
                              "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460]/20",
                              errors.delivery_city ? "border-red-500" : "border-gray-200"
                            )}
                          />
                          {errors.delivery_city && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.delivery_city}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleAddDeliveryAddress}
                        className="w-full py-2 bg-[#0F3460] text-white rounded-lg text-sm font-semibold hover:bg-[#0a2444] transition"
                      >
                        Ajouter l'adresse
                      </button>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="mt-6">
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

                {/* Info message when no delivery address is added */}
                {!showDeliveryAddress && !showDeliveryForm && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      La livraison sera effectuée à l'adresse principale
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0F3460]" />
                Mode de paiement
              </h2>
              
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all border-[#0F3460] bg-[#0F3460]/5 ring-2 ring-[#0F3460]/20"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={true}
                      readOnly
                      className="w-4 h-4 text-[#0F3460]"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700">
                  💡 Le paiement s'effectue directement au livreur lors de la livraison de votre commande.
                  Aucun frais supplémentaire n'est appliqué.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#0F3460]" />
                Confirmation
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Client</p>
                  <p className="text-sm text-gray-600">{customerInfo.full_name}</p>
                  <p className="text-sm text-gray-600">{customerInfo.email}</p>
                  <p className="text-sm text-gray-600">+212 {customerInfo.phone}</p>
                  {customerInfo.company && (
                    <p className="text-sm text-gray-600 mt-1">{customerInfo.company}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Adresse de livraison</p>
                  {selectedDeliveryOption === 'delivery' && showDeliveryAddress ? (
                    <>
                      <p className="text-sm text-gray-600">{deliveryAddress.address_line}</p>
                      <p className="text-sm text-gray-600">
                        {deliveryAddress.postal_code && `${deliveryAddress.postal_code}, `}
                        {deliveryAddress.city}
                      </p>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">Livraison</span>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">{customerInfo.full_name}</p>
                      <p className="text-sm text-gray-600">{customerInfo.address.address_line}</p>
                      <p className="text-sm text-gray-600">
                        {customerInfo.address.postal_code && `${customerInfo.address.postal_code}, `}
                        {customerInfo.address.city}
                      </p>
                      <p className="text-sm text-gray-600">{customerInfo.phone}</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">Principale</span>
                    </>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Paiement</p>
                  <p className="text-sm text-gray-600">Paiement à la livraison</p>
                  <p className="text-sm text-gray-500">Payez en espèces à la réception</p>
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
          <div className="flex justify-between gap-3 mt-6">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Retour
              </button>
            )}
            {currentStep < 4 ? (
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
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Résumé de la commande</h3>
            
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
            
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-[#0F3460] text-xl">{formatPrice(total)} DH</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">TTC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOrderPage;