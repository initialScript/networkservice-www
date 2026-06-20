'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, Package, ArrowRight, Download, 
  Home, User, Mail, Phone, Building2, MapPin, Truck,
  CreditCard, Calendar, FileText, Receipt, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Types based on your API response
interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  sku_snapshot: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderData {
  id: string;
  user_id: string | null;
  address_id: string | null;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  guest_company: string | null;
  guest_ice: string | null;
  guest_billing_address: {
    city: string;
    postal_code: string;
    address_line: string;
  };
  guest_shipping_address: {
    city: string;
    phone: string;
    full_name: string;
    postal_code: string;
    address_line: string;
  } | null;
  order_number: string;
  status: string;
  subtotal: string;
  shipping_fee: string;
  discount: string;
  total: string;
  payment_method: string;
  payment_status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  OrderItems: OrderItem[];
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get('id');
    const orderNumber = searchParams.get('order');
    const total = searchParams.get('total');

    // Try to get full order data from session storage
    const storedOrder = sessionStorage.getItem('lastOrderData');
    
    if (storedOrder) {
      try {
        const parsedData = JSON.parse(storedOrder);
        if (parsedData.id === orderId) {
          setOrderData(parsedData);
          console.log('📄 Loaded order from session:', parsedData);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored order:', e);
      }
    }

    // If we have the ID, we could fetch the full order from API
    if (orderId && orderNumber) {
      setOrderData({
        id: orderId,
        user_id: null,
        address_id: null,
        guest_first_name: 'Client',
        guest_last_name: '',
        guest_email: '',
        guest_phone: '',
        guest_company: null,
        guest_ice: null,
        guest_billing_address: {
          city: '',
          postal_code: '',
          address_line: ''
        },
        guest_shipping_address: null,
        order_number: orderNumber,
        status: 'pending',
        subtotal: total || '0',
        shipping_fee: '0',
        discount: '0',
        total: total || '0',
        payment_method: 'cod',
        payment_status: 'unpaid',
        notes: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        OrderItems: []
      });
    } else {
      router.push('/');
    }
    
    setLoading(false);
  }, [searchParams, router]);

 const downloadPDF = async () => {
  if (!orderData) return;
  
  setDownloading(true);
  
  try {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    
    const primaryColor = [15, 52, 96];
    const accentColor = [233, 69, 96];
    const grayColor = [100, 100, 100];
    const lightGrayColor = [245, 247, 250];
    
    let yPos = 20;
    
    // ===== HEADER =====
    // Logo area - Company name
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('VOTRE BOUTIQUE', margin, 28);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Commande confirmée', margin, 38);
    
    // Order number and date on the right
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`N° ${orderData.order_number}`, pageWidth - margin - 40, 25, { align: 'right' });
    
    const orderDate = new Date(orderData.createdAt);
    const formattedDate = format(orderDate, 'dd/MM/yyyy à HH:mm', { locale: fr });
    doc.setFontSize(9);
    doc.text(`Date: ${formattedDate}`, pageWidth - margin, 35, { align: 'right' });
    
    yPos = 60;
    
    // ===== SUCCESS MESSAGE =====
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('✅ Merci pour votre commande !', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('Nous avons bien reçu votre commande et nous la traitons dans les plus brefs délais.', margin, yPos);
    yPos += 15;
    
    // ===== CUSTOMER INFORMATION =====
    doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 55, 'F');
    doc.rect(margin, yPos, pageWidth - (margin * 2), 55, 'S');
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('👤 INFORMATIONS CLIENT', margin + 8, yPos + 10);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const fullName = `${orderData.guest_first_name} ${orderData.guest_last_name}`.trim();
    
    // Left column
    let leftX = margin + 8;
    let rightX = pageWidth - margin - 80;
    let textY = yPos + 22;
    
    doc.text(`Nom complet: ${fullName || 'Non renseigné'}`, leftX, textY);
    textY += 8;
    doc.text(`Email: ${orderData.guest_email || 'Non renseigné'}`, leftX, textY);
    textY += 8;
    doc.text(`Téléphone: ${orderData.guest_phone || 'Non renseigné'}`, leftX, textY);
    
    // Right column
    textY = yPos + 22;
    if (orderData.guest_company) {
      doc.text(`Société: ${orderData.guest_company}`, rightX, textY);
      textY += 8;
    }
    if (orderData.guest_ice) {
      doc.text(`ICE: ${orderData.guest_ice}`, rightX, textY);
      textY += 8;
    }
    
    yPos += 70;
    
    // ===== ADDRESSES =====
    // Billing Address
    doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.rect(margin, yPos, (pageWidth - (margin * 2) - 10) / 2, 45, 'F');
    doc.rect(margin, yPos, (pageWidth - (margin * 2) - 10) / 2, 45, 'S');
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('📦 Adresse de facturation', margin + 8, yPos + 10);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(fullName, margin + 8, yPos + 22);
    doc.text(orderData.guest_billing_address.address_line || 'Non renseigné', margin + 8, yPos + 32);
    doc.text(
      `${orderData.guest_billing_address.postal_code || ''} ${orderData.guest_billing_address.city || ''}`.trim() || 'Non renseigné',
      margin + 8,
      yPos + 42
    );
    
    // Shipping Address
    const shippingX = margin + (pageWidth - (margin * 2) - 10) / 2 + 10;
    doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.rect(shippingX, yPos, (pageWidth - (margin * 2) - 10) / 2, 45, 'F');
    doc.rect(shippingX, yPos, (pageWidth - (margin * 2) - 10) / 2, 45, 'S');
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('🚚 Adresse de livraison', shippingX + 8, yPos + 10);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    if (orderData.guest_shipping_address) {
      const shippingName = orderData.guest_shipping_address.full_name || fullName;
      doc.text(shippingName, shippingX + 8, yPos + 22);
      doc.text(orderData.guest_shipping_address.address_line || 'Non renseigné', shippingX + 8, yPos + 32);
      doc.text(
        `${orderData.guest_shipping_address.postal_code || ''} ${orderData.guest_shipping_address.city || ''}`.trim() || 'Non renseigné',
        shippingX + 8,
        yPos + 42
      );
    } else {
      doc.text('Même adresse que la facturation', shippingX + 8, yPos + 25);
    }
    
    yPos += 60;
    
    // ===== ORDER ITEMS TABLE =====
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('🛍️ Articles commandés', margin, yPos);
    yPos += 8;
    
    if (orderData.OrderItems.length > 0) {
      const tableData = orderData.OrderItems.map(item => [
        item.sku_snapshot || 'N/A',
        `${item.quantity}`,
        `${parseFloat(item.unit_price).toFixed(2)} DH`,
        `${parseFloat(item.total_price).toFixed(2)} DH`
      ]);
      
      (doc as any).autoTable({
        startY: yPos,
        head: [['RÉFÉRENCE', 'QTÉ', 'PRIX UNITAIRE', 'TOTAL']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          cellPadding: 3
        },
        bodyStyles: {
          fontSize: 9,
          valign: 'middle',
          cellPadding: 3
        },
        columnStyles: {
          0: { cellWidth: 80, halign: 'left' },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 50, halign: 'right' },
          3: { cellWidth: 50, halign: 'right' }
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        margin: { left: margin, right: margin }
      });
      
      const finalY = (doc as any).lastAutoTable.finalY + 8;
      
      // ===== TOTALS =====
      const subtotal = parseFloat(orderData.subtotal) || 0;
      const shippingFee = parseFloat(orderData.shipping_fee) || 0;
      const discount = parseFloat(orderData.discount) || 0;
      const total = parseFloat(orderData.total) || 0;
      
      // Box for totals
      const totalBoxX = pageWidth - margin - 70;
      const totalBoxY = finalY;
      
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.3);
      doc.rect(totalBoxX, totalBoxY, 70, 40, 'S');
      
      doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
      doc.rect(totalBoxX, totalBoxY, 70, 40, 'F');
      
      let totalY = totalBoxY + 8;
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Sous-total:', totalBoxX + 5, totalY);
      doc.text(`${subtotal.toFixed(2)} DH`, totalBoxX + 65, totalY, { align: 'right' });
      totalY += 7;
      
      doc.text('Livraison:', totalBoxX + 5, totalY);
      doc.text(`${shippingFee.toFixed(2)} DH`, totalBoxX + 65, totalY, { align: 'right' });
      totalY += 7;
      
      if (discount > 0) {
        doc.text('Réduction:', totalBoxX + 5, totalY);
        doc.text(`-${discount.toFixed(2)} DH`, totalBoxX + 65, totalY, { align: 'right' });
        totalY += 7;
      }
      
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.line(totalBoxX + 5, totalY - 2, totalBoxX + 65, totalY - 2);
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL:', totalBoxX + 5, totalY + 7);
      doc.text(`${total.toFixed(2)} DH`, totalBoxX + 65, totalY + 7, { align: 'right' });
      
      yPos = finalY + 55;
    } else {
      yPos += 20;
    }
    
    // ===== PAYMENT METHOD =====
    doc.setFillColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'F');
    doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'S');
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('💳 Mode de paiement', margin + 8, yPos + 9);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const paymentMethodMap: Record<string, string> = {
      cod: 'Paiement à la livraison (espèces)',
      card: 'Carte bancaire',
      bank_transfer: 'Virement bancaire'
    };
    doc.text(
      paymentMethodMap[orderData.payment_method] || orderData.payment_method,
      margin + 8,
      yPos + 19
    );
    
    yPos += 35;
    
    // ===== NOTES =====
    if (orderData.notes) {
      doc.setFillColor(255, 248, 230);
      doc.rect(margin, yPos, pageWidth - (margin * 2), 30, 'F');
      doc.rect(margin, yPos, pageWidth - (margin * 2), 30, 'S');
      
      doc.setTextColor(200, 150, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('📝 Instructions particulières', margin + 8, yPos + 9);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const splitNotes = doc.splitTextToSize(orderData.notes, pageWidth - (margin * 2) - 30);
      doc.text(splitNotes, margin + 8, yPos + 20);
      
      yPos += 40;
    }
    
    // ===== FOOTER =====
    const footerY = pageHeight - 15;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Merci de votre confiance. Pour toute question, contactez notre service client.',
      margin,
      footerY + 3
    );
    doc.text(
      `Généré le ${format(new Date(), 'dd/MM/yyyy HH:mm')}`,
      pageWidth - margin,
      footerY + 3,
      { align: 'right' }
    );
    
    // Save PDF
    doc.save(`commande-${orderData.order_number}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Une erreur est survenue lors de la génération du PDF');
  } finally {
    setDownloading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0F3460] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Commande non trouvée</h2>
          <p className="text-gray-500 mb-4">Nous n'avons pas pu trouver les détails de votre commande.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0F3460] text-white rounded-lg hover:bg-[#0a2444] transition"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${orderData.guest_first_name} ${orderData.guest_last_name}`.trim();
  const orderDate = new Date(orderData.createdAt);
  const formattedDate = format(orderDate, 'dd MMMM yyyy à HH:mm', { locale: fr });
  const subtotal = parseFloat(orderData.subtotal) || 0;
  const total = parseFloat(orderData.total) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Commande confirmée !
              </h1>
              <p className="text-gray-600 text-sm">
                Merci {fullName || 'cher client'} pour votre commande
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F3460] text-white rounded-lg hover:bg-[#0a2444] transition disabled:opacity-50 text-sm"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </>
              )}
            </button>
            
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#0F3460]" />
              Détails de la commande
            </h2>
            <div className="text-right">
              <span className="text-xs text-gray-500">N° commande</span>
              <p className="font-mono font-bold text-sm text-[#0F3460]">
                {orderData.order_number}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-medium text-gray-500 pb-2 border-b border-gray-100">
              <span className="col-span-2">Produit</span>
              <span className="text-center">Qté</span>
              <span className="text-right">Total</span>
            </div>
            
            {orderData.OrderItems.map((item) => (
              <div key={item.id} className="grid grid-cols-4 items-center py-2 border-b border-gray-50 last:border-0">
                <span className="col-span-2 font-medium text-sm text-gray-800">
                  {item.sku_snapshot || 'Produit'}
                </span>
                <span className="text-center text-sm text-gray-600">×{item.quantity}</span>
                <span className="text-right font-semibold text-sm text-gray-900">
                  {parseFloat(item.total_price).toFixed(2)} DH
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sous-total</span>
              <span className="text-gray-900">{subtotal.toFixed(2)} DH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Frais de livraison</span>
              <span className="text-gray-900">0.00 DH</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#0F3460]">{total.toFixed(2)} DH</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#0F3460]" />
            Informations client
          </h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{fullName || 'Non renseigné'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{orderData.guest_email || 'Non renseigné'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{orderData.guest_phone || 'Non renseigné'}</span>
            </div>
            {orderData.guest_company && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{orderData.guest_company}</span>
              </div>
            )}
            {orderData.guest_ice && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">ICE: {orderData.guest_ice}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Commandé le {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#0F3460]" />
                Adresse de facturation
              </h3>
              <div className="text-sm text-gray-600 space-y-1 pl-6">
                <p className="font-medium text-gray-800">{fullName}</p>
                <p>{orderData.guest_billing_address.address_line || 'Non renseigné'}</p>
                <p>
                  {orderData.guest_billing_address.postal_code || ''} {orderData.guest_billing_address.city || ''}
                </p>
                <p className="text-xs text-gray-400">{orderData.guest_phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E94560]" />
                Adresse de livraison
              </h3>
              <div className="text-sm text-gray-600 space-y-1 pl-6">
                {orderData.guest_shipping_address ? (
                  <>
                    <p className="font-medium text-gray-800">
                      {orderData.guest_shipping_address.full_name || fullName}
                    </p>
                    <p>{orderData.guest_shipping_address.address_line || 'Non renseigné'}</p>
                    <p>
                      {orderData.guest_shipping_address.postal_code || ''} {orderData.guest_shipping_address.city || ''}
                    </p>
                    <p className="text-xs text-gray-400">{orderData.guest_shipping_address.phone || orderData.guest_phone}</p>
                  </>
                ) : (
                  <p className="italic">Même adresse que la facturation</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Notes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0F3460]" />
                Mode de paiement
              </h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-800">Paiement à la livraison</p>
                <p className="text-xs text-gray-500 mt-1">Payez en espèces à la réception</p>
              </div>
            </div>
            
            {orderData.notes && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E94560]" />
                  Instructions
                </h3>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-blue-800">{orderData.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className=''>
          <Link
              href="/catalogue"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0F3460] text-white rounded-lg hover:bg-[#0a2444] transition disabled:opacity-50 text-sm"
            >
              <ArrowRight className="w-4 h-4" />
              Continuer mes achats
            </Link>
        </div>
      </div>
      
    </div>
  );
}