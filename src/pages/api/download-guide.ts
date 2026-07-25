import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email } = data;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ message: 'Por favor proporciona tu nombre y correo electrónico.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    // 1. Email to Fabián (Lead Notification)
    const ownerEmailHtml = `
      <div style="font-family: 'Outfit', 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #09090b; padding: 2.5rem; background-color: #ffffff; box-shadow: 6px 6px 0px #09090b;">
        <div style="background-color: #f43f5e; color: #ffffff; padding: 1.5rem; border: 3px solid #09090b; text-align: center; margin-bottom: 2rem; box-shadow: 4px 4px 0px #09090b;">
          <h1 style="margin: 0; font-size: 1.6rem; font-weight: 900;">🔥 NUEVO LEAD: LEAD MAGNET</h1>
        </div>
        
        <p style="font-size: 1.1rem; font-weight: 600; color: #09090b;">Un nuevo usuario ha descargado la guía "Checklist: 5 Errores que Drenan tu Presupuesto en Ads":</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: 700; color: #09090b;">Nombre:</td>
            <td style="padding: 12px; color: #09090b;">${name}</td>
          </tr>
          <tr style="border-bottom: 2px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: 700; color: #09090b;">Email:</td>
            <td style="padding: 12px; color: #09090b;"><a href="mailto:${email}" style="color: #f43f5e; font-weight: 700;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: 700; color: #09090b;">Fecha:</td>
            <td style="padding: 12px; color: #09090b;">${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 2px dashed #e2e8f0; font-size: 0.85rem; color: #64748b;">
          Enviado automáticamente desde fabipers.com
        </div>
      </div>
    `;

    // 2. Email to User (Download Link)
    const userEmailHtml = `
      <div style="font-family: 'Outfit', 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #09090b; padding: 2.5rem; background-color: #ffffff; box-shadow: 6px 6px 0px #09090b;">
        <div style="background-color: #09090b; color: #ffffff; padding: 1.5rem; border: 3px solid #09090b; text-align: center; margin-bottom: 2rem; box-shadow: 4px 4px 0px #f43f5e;">
          <h1 style="margin: 0; font-size: 1.6rem; font-weight: 900;">⚡ ¡Aquí tienes tu Checklist!</h1>
        </div>
        
        <p style="font-size: 1.1rem; font-weight: 600; color: #09090b;">Hola ${name},</p>
        
        <p style="font-size: 1rem; color: #334155; line-height: 1.6;">
          Gracias por solicitar la guía <strong>"Checklist: Los 5 Errores que Drenan tu Presupuesto en Ads"</strong>.
        </p>
        
        <p style="font-size: 1rem; color: #334155; line-height: 1.6;">
          Haz clic en el siguiente botón para descargar directamente tu recurso en formato PDF:
        </p>
        
        <div style="text-align: center; margin: 2.5rem 0;">
          <a href="https://fabipers.com/checklist.pdf" target="_blank" style="background-color: #f43f5e; color: #ffffff; padding: 1rem 2rem; font-weight: 900; font-size: 1.1rem; text-decoration: none; border: 3px solid #09090b; box-shadow: 4px 4px 0px #09090b; display: inline-block; text-transform: uppercase;">
            📄 Descargar Checklist PDF
          </a>
        </div>
        
        <p style="font-size: 0.95rem; color: #64748b; line-height: 1.6;">
          Si deseas que analicemos juntos las campañas de tu negocio y detengamos la fuga de presupuesto en vivo, puedes agendar una asesoría directa o usar nuestro <a href="https://fabipers.com/servicios#cotizador-sec" style="color: #f43f5e; font-weight: 700;">Cotizador Online</a>.
        </p>
        
        <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 2px dashed #cbd5e1; font-size: 0.9rem; color: #09090b;">
          <strong>Fabián Pérez</strong><br />
          Trafficker Digital & Full Stack Marketer<br />
          <a href="https://fabipers.com" style="color: #f43f5e;">fabipers.com</a>
        </div>
      </div>
    `;

    // Send notification to owner
    await transporter.sendMail({
      from: `"Fabipers Lead Magnet" <${user}>`,
      to: user,
      subject: `⚡ NUEVO LEAD (Lead Magnet): ${name}`,
      html: ownerEmailHtml
    });

    // Send confirmation & link to user
    await transporter.sendMail({
      from: `"Fabián Pérez | Trafficker Digital" <${user}>`,
      to: email,
      subject: `📄 Tu Checklist: 5 Errores que Drenan tu Presupuesto en Ads`,
      html: userEmailHtml
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Guía enviada exitosamente.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('Error enviando email de Lead Magnet:', err);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor al procesar la solicitud.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
