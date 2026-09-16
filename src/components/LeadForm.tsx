import { useState } from 'react';

interface LeadFormProps {
  locationName?: string;
  formTitle?: string;
  formSubtitle?: string;
  tagText?: string;
  sourcePage?: string;
  defaultService?: string;
}

export default function LeadForm({
  locationName = '',
  formTitle = 'Solicita tu Propuesta Personalizada',
  formSubtitle = 'Analizaré tu cuenta publicitaria y modelo de negocio para diseñar una estrategia de pauta a tu medida.',
  tagText = '⚡ COTIZACIÓN EN 24H',
  sourcePage = 'landing_page',
  defaultService = 'Google Ads & Meta Ads (Estrategia Integral)'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    platform: defaultService,
    budget: '$1,000 - $3,000 USD',
    goal: locationName ? `Estrategia de pauta y adquisición para ${locationName}` : 'Aumentar ventas y generar leads cualificados'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.website.trim() ||
      !formData.platform.trim()
    ) {
      setError('Por favor completa todos los campos requeridos (*).');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        budget: formData.budget,
        platforms: [formData.platform],
        goal: `${formData.goal} | Ubicación: ${locationName || 'General'}`
      };

      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        if (typeof window !== 'undefined') {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: 'generate_lead',
            form_name: sourcePage,
            lead_type: 'contratacion_directa',
            lead_location: locationName || 'General',
            selected_services: [formData.platform],
            user_domain: formData.website || ''
          });
        }
        setSuccess(true);
      } else {
        setError(data.message || 'Ocurrió un error al enviar el formulario. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor. Intenta de nuevo o contáctame por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://api.whatsapp.com/send?phone=+573182873558&text=${encodeURIComponent(
    `Hola Fabián, acabo de enviar mi solicitud para cotizar servicios de Trafficker Digital${locationName ? ` en ${locationName}` : ''}. Mi nombre es ${formData.name || 'un cliente'} y mi web es ${formData.website || 'no especificada'}. Servicio de interés: ${formData.platform}.`
  )}`;

  return (
    <div className="lead-form-card" id="formulario-contacto">
      <div className="lead-form-header">
        <span className="lead-form-tag">{tagText}</span>
        <h3 className="lead-form-title">{formTitle}</h3>
        <p className="lead-form-subtitle">{formSubtitle}</p>
      </div>

      {success ? (
        <div className="lead-form-success">
          <div className="success-icon">🎉</div>
          <h4 className="success-title">¡Solicitud Recibida con Éxito!</h4>
          <p className="success-text">
            Gracias <strong>{formData.name}</strong>. He recibido los detalles de tu proyecto. Te responderé en menos de 24 horas laborables a <strong>{formData.email}</strong> o a tu número de contacto.
          </p>
          <div className="lead-direct-whatsapp-box" style={{ marginTop: '1.2rem', padding: '0.8rem', backgroundColor: '#f4f4f5', border: '2px solid #09090b', fontSize: '0.9rem', fontWeight: 600 }}>
            📞 WhatsApp Directo de Fabián: <span style={{ color: '#0284c7', fontWeight: 800 }}>+57 318 287 3558</span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full justify-center mt-4"
          >
            <span>💬 ¿Prefieres respuesta inmediata? Escríbeme al +57 318 287 3558</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="lead-form-body">
          {error && <div className="lead-form-error">{error}</div>}

          {/* 1. Nombre Completo (Obligatorio) */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nombre Completo <span className="req">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Ej. Carlos Mendoza"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* 2 & 3. Correo y Teléfono (Obligatorios) */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico <span className="req">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="carlos@empresa.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Teléfono / WhatsApp <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="+57 300 123 4567"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* 4. Sitio Web o Negocio (Obligatorio) */}
          <div className="form-group">
            <label htmlFor="website" className="form-label">
              Sitio Web o Instagram del Negocio <span className="req">*</span>
            </label>
            <input
              type="text"
              id="website"
              name="website"
              required
              placeholder="www.tuempresa.com o @tunegocio"
              value={formData.website}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* 5. Tipo de Servicio (Obligatorio) */}
          <div className="form-group">
            <label htmlFor="platform" className="form-label">
              Tipo de Servicio <span className="req">*</span>
            </label>
            <select
              id="platform"
              name="platform"
              required
              value={formData.platform}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Google Ads & Meta Ads (Estrategia Integral)">Google Ads + Meta Ads (Estrategia Integral)</option>
              <option value="Solo Google Ads (Search, Shopping, PMax, YouTube)">Solo Google Ads (Búsqueda, Shopping, PMax)</option>
              <option value="Solo Meta Ads (Facebook & Instagram)">Solo Meta Ads (Instagram & Facebook)</option>
              <option value="LinkedIn Ads para B2B / High-Ticket">LinkedIn Ads (B2B de Alto Valor)</option>
              <option value="Analítica Web & Server-Side Tracking (GA4/GTM/CAPI)">Analítica Web & Tracking Server-Side (GA4/GTM)</option>
              <option value="Auditoría de Cuentas & Optimización CRO">Auditoría de Cuentas & Optimización CRO</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full lead-submit-btn"
          >
            {loading ? 'Enviando Solicitud...' : '⚡ Solicitar Cotización Gratuita'}
          </button>

          <p className="form-privacy-note">
            🔒 Datos 100% confidenciales. Sin spam, respuesta profesional directa en menos de 24h.
          </p>
        </form>
      )}
    </div>
  );
}
