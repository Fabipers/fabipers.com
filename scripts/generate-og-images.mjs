import sharp from 'sharp';

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const cards = [
  {
    filename: 'public/images/og-google-ads.png',
    badgeText: '⚡ GOOGLE PARTNER CERTIFICADO • SEM & PMAX',
    badgeColor: '#facc15',
    titleLine1: 'Especialista Certificado en',
    titleLine2: 'Google Ads & Performance Max',
    pillText: 'BÚSQUEDA • SHOPPING • PMAX • RETORNO REAL',
    pillColor: '#4285F4',
    pillTextColor: '#ffffff',
    subLine1: 'Captura clientes con alta intención de compra en Colombia y Miami.',
    subLine2: 'Campañas optimizadas para maximizar el ROAS y reducir el costo por lead.',
    chips: [
      '🎯 Intención Transaccional',
      '🛡️ Bloqueo de Negativas',
      '📈 Smart Bidding & GA4',
      '💼 Cuentas 100% Tuyas'
    ]
  },
  {
    filename: 'public/images/og-meta-ads.png',
    badgeText: '⚡ META ADS • FACEBOOK & INSTAGRAM ADS',
    badgeColor: '#facc15',
    titleLine1: 'Especialista en Meta Ads &',
    titleLine2: 'Embudos Híbridos a WhatsApp',
    pillText: 'META CAPI • CREATIVIDADES • RETARGETING • ROAS',
    pillColor: '#0066FF',
    pillTextColor: '#ffffff',
    subLine1: 'Prospección masiva y retargeting dinámico en Facebook e Instagram.',
    subLine2: 'Seguimiento con Meta Conversions API (CAPI) para no perder conversiones.',
    chips: [
      '📱 WhatsApp Business Funnels',
      '🔄 Meta CAPI Server-Side',
      '🎨 Creatividades de Alto CTR',
      '💰 Reducción de CPL / CPA'
    ]
  },
  {
    filename: 'public/images/og-linkedin-ads.png',
    badgeText: '⚡ PUBLICIDAD B2B • ACCOUNT-BASED MARKETING (ABM)',
    badgeColor: '#facc15',
    titleLine1: 'Especialista en LinkedIn Ads',
    titleLine2: 'para Empresas B2B & High-Ticket',
    pillText: 'PROSPECCIÓN C-LEVEL • ABM • LEAD GEN FORMS',
    pillColor: '#0A66C2',
    pillTextColor: '#ffffff',
    subLine1: 'Conecta tu oferta corporativa directamente con directores y CEOs.',
    subLine2: 'Formularios nativos de auto-relleno y listas de cuentas clave (Matched Audiences).',
    chips: [
      '🏢 Segmentación por Cargo',
      '⚡ Lead Gen Forms Nativos',
      '📑 Document Ads & Whitepapers',
      '🔗 Integración con CRM'
    ]
  },
  {
    filename: 'public/images/og-analitica-tracking.png',
    badgeText: '⚡ SERVER-SIDE TRACKING • CONSENT MODE V2',
    badgeColor: '#facc15',
    titleLine1: 'Analítica Web Avanzada &',
    titleLine2: 'Server-Side Tracking (GTM / GA4)',
    pillText: 'GA4 • GTM SERVER • META CAPI • ATRIBUCIÓN EXACTA',
    pillColor: '#ea580c',
    pillTextColor: '#ffffff',
    subLine1: 'Evita la pérdida del 30% de tus conversiones ante ad-blockers y cambios de iOS.',
    subLine2: 'Infraestructura de datos de primera parte con Consent Mode v2 y conversiones mejoradas.',
    chips: [
      '📊 GA4 & GTM Server-Side',
      '🛡️ Consent Mode v2',
      '🚀 Meta & Google CAPI',
      '🔍 Auditoría de Atribución'
    ]
  },
  {
    filename: 'public/images/og-cro-landing-pages.png',
    badgeText: '⚡ ARQUITECTURA WEB & OPTIMIZACIÓN CRO',
    badgeColor: '#facc15',
    titleLine1: 'Diseño de Landing Pages &',
    titleLine2: 'Optimización de Conversión (CRO)',
    pillText: 'CARGA < 1S • COPYWRITING • PAGESPEED 95+ • VENTAS',
    pillColor: '#16a34a',
    pillTextColor: '#ffffff',
    subLine1: 'Páginas de destino ultrarrápidas construidas para duplicar la tasa de conversión.',
    subLine2: 'Copywriting persuasivo, formularios de mínima fricción y código 100% propio.',
    chips: [
      '⚡ Carga en Menos de 1s',
      '✍️ Copywriting Persuasivo',
      '📱 UX Neo-Brutalista',
      '📈 Más Ventas por Clic'
    ]
  }
];

async function generate() {
  for (const c of cards) {
    const chipsXml = c.chips.map((chip, i) => {
      const x = i * 260;
      return `
        <g transform="translate(${x}, 0)">
          <rect x="0" y="0" width="245" height="52" fill="#ffffff" stroke="#09090b" stroke-width="3" filter="drop-shadow(4px 4px 0px #09090b)"/>
          <text x="14" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14.5" font-weight="800" fill="#09090b">${escapeXml(chip)}</text>
        </g>
      `;
    }).join('');

    const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8fafc"/>
  <defs>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1.5" fill="#cbd5e1" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Heavy Brutalist Border -->
  <rect x="30" y="30" width="1140" height="570" rx="0" fill="#ffffff" stroke="#09090b" stroke-width="6" filter="drop-shadow(10px 10px 0px #09090b)"/>

  <!-- Top Ribbon Badge -->
  <rect x="70" y="70" width="530" height="44" fill="${c.badgeColor}" stroke="#09090b" stroke-width="3"/>
  <text x="88" y="99" font-family="system-ui, -apple-system, sans-serif" font-size="16.5" font-weight="900" fill="#09090b" letter-spacing="0.8">${escapeXml(c.badgeText)}</text>

  <!-- URL Brand Tag Top Right -->
  <g transform="translate(880, 70)">
    <rect x="0" y="0" width="220" height="44" fill="#09090b" stroke="#09090b" stroke-width="2"/>
    <text x="24" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#facc15" letter-spacing="1">fabipers.com</text>
  </g>

  <!-- Big Title -->
  <text x="70" y="190" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="900" fill="#09090b" letter-spacing="-1.5">
    ${escapeXml(c.titleLine1)}
  </text>
  <text x="70" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="900" fill="#09090b" letter-spacing="-1.5">
    ${escapeXml(c.titleLine2)}
  </text>

  <!-- Highlight Pill behind text -->
  <rect x="70" y="285" width="570" height="38" fill="${c.pillColor}" stroke="#09090b" stroke-width="3"/>
  <text x="85" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="${c.pillTextColor}" letter-spacing="0.5">${escapeXml(c.pillText)}</text>

  <!-- Subtitle Description -->
  <text x="70" y="375" font-family="system-ui, -apple-system, sans-serif" font-size="23" font-weight="500" fill="#475569">
    ${escapeXml(c.subLine1)}
  </text>
  <text x="70" y="412" font-family="system-ui, -apple-system, sans-serif" font-size="23" font-weight="500" fill="#475569">
    ${escapeXml(c.subLine2)}
  </text>

  <!-- 4 Badges on bottom -->
  <g transform="translate(70, 470)">
    ${chipsXml}
  </g>
</svg>
    `;

    await sharp(Buffer.from(svg))
      .png({ quality: 95 })
      .toFile(c.filename);
    console.log('Successfully created:', c.filename);
  }
}

generate().catch(console.error);
