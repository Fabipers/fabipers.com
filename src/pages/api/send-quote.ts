import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { platforms, budget, goal, name, email, phone } = data;
    const rawWebsite: string = (data.website || '').trim();

    // Normalize website: prepend https:// if the user omitted the protocol
    const website = rawWebsite && !rawWebsite.match(/^https?:\/\//i)
      ? `https://${rawWebsite}`
      : rawWebsite;

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ message: 'Campos requeridos faltantes.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // SMTP Config using env variables
    const host = import.meta.env.ZOHO_SMTP_HOST || process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
    const portStr = import.meta.env.ZOHO_SMTP_PORT || process.env.ZOHO_SMTP_PORT || '465';
    const user = import.meta.env.ZOHO_SMTP_USER || process.env.ZOHO_SMTP_USER;
    const pass = import.meta.env.ZOHO_SMTP_PASS || process.env.ZOHO_SMTP_PASS;

    if (!user || !pass) {
      console.error('Zoho SMTP credentials not configured.');
      return new Response(
        JSON.stringify({ message: 'Error de configuración del servidor de correo.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const port = parseInt(portStr);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    const platformsList = platforms.join(', ');

    // 1. Email HTML - Notification to Fabián
    const ownerEmailHtml = `
      <div style="font-family: 'Outfit', 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #09090b; padding: 2.5rem; background-color: #ffffff; box-shadow: 6px 6px 0px #09090b;">
        <div style="background-color: #f43f5e; color: #ffffff; padding: 1.5rem; border: 3px solid #09090b; text-align: center; margin-bottom: 2rem; box-shadow: 4px 4px 0px #09090b;">
          <h1 style="margin: 0; font-size: 1.8rem; font-weight: 900; letter-spacing: -0.02em;">⚡ NUEVO LEAD DE COTIZACIÓN</h1>
        </div>
        
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem; color: #09090b;">Tienes una nueva solicitud de presupuesto desde fabipers.com:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b; width: 35%;">Nombre:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46;">${name}</td>
          </tr>
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b;">Email:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46;">${email}</td>
          </tr>
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b;">Teléfono:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46;">${phone}</td>
          </tr>
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b;">Sitio Web:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46;">${website ? `<a href="${website}" style="color: #f43f5e; font-weight: 700;">${website}</a>` : 'No especificado'}</td>
          </tr>
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b;">Plataformas:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46;">${platformsList}</td>
          </tr>
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b;">Presupuesto:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 0.8rem 0; font-weight: 800; color: #09090b; vertical-align: top;">Objetivo:</td>
            <td style="padding: 0.8rem 0; color: #3f3f46; line-height: 1.5;">${goal}</td>
          </tr>
        </table>
        
        <div style="border-top: 3px solid #09090b; padding-top: 1.5rem; text-align: center;">
          <a href="https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9+]/g, '')}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 0.8rem 1.8rem; border: 3px solid #09090b; font-weight: 800; text-decoration: none; box-shadow: 3px 3px 0px #09090b;">
            💬 Chatear por WhatsApp
          </a>
        </div>
      </div>
    `;

    // 2. Email HTML - Confirmation to the Lead (Client)
    const clientEmailHtml = `
      <div style="font-family: 'Outfit', 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #09090b; padding: 2.5rem; background-color: #ffffff; box-shadow: 6px 6px 0px #09090b;">
        <div style="background-color: #f43f5e; color: #ffffff; padding: 1.5rem; border: 3px solid #09090b; text-align: center; margin-bottom: 2rem; box-shadow: 4px 4px 0px #09090b;">
          <h1 style="margin: 0; font-size: 1.6rem; font-weight: 900; letter-spacing: -0.02em;">¡Cotización en Proceso! ⚡</h1>
        </div>
        
        <p style="font-size: 1.1rem; font-weight: 700; color: #09090b; margin-bottom: 1rem;">Hola ${name},</p>
        
        <p style="color: #3f3f46; line-height: 1.6; margin-bottom: 1.5rem;">
          He recibido correctamente tu solicitud de cotización para tus campañas de marketing digital. A continuación te comparto un resumen de las opciones de interés que seleccionaste:
        </p>
        
        <div style="background-color: #f8fafc; border: 2px solid #09090b; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 3px 3px 0px #09090b;">
          <ul style="margin: 0; padding-left: 1.2rem; color: #0f172a; line-height: 1.8; font-weight: 500;">
            <li><strong>Canales:</strong> ${platformsList}</li>
            <li><strong>Presupuesto de pauta:</strong> ${budget}</li>
            <li><strong>Tu objetivo:</strong> ${goal}</li>
          </ul>
        </div>
        
        <p style="color: #3f3f46; line-height: 1.6; margin-bottom: 2rem;">
          Revisaré los detalles de tu sitio web (${website || 'no especificado'}) y te contactaré a la brevedad por correo o directamente por WhatsApp para presentarte una propuesta formal y agendar una llamada.
        </p>
        
        <div style="border-top: 3px solid #09090b; padding-top: 1.5rem; text-align: center; font-size: 0.9rem; color: #71717a;">
          <p style="margin: 0;">Fabián Pérez | Trafficker Digital & Full Stack Marketer</p>
          <p style="margin: 0.2rem 0 0 0;"><a href="https://fabipers.com" style="color: #f43f5e; font-weight: 700; text-decoration: none;">fabipers.com</a></p>
        </div>
      </div>
    `;

    // Send email to owner
    await transporter.sendMail({
      from: `"Cotizador Fabipers" <${user}>`,
      to: user, // Sends to Fabián's email configured as user
      subject: `⚡ Nuevo Lead: Cotización - ${name}`,
      html: ownerEmailHtml
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: `"Fabián Pérez | Fabipers" <${user}>`,
      to: email,
      subject: `Hemos recibido tu solicitud de cotización | Fabipers`,
      html: clientEmailHtml
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Cotización enviada exitosamente.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error sending quote email:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor al procesar la cotización.', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
