import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Priority URLs to index
const DEFAULT_URLS = [
  'https://fabipers.com/',
  'https://fabipers.com/servicios/',
  'https://fabipers.com/servicios/trafficker-google-ads',
  'https://fabipers.com/servicios/trafficker-facebook-ads',
  'https://fabipers.com/servicios/trafficker-linkedin-ads',
  'https://fabipers.com/servicios/analitica-web-tracking',
  'https://fabipers.com/servicios/cro-landing-pages',
  'https://fabipers.com/trafficker-digital-colombia',
  'https://fabipers.com/trafficker-digital-miami',
  'https://fabipers.com/sobre-mi',
  'https://fabipers.com/cuanto-cuesta-campana-linkedin-ads-b2b',
  'https://fabipers.com/auditoria-meta-ads-campanas-no-convierten',
  'https://fabipers.com/que-preguntar-antes-de-contratar-trafficker-digital',
  'https://fabipers.com/landing-page-para-vender-servicios-b2b',
  'https://fabipers.com/mi-campana-de-google-ads-no-tiene-impresiones-ni-conversiones',
  'https://fabipers.com/cuanto-cobra-un-trafficker-digital',
  'https://fabipers.com/linkedin-ads-vs-google-ads-b2b',
  'https://fabipers.com/por-que-google-ads-no-convierte-auditoria-2027',
  'https://fabipers.com/gestion-y-administracion-de-google-ads',
  'https://fabipers.com/por-que-leads-facebook-ads-mala-calidad-como-filtrar',
  'https://fabipers.com/google-ads-vs-meta-ads-colombia-donde-invertir',
  'https://fabipers.com/consultoria-google-ads-vs-agencia-marketing'
];

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaimSet = base64url(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(`Error obtaining Google access token: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

async function notifyUrl(url, accessToken) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      url,
      type: 'URL_UPDATED'
    })
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

async function main() {
  console.log('\n🚀 [Google Indexing API] - Automatización de Indexación Instantánea\n');

  // Check for credentials
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                   path.resolve(process.cwd(), 'service_account.json') || 
                   path.resolve(process.cwd(), 'credentials.json');

  let serviceAccount = null;

  if (fs.existsSync(credPath)) {
    try {
      serviceAccount = JSON.parse(fs.readFileSync(credPath, 'utf8'));
      console.log(`✅ Archivo de credenciales encontrado: ${credPath}`);
    } catch (e) {
      console.error(`❌ Error leyendo archivo JSON en ${credPath}:`, e.message);
    }
  } else if (process.env.GOOGLE_INDEXING_CREDENTIALS) {
    try {
      serviceAccount = JSON.parse(process.env.GOOGLE_INDEXING_CREDENTIALS);
      console.log('✅ Credenciales cargadas desde variable de entorno GOOGLE_INDEXING_CREDENTIALS');
    } catch (e) {
      console.error('❌ Error leyendo GOOGLE_INDEXING_CREDENTIALS:', e.message);
    }
  }

  if (!serviceAccount || !serviceAccount.client_email || !serviceAccount.private_key) {
    console.log(`
ℹ️  Para activar la indexación automática directa por API:

1. Crea una Cuenta de Servicio (Service Account) en Google Cloud Console:
   https://console.cloud.google.com/iam-admin/serviceaccounts
2. Habilita la "Web Search Indexing API" en tu proyecto de Google Cloud.
3. Genera y descarga la clave en formato JSON y guárdala como "service_account.json" en la raíz del proyecto.
4. En Google Search Console (https://search.google.com/search-console):
   - Ve a Ajustes > Usuarios y permisos > Añadir usuario.
   - Pega el correo de tu cuenta de servicio (ej: mi-robot@proyecto.iam.gserviceaccount.com) y dale rol de "Propietario".
5. Ejecuta nuevamente: npm run index

👉 Las URLs prioritarias configuradas para indexar son (${DEFAULT_URLS.length} URLs):
`);
    DEFAULT_URLS.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));
    console.log('\n');
    return;
  }

  console.log(`🔐 Autenticando con cuenta de servicio: ${serviceAccount.client_email}...`);
  const accessToken = await getAccessToken(serviceAccount);
  console.log('✅ Token de acceso obtenido con éxito.\n');

  const urlsToIndex = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_URLS;

  console.log(`📡 Enviando ${urlsToIndex.length} URLs a Google Indexing API:\n`);

  for (const url of urlsToIndex) {
    process.stdout.write(`   Enviando: ${url}... `);
    try {
      const result = await notifyUrl(url, accessToken);
      if (result.ok) {
        console.log(`✅ OK (HTTP ${result.status})`);
      } else {
        console.log(`⚠️ Falló (HTTP ${result.status}): ${result.data?.error?.message || 'Error desconocido'}`);
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }

  console.log('\n🎉 Proceso de indexación finalizado.\n');
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err);
  process.exit(1);
});
