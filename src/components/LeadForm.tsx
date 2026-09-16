import { useState } from 'react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    budget: '$1,000 - $3,000 USD',
    platform: 'Google Ads & Meta Ads',
    goal: 'Aumentar ventas y generar leads cualificados'
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
      setError('Por favor completa todos los campos obligatorios (*).');
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
        goal: formData.goal
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
            form_name: 'landing_contratar_trafficker',
            lead_type: 'contratacion_directa',
            selected_services: [formData.platform],
            estimated_budget: formData.budget,
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
    `Hola Fabián, acabo de enviar mi solicitud para contratar servicios de Trafficker Digital. Mi nombre es ${formData.name || 'un cliente potencial'} y mi web es ${formData.website || 'aún no especificada'}.`
  )}`;

  return (
    <div className="lead-form-card" id="formulario-contacto">
      <div className="lead-form-header">
        <span className="lead-form-tag">⚡ COTIZACIÓN EN 24H</span>
        <h3 className="lead-form-title">Solicita tu Propuesta Personalizada</h3>
        <p className="lead-form-subtitle">
          Analizaré tu cuenta publicitaria y modelo de negocio para diseñar una estrategia de pauta a tu medida.
        </p>
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

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Corporativo <span className="req">*</span>
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
                WhatsApp / Teléfono <span className="req">*</span>
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

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="website" className="form-label">
                Sitio Web o Instagram
              </label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="www.tuempresa.com"
                value={formData.website}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget" className="form-label">
                Inversión Mensual en Ads
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Menos de $1,000 USD/mes">&lt; $1,000 USD/mes</option>
                <option value="$1,000 - $3,000 USD/mes">$1,000 - $3,000 USD/mes</option>
                <option value="$3,000 - $10,000 USD/mes">$3,000 - $10,000 USD/mes</option>
                <option value="Más de $10,000 USD/mes">&gt; $10,000 USD/mes</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="platform" className="form-label">
              Canal Publicitario de Interés
            </label>
            <select
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Google Ads & Meta Ads">Google Ads + Meta Ads (Recomendado)</option>
              <option value="Solo Google Ads (Search & PMax)">Solo Google Ads (Búsqueda, Shopping, PMax)</option>
              <option value="Solo Meta Ads (Facebook & Instagram)">Solo Meta Ads (Instagram & Facebook)</option>
              <option value="LinkedIn Ads B2B">LinkedIn Ads (B2B High Ticket)</option>
              <option value="Auditoría & Server-Side Tracking">Auditoría & Tracking Server-Side (GA4/GTM)</option>
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
            🔒 Tus datos están 100% protegidos. Sin spam, solo comunicación profesional directa.
          </p>
        </form>
      )}
    </div>
  );
}
