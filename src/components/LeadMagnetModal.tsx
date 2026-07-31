import React, { useState, useEffect } from 'react';

export default function LeadMagnetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed or submitted in this session
    if (typeof window !== 'undefined') {
      const isDismissed = sessionStorage.getItem('lead_magnet_modal_dismissed');
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('lead_magnet_modal_dismissed', 'true');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Por favor completa tu nombre y correo electrónico.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/download-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'generate_lead',
            lead_type: 'lead_magnet_popup',
            form_name: 'checklist_errores_ads_popup'
          });
        }
        setSuccess(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('lead_magnet_modal_dismissed', 'true');
        }
      } else {
        setError(data.message || 'Ocurrió un error. Por favor inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor verifica tu red e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(9, 9, 11, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#2563eb',
          border: '4px solid #09090b',
          boxShadow: '8px 8px 0px #09090b',
          padding: '2rem 1.5rem',
          maxWidth: '520px',
          width: '100%',
          position: 'relative',
          boxSizing: 'border-box',
          color: '#ffffff',
          animation: 'popIn 0.3s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Cerrar ventana"
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            backgroundColor: '#facc15',
            color: '#09090b',
            border: '3px solid #09090b',
            boxShadow: '2px 2px 0px #09090b',
            width: '38px',
            height: '38px',
            fontWeight: '900',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}
        >
          ✕
        </button>

        <div style={{
          display: 'inline-block',
          backgroundColor: '#facc15',
          color: '#09090b',
          fontWeight: '900',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '0.3rem 0.8rem',
          border: '2px solid #09090b',
          boxShadow: '2px 2px 0px #09090b',
          marginBottom: '1rem'
        }}>
          ⚡ Regalo Exclusivo
        </div>

        <h3 style={{
          color: '#ffffff',
          fontSize: 'clamp(1.3rem, 4vw, 1.65rem)',
          fontWeight: '900',
          lineHeight: '1.25',
          margin: '0 0 0.75rem 0',
          fontFamily: 'var(--font-heading, sans-serif)',
          textShadow: '1px 1px 0px #09090b'
        }}>
          ¡Detén la Fuga de Presupuesto en tus Campañas!
        </h3>

        <p style={{
          fontSize: '0.95rem',
          fontWeight: '500',
          lineHeight: '1.5',
          color: '#ffffff',
          marginBottom: '1.5rem',
          opacity: 0.95
        }}>
          Descarga gratis nuestro <strong>Checklist con los 5 Errores en Ads</strong> que están costándole dinero a tu negocio y aprende cómo corregirlos hoy.
        </p>

        {success ? (
          <div style={{
            backgroundColor: '#09090b',
            color: '#34d399',
            border: '3px solid #ffffff',
            boxShadow: '4px 4px 0px #09090b',
            padding: '1.25rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#ffffff' }}>
              🎉 ¡Enlace Enviado!
            </p>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>
              ¡Revisa tu bandeja de entrada! Te hemos enviado el enlace de descarga.
            </p>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: '#facc15',
                color: '#09090b',
                border: '2px solid #09090b',
                padding: '0.5rem 1rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              ENTENDIDO
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{
                backgroundColor: '#09090b',
                color: '#f87171',
                padding: '0.75rem 1rem',
                border: '2px solid #ffffff',
                fontSize: '0.9rem',
                fontWeight: '700'
              }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="Tu Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '3px solid #09090b',
                  backgroundColor: '#ffffff',
                  color: '#09090b',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  borderRadius: '0px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  border: '3px solid #09090b',
                  backgroundColor: '#ffffff',
                  color: '#09090b',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  borderRadius: '0px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#facc15',
                color: '#09090b',
                border: '3px solid #09090b',
                boxShadow: '4px 4px 0px #09090b',
                padding: '0.9rem 1.5rem',
                fontWeight: '900',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.25rem',
                borderRadius: '0px'
              }}
            >
              {loading ? 'ENVIANDO...' : '⚡ DESCARGAR AHORA'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
