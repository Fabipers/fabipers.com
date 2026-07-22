import { useState } from 'react';

export default function Cotizador() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    platforms: [],
    budget: '',
    goal: '',
    name: '',
    email: '',
    phone: '',
    website: ''
  });

  const handleCheckboxChange = (platform) => {
    setFormData(prev => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && formData.platforms.length === 0) {
      setError('Por favor selecciona al menos una plataforma de interés.');
      return;
    }
    if (step === 2 && !formData.budget) {
      setError('Por favor selecciona tu presupuesto estimado.');
      return;
    }
    if (step === 3 && !formData.goal) {
      setError('Por favor escribe o selecciona tu objetivo principal.');
      return;
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Por favor completa todos los campos de contacto requeridos.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Ocurrió un error al procesar tu solicitud. Por favor inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor verifica tu red e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formatWhatsAppMessage = () => {
    const platformsStr = formData.platforms.join(', ');
    const message = `Hola Fabián, acabo de cotizar en tu sitio web. Mi nombre es ${formData.name}. Estoy interesado en ${platformsStr} con un presupuesto de ${formData.budget}. Mi objetivo es: ${formData.goal}. Mi web: ${formData.website || 'No especificada'}.`;
    return encodeURIComponent(message);
  };

  return (
    <div className="cotizador-card card" id="cotizador">
      <div className="cotizador-progress-bar">
        <div 
          className="cotizador-progress-fill" 
          style={{ width: `${success ? 100 : (step / 4) * 100}%` }}
        ></div>
      </div>

      {!success ? (
        <form onSubmit={handleSubmit} className="cotizador-form">
          <div className="cotizador-steps-header">
            <span className="step-badge">Paso {step} de 4</span>
            {error && <div className="error-alert">{error}</div>}
          </div>

          {step === 1 && (
            <div className="cotizador-step-content animate-fade-in">
              <h3 className="step-title">¿Qué canales o servicios te interesan?</h3>
              <p className="step-desc">Selecciona todas las opciones que apliquen para tu estrategia.</p>
              
              <div className="checkbox-grid">
                {[
                  { id: 'Google Ads', label: 'Google Ads & YouTube', icon: '🔍' },
                  { id: 'Meta Ads', label: 'Meta Ads (Facebook & Instagram)', icon: '📱' },
                  { id: 'LinkedIn Ads', label: 'LinkedIn Ads (B2B de Alto Valor)', icon: '💼' },
                  { id: 'GA4/Tracking', label: 'Analítica Web & Tracking (GA4/GTM)', icon: '📊' },
                  { id: 'Landing Pages', label: 'CRO & Landing Pages de Alta Conversión', icon: '💻' }
                ].map(item => (
                  <label 
                    key={item.id} 
                    className={`checkbox-brutalist ${formData.platforms.includes(item.id) ? 'checked' : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={formData.platforms.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span className="checkbox-icon">{item.icon}</span>
                    <span className="checkbox-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="cotizador-step-content animate-fade-in">
              <h3 className="step-title">¿Cuál es tu presupuesto mensual estimado de pauta?</h3>
              <p className="step-desc">Esta inversión se paga directamente a las plataformas publicitarias (no incluye mis honorarios).</p>
              
              <div className="radio-grid">
                {[
                  { id: '$500 - $1,000 USD', label: 'Entre $500 y $1,000 USD / mes', icon: '🌱' },
                  { id: '$1,000 - $3,000 USD', label: 'Entre $1,000 y $3,000 USD / mes', icon: '⚡' },
                  { id: '$3,000+ USD', label: 'Más de $3,000 USD / mes', icon: '🚀' }
                ].map(item => (
                  <label 
                    key={item.id} 
                    className={`radio-brutalist ${formData.budget === item.id ? 'checked' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="budget"
                      checked={formData.budget === item.id}
                      onChange={() => handleRadioChange('budget', item.id)}
                    />
                    <span className="radio-icon">{item.icon}</span>
                    <span className="radio-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="cotizador-step-content animate-fade-in">
              <h3 className="step-title">¿Cuál es tu objetivo comercial principal?</h3>
              <p className="step-desc">Selecciona la opción que mejor describa lo que quieres lograr a corto plazo.</p>
              
              <div className="radio-grid">
                {[
                  { id: 'Conseguir Leads por WhatsApp', label: 'Generar más contactos/leads directos por WhatsApp', icon: '💬' },
                  { id: 'Ventas E-commerce', label: 'Aumentar ventas directas en mi tienda online (E-commerce)', icon: '🛍️' },
                  { id: 'Agendamiento B2B', label: 'Agendar llamadas de ventas cualificadas (Servicios / B2B)', icon: '📅' }
                ].map(item => (
                  <label 
                    key={item.id} 
                    className={`radio-brutalist ${formData.goal === item.id ? 'checked' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="goal"
                      checked={formData.goal === item.id}
                      onChange={() => handleRadioChange('goal', item.id)}
                    />
                    <span className="radio-icon">{item.icon}</span>
                    <span className="radio-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="cotizador-step-content animate-fade-in">
              <h3 className="step-title">Cuéntame sobre ti y tu negocio</h3>
              <p className="step-desc">Completa tus datos para enviarte una propuesta de cotización detallada.</p>
              
              <div className="input-group-grid">
                <div className="form-group-brutalist">
                  <label htmlFor="name">Tu Nombre *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="form-group-brutalist">
                  <label htmlFor="email">Tu Correo Electrónico *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="Ej. juan@minegocio.com"
                  />
                </div>

                <div className="form-group-brutalist">
                  <label htmlFor="phone">Teléfono / WhatsApp *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone} 
                    onChange={handleInputChange}
                    placeholder="Ej. +57 300 123 4567"
                  />
                </div>

                <div className="form-group-brutalist">
                  <label htmlFor="website">Sitio Web / URL Actual</label>
                  <input 
                    type="url" 
                    id="website" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleInputChange}
                    placeholder="Ej. https://minegocio.com"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="cotizador-navigation">
            {step > 1 && (
              <button 
                type="button" 
                onClick={prevStep} 
                className="btn btn-secondary"
                disabled={loading}
              >
                &larr; Atrás
              </button>
            )}
            
            {step < 4 ? (
              <button 
                type="button" 
                onClick={nextStep} 
                className="btn btn-primary next-btn-brutalist"
              >
                Siguiente &rarr;
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary submit-btn-brutalist"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Obtener mi Cotización ⚡'}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="success-screen animate-fade-in text-center">
          <div className="success-icon">⚡</div>
          <h2>¡Solicitud de Cotización Recibida!</h2>
          <p>
            Hola <strong>{formData.name}</strong>, he enviado una copia de la cotización a tu correo <strong>{formData.email}</strong>. Me pondré en contacto contigo en breve para revisar tu proyecto.
          </p>
          
          <div className="success-actions" style={{ marginTop: '2.5rem' }}>
            <a 
              href={`https://api.whatsapp.com/send?phone=+573182873558&text=${formatWhatsAppMessage()}`}
              className="btn btn-whatsapp whatsapp-success-btn"
              target="_blank" 
              rel="noopener noreferrer"
              id="success-whatsapp-direct"
            >
              💬 Acelerar contacto por WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
