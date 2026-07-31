import React, { useState } from 'react';

export default function LeadMagnet() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
            lead_type: 'lead_magnet_descarga',
            form_name: 'checklist_errores_ads'
          });
        }
        setSuccess(true);
      } else {
        setError(data.message || 'Ocurrió un error. Por favor inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor verifica tu red e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#2563eb',
      border: '4px solid #09090b',
      boxShadow: '6px 6px 0px #09090b',
      padding: '2rem 1.5rem',
      borderRadius: '0px',
      color: '#ffffff',
      margin: '2.5rem 0',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#09090b',
        color: '#ffffff',
        fontWeight: '900',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        padding: '0.3rem 0.75rem',
        border: '2px solid #09090b',
        boxShadow: '3px 3px 0px #ffffff',
        marginBottom: '1rem',
        letterSpacing: '0.05em'
      }}>
        ⚡ Recurso Gratuito
      </div>

      <h3 style={{
        fontSize: '1.4rem',
        fontWeight: '900',
        textTransform: 'none',
        lineHeight: '1.25',
        marginBottom: '0.75rem',
        color: '#ffffff'
      }}>
        Descarga Gratis: Checklist para Detener la Fuga de Presupuesto en tus Campañas
      </h3>

      <p style={{
        fontSize: '0.95rem',
        fontWeight: '500',
        lineHeight: '1.5',
        marginBottom: '1.5rem',
        color: '#f8fafc'
      }}>
        Descubre los 5 errores críticos que están gastando tu presupuesto publicitario en Google Ads y Meta Ads, y aprende exactamente cómo corregirlos hoy mismo.
      </p>

      {success ? (
        <div style={{
          backgroundColor: '#09090b',
          border: '3px solid #09090b',
          boxShadow: '4px 4px 0px #ffffff',
          padding: '1.25rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#4ade80', fontWeight: '900', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
            ✅ ¡Enviado con éxito!
          </p>
          <p style={{ color: '#ffffff', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
            Hemos enviado el archivo a tu correo. También puedes descargarlo directamente en el siguiente enlace:
          </p>
          <a
            href="https://fabipers.com/checklist-errores-ads.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#facc15',
              color: '#09090b',
              fontWeight: '900',
              padding: '0.75rem 1.25rem',
              border: '2px solid #09090b',
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}
          >
            📥 Descargar Checklist (PDF)
          </a>
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
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              marginTop: '0.25rem',
              borderRadius: '0px'
            }}
          >
            {loading ? 'ENVIANDO...' : '⚡ DESCARGAR AHORA'}
          </button>
        </form>
      )}
    </div>
  );
}
