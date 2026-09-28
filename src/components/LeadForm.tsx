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
  formSubtitle = 'Analizaré tu modelo de negocio y cuenta publicitaria para diseñar una estrategia rentable a tu medida.',
  tagText = '⚡ PROPUESTA EN 24H',
  sourcePage = 'landing_page',
  defaultService = 'Google Ads + Meta Ads (Estrategia Integral)'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    budget: '$1,000 - $3,000 USD/mes',
    platform: defaultService,
    goal: ''
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Por favor completa los campos requeridos: Nombre, Correo y WhatsApp (*).');
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
        goal: formData.goal.trim()
          ? `${formData.goal.trim()} | Ubicación: ${locationName || 'General'}`
          : (locationName ? `Estrategia de pauta y adquisición para ${locationName}` : 'Aumentar ventas y generar leads cualificados')
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
            lead_type: 'cotizacion_servicio',
            lead_location: locationName || 'General',
            selected_services: [formData.platform],
            estimated_budget: formData.budget,
            user_domain: formData.website || ''
          });
        }
        setSuccess(true);
      } else {
        setError(data.message || 'Ocurrió un error al enviar tu solicitud. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor. Intenta de nuevo o contáctame por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://api.whatsapp.com/send?phone=+573182873558&text=${encodeURIComponent(
    `Hola Fabián, acabo de enviar mi solicitud para cotizar el servicio de ${formData.platform}${locationName ? ` en ${locationName}` : ''}. Mi nombre es ${formData.name || 'un cliente'} y mi web es ${formData.website || 'no especificada'}. Mi presupuesto estimado en ads es ${formData.budget}.`
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
            Gracias <strong>{formData.name}</strong>. He recibido los detalles de tu proyecto. Te responderé en menos de 24 horas laborables a <strong>{formData.email}</strong> o a tu WhatsApp <strong>{formData.phone}</strong>.
          </p>
          <div className="lead-direct-whatsapp-box">
            📞 WhatsApp Directo de Fabián: <span style={{ color: '#0284c7', fontWeight: 800 }}>+57 318 287 3558</span>
          </div>
          <a
            id="leadform-success-whatsapp-btn"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full justify-center mt-4"
          >
            <span>💬 ¿Prefieres respuesta inmediata? Escríbeme a WhatsApp</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="lead-form-body">
          {error && <div className="lead-form-error">{error}</div>}

          {/* 1. Nombre Completo */}
          <div className="form-group">
            <label htmlFor="lead-name" className="form-label">
              Nombre Completo <span className="req">*</span>
            </label>
            <input
              type="text"
              id="lead-name"
              name="name"
              required
              placeholder="Ej. Carlos Mendoza"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* 2 & 3. Correo y Teléfono / WhatsApp */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="lead-email" className="form-label">
                Correo Electrónico <span className="req">*</span>
              </label>
              <input
                type="email"
                id="lead-email"
                name="email"
                required
                placeholder="carlos@empresa.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lead-phone" className="form-label">
                WhatsApp / Teléfono <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="lead-phone"
                name="phone"
                required
                placeholder="+57 300 123 4567"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* 4 & 5. Sitio Web e Inversión Mensual */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="lead-website" className="form-label">
                Sitio Web o Instagram <span className="opt">Opcional</span>
              </label>
              <input
                type="text"
                id="lead-website"
                name="website"
                placeholder="www.tuempresa.com o @instagram"
                value={formData.website}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lead-budget" className="form-label">
                Presupuesto en Ads <span className="req">*</span>
              </label>
              <select
                id="lead-budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                className="form-select"
              >
                <option value="$1,000 - $3,000 USD/mes">$1,000 - $3,000 USD / mes</option>
                <option value="Menos de $1,000 USD/mes">Menos de $1,000 USD / mes</option>
                <option value="$3,000 - $5,000 USD/mes">$3,000 - $5,000 USD / mes</option>
                <option value="Más de $5,000 USD/mes">Más de $5,000 USD / mes</option>
              </select>
            </div>
          </div>

          {/* 6. Tipo de Servicio */}
          <div className="form-group">
            <label htmlFor="lead-platform" className="form-label">
              Servicio de Interés <span className="req">*</span>
            </label>
            <select
              id="lead-platform"
              name="platform"
              required
              value={formData.platform}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Solo Google Ads (Search, Shopping, PMax, YouTube)">Solo Google Ads (Search, Shopping, PMax, YouTube)</option>
              <option value="Solo Meta Ads (Facebook & Instagram)">Solo Meta Ads (Facebook & Instagram)</option>
              <option value="Google Ads + Meta Ads (Estrategia Integral)">Google Ads + Meta Ads (Estrategia Integral)</option>
              <option value="LinkedIn Ads para B2B / High-Ticket">LinkedIn Ads (B2B de Alto Valor)</option>
              <option value="Analítica Web & Server-Side Tracking (GA4/GTM/CAPI)">Analítica Web & Tracking Server-Side (GA4 / GTM / CAPI)</option>
              <option value="Auditoría de Cuentas & Optimización CRO">Auditoría de Cuentas & Optimización CRO</option>
            </select>
          </div>

          {/* 7. Objetivo o desafío principal */}
          <div className="form-group">
            <label htmlFor="lead-goal" className="form-label">
              ¿Cuál es tu objetivo o principal desafío? <span className="opt">Opcional</span>
            </label>
            <textarea
              id="lead-goal"
              name="goal"
              rows={2}
              placeholder="Ej. Bajar costo por lead, corregir tracking de conversiones, escalar ventas e-commerce..."
              value={formData.goal}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary lead-submit-btn"
          >
            {loading ? 'Enviando Solicitud...' : '⚡ Solicitar Propuesta Gratuita'}
          </button>

          <p className="form-privacy-note">
            🔒 Datos 100% confidenciales. Sin agencias intermediarias ni spam, respuesta en &lt; 24h.
          </p>
        </form>
      )}
    </div>
  );
}
