"use client";
import React, { useState, useEffect } from 'react';

// Props interface
interface TrackOrderModalProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

// Responsive Track Order Modal
const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ show, setShow }) => {
  const [invoice, setInvoice] = useState<string>("");
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show && mounted) {
      setTimeout(() => setIsVisible(true), 50);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      if (mounted) {
        setTimeout(() => {
          setStatus(null);
          setInvoice("");
        }, 300);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show, mounted]);

  const handleTrack = async () => {
    if (!invoice.trim()) return;
    setLoading(true);
    setStatus(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await fetch(`https://kayaa-bd-core.vercel.app/api/track?invoice=${invoice}`);
      if (!res.ok) throw new Error("Order not found");
      const data = await res.json();
      setStatus(data.data);
    } catch (err) {
      console.error(err);
      setStatus({ error: "Order not found or API error" });
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShow(false), 300);
  };

  const getStatusIcon = (orderStatus: string): string => {
    const statusLower = orderStatus?.toLowerCase() || '';
    if (statusLower.includes('delivered')) return '✅';
    if (statusLower.includes('shipped') || statusLower.includes('transit')) return '🚛';
    if (statusLower.includes('processing') || statusLower.includes('confirmed')) return '⏳';
    if (statusLower.includes('pending')) return '📋';
    if (statusLower.includes('cancelled')) return '❌';
    return '📦';
  };

  const getStatusColor = (orderStatus: string): string => {
    const statusLower = orderStatus?.toLowerCase() || '';
    if (statusLower.includes('delivered')) return '#10b981';
    if (statusLower.includes('shipped') || statusLower.includes('transit')) return '#3b82f6';
    if (statusLower.includes('processing') || statusLower.includes('confirmed')) return '#f59e0b';
    if (statusLower.includes('pending')) return '#ef4444';
    if (statusLower.includes('cancelled')) return '#6b7280';
    return '#6b7280';
  };

  // Don't render on server or before hydration
  if (!mounted || !show) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`modal-backdrop ${isVisible ? 'show' : ''}`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`modal fade ${isVisible ? 'show' : ''}`} style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            
            {/* Header */}
            <div className="modal-header" style={{ borderBottom: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <div className="d-flex align-items-center">
                <div 
                  className="me-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: '12px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🚛</span>
                </div>
                <div>
                  <h5 className="modal-title fw-bold mb-1">Track Your Order</h5>
                  <small className="text-muted">Enter invoice number for real-time updates</small>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                style={{ fontSize: '12px' }}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body" style={{ padding: '1.5rem' }}>
              
              {/* Search Form */}
              <div className="row g-2 mb-4">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                      📄
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Invoice Number (e.g. INV-123456)"
                      value={invoice}
                      onChange={(e) => setInvoice(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                      style={{ fontSize: '14px', padding: '10px' }}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-primary"
                    onClick={handleTrack}
                    disabled={loading || !invoice.trim()}
                    style={{ 
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      border: 'none',
                      padding: '10px 20px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" style={{ width: '16px', height: '16px' }}></span>
                        Tracking...
                      </>
                    ) : (
                      <>🔍 Track</>
                    )}
                  </button>
                </div>
              </div>

              {/* Results */}
              {status && (
                <div className="mt-3">
                  {status.error ? (
                    // Error State
                    <div className="alert alert-danger d-flex align-items-center" style={{ borderRadius: '10px' }}>
                      <span className="me-2" style={{ fontSize: '20px' }}>❌</span>
                      <div>
                        <strong>Order Not Found</strong><br />
                        <small>{status.error}</small>
                      </div>
                    </div>
                  ) : (
                    // Success State
                    <div>
                      {/* Status Card with Animation */}
                      <div 
                        className="card mb-3 status-card-animation" 
                        style={{ 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px',
                          animation: 'fadeInDown 0.5s ease-out',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="card-body" style={{ padding: '1.25rem' }}>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="d-flex align-items-center mb-2">
                                <span className="me-2" style={{ fontSize: '24px' }}>
                                  {getStatusIcon(status.status)}
                                </span>
                                <span 
                                  className="badge rounded-pill px-3 py-2" 
                                  style={{ 
                                    backgroundColor: getStatusColor(status.status) + '20',
                                    color: getStatusColor(status.status),
                                    fontSize: '12px'
                                  }}
                                >
                                  {status.status}
                                </span>
                              </div>
                              <h6 className="fw-bold mb-1">Invoice: {status.invoice}</h6>
                              <small className="text-muted">
                                Last Updated: {mounted ? new Date(status.updatedAt).toLocaleString() : 'Loading...'}
                              </small>
                            </div>
                            {status.estimatedDelivery && (
                              <div className="text-end">
                                <small className="text-muted d-block">Estimated Delivery</small>
                                <small className="fw-bold">
                                  {mounted ? new Date(status.estimatedDelivery).toLocaleDateString() : 'Loading...'}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Order Items with Animation */}
                      {status.orderItems && status.orderItems.length > 0 && (
                        <div 
                          className="card items-card-animation" 
                          style={{ 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '12px',
                            animation: 'fadeInUp 0.5s ease-out 0.2s both',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <div className="card-header d-flex align-items-center animated-header" style={{ 
                            backgroundColor: '#f8f9fa', 
                            borderRadius: '12px 12px 0 0',
                            animation: 'slideInRight 0.4s ease-out 0.3s both'
                          }}>
                            <span className="me-2">📦</span>
                            <strong>Order Items ({status.orderItems.length})</strong>
                          </div>
                          
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table table-sm mb-0">
                                <thead style={{ backgroundColor: '#f8f9fa' }}>
                                  <tr>
                                    <th style={{ padding: '12px', fontSize: '12px', fontWeight: '600' }}>Product</th>
                                    <th style={{ padding: '12px', fontSize: '12px', fontWeight: '600' }}>Size</th>
                                    <th className="text-center" style={{ padding: '12px', fontSize: '12px', fontWeight: '600' }}>Qty</th>
                                    <th className="text-end" style={{ padding: '12px', fontSize: '12px', fontWeight: '600' }}>Unit Price</th>
                                    <th className="text-end" style={{ padding: '12px', fontSize: '12px', fontWeight: '600' }}>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {status.orderItems.map((item: any, index: number) => (
                                    <tr 
                                      key={item.id || index}
                                      className="table-row-animation"
                                      style={{ 
                                        animation: `slideInUp 0.3s ease-out ${index * 0.1}s both`,
                                        transition: 'background-color 0.3s ease'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                      <td style={{ padding: '12px' }}>
                                        <small className="fw-medium">{item.name}</small>
                                      </td>
                                      <td style={{ padding: '12px' }}>
                                        <small className="text-muted">{item.size || 'N/A'}</small>
                                      </td>
                                      <td className="text-center" style={{ padding: '12px' }}>
                                        <span 
                                          className="badge rounded-circle d-inline-flex align-items-center justify-content-center"
                                          style={{ 
                                            backgroundColor: '#dbeafe', 
                                            color: '#1e40af',
                                            width: '24px',
                                            height: '24px',
                                            fontSize: '11px'
                                          }}
                                        >
                                          {item.quantity}
                                        </span>
                                      </td>
                                      <td className="text-end" style={{ padding: '12px' }}>
                                        <small className="fw-medium">{item.discountedRetailPrice} TK</small>
                                      </td>
                                      <td className="text-end" style={{ padding: '12px' }}>
                                        <small className="fw-bold">{item.totalPrice} TK</small>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            {/* Totals Section with Animation */}
                            <div className="card-footer" style={{ backgroundColor: '#f8f9fa', padding: '1rem' }}>
                              <div className="row g-2">
                                {/* Subtotal */}
                                <div className="col-6">
                                  <div className="d-flex justify-content-between align-items-center py-1">
                                    <span className="text-muted" style={{ fontSize: '14px' }}>Subtotal:</span>
                                    <span className="fw-medium" style={{ fontSize: '14px' }}>
                                      {status.orderItems.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0)} TK
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Delivery Charge */}
                                <div className="col-6">
                                  <div className="d-flex justify-content-between align-items-center py-1">
                                    <span className="text-muted d-flex align-items-center" style={{ fontSize: '14px' }}>
                                      🚚 Delivery:
                                    </span>
                                    <span className="fw-medium" style={{ fontSize: '14px' }}>
                                      {status.deliveryCharge || 60} TK
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <hr className="my-2" />
                              
                              {/* Grand Total with Animation */}
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold" style={{ fontSize: '16px' }}>🎯 Grand Total:</span>
                                <div className="position-relative">
                                  <span 
                                    className="fw-bold fs-5 total-amount-animation" 
                                    style={{ 
                                      color: '#059669',
                                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                      animation: 'pulse 2s infinite'
                                    }}
                                  >
                                    {(status.orderItems.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0) + (status.deliveryCharge || 60))} TK
                                  </span>
                                  {/* Sparkle Effect */}
                                  <span 
                                    className="position-absolute top-0 start-0"
                                    style={{ 
                                      animation: 'sparkle 1.5s ease-in-out infinite',
                                      fontSize: '12px'
                                    }}
                                  >
                                    ✨
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1040;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .modal-backdrop.show {
          opacity: 1;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1050;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          outline: 0;
        }
        .modal.show .modal-dialog {
          transform: scale(1);
          opacity: 1;
        }
        .modal-dialog {
          transform: scale(0.9);
          opacity: 0;
          transition: all 0.3s ease;
          margin: 1.75rem auto;
          max-width: 800px;
          width: calc(100% - 2rem);
        }
        
        /* Custom Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translate3d(30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: rotate(0deg) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: rotate(180deg) scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        /* Hover Effects */
        .total-amount-animation:hover {
          animation: bounce 0.6s ease-in-out;
        }
        
        /* Loading Animation */
        .spinner-border {
          animation: spinner-border 0.75s linear infinite;
        }
        
        @keyframes spinner-border {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Card Hover Effects */
        .status-card-animation:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .items-card-animation:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .modal-dialog {
            margin: 1rem auto;
            width: calc(100% - 1rem);
          }
          .table-responsive {
            font-size: 12px;
          }
          .modal-body {
            padding: 1rem !important;
          }
          .modal-header {
            padding: 1rem !important;
          }
          
          /* Reduce animations on mobile for performance */
          .status-card-animation,
          .items-card-animation {
            animation-duration: 0.3s;
          }
        }
      `}</style>
    </>
  );
};

export default TrackOrderModal;