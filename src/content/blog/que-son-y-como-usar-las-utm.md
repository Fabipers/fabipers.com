---
title: "Qué son y cómo usar las UTMs"
pubDate: "2019-08-22T16:58:18"
description: "Migrado de WordPress: Qué son y cómo usar las UTMs"
slug: "que-son-y-como-usar-las-utm"
tags: []
categories: ['Analitica web', 'Marketing Digital', 'Tips']
---

El primer paso para poder diseñar y seguir una exitosa campaña de marketing digital es sin duda alguna hacer seguimiento a los datos, sin los datos vamos a estar navegando a la deriva esperando un milagro del cielo que nos permita determinar si estas haciendo bien las cosas o no, por suerte este post será tu faro en la oscuridad, si estás acá es porque probablemente hayas oído hablar de las UTM pero no le has puesto mucha atención porque no sabes para que sirven, así que tomate unos minutos para leer mi articulo y te garantizo que tu vida no será la misma (<s>lo prometo</s>) 🙂

<!--more-->

### Qué significa UTM?

Sobre la duda sustancial, qué es una UTM? esto, como casi todo en el marketing es un acronimo inglés que significa Urchin Traffic Monitor, o al cristiano Monitor de Tráfico Urchin, no tengo idea quien o que fue Unrich, pero según he investigado fue una herramienta que Google compró para poder gestionar mejor los seguimientos o trackings con su herramienta de Google Analytics. Su uso se ha masificado debido a la necesidad que se manejan en grandes y pequeñas campañas de Marketing Digital y el solo uso de está herramienta va a ser una gran diferencia en la manera de cómo realizamos seguimiento a nuestras campañas.

### Qué es UTM?

Una vez conociendo su significado vamos a ver de que trata esta herramienta, las UTM son parámetros que se insertan en nuestras urls de landing pages para conocer y hacer un mejor seguimiento al comportamiento de las visitas que tenemos a traves de campañas de email, CPC, Display, etc. Dichos parámetros los podemos crear nosotros mismos para poderlos ver en nuestras vistas de Google Analytics, y nos van a servir para determinar muchas acciones y mejoras cuando tengamos corriendo nuestras campañas. 

Entonces conocemos que una UTM nos permite hacer seguimiento a nuestras campañas, pero ¿cómo funciona?

### Cómo funcionan las UTMs

Estoy muy seguro que en algún momento has visto url larguísimas cuando estas buscando algún producto o cuando te envían un email y te hace ir a una landing page, mira este **esquema **y piensa si lo has visto alguna vez en tu vida:

**fabipers.com?utm_source=LinkedInOrganic&utm_medium=post&utm_campaign=utm_signficado&utm_term=que_es_una_utm**

Te suena? si es así has visto el esquema de una url con parámetros UTM, si no, entonces debes navegar un poco más 🤣. Pero no pasa nada vamos ahora a entender el significado de cada uno de estos términos

### Códigos o variables en las UTMs

- **<code>utm_source</code>** Es la fuente de la url, o de dónde proviene el tráfico, esto se usa por si necesitas saber de dónde proviene tu tráfico, puede ser de un mail que enviaste, de una campaña en Instagram, de un anuncio que publicaste en Google Ads, etc. Su uso es variable dependiendo de dónde quieres rastrear el tráfio a tu web, como mi ejemplo **utm_source=LinkedInOrganic**, acá espicifico que se rastree el tráfico de LinkedIn y le puse Organic para saber que fue un post orgánico, tu puedes ajustarlo como desees,  **utm_source=GoogleAds ** **utm_source=FacebookOrganic ** **utm_source=TwitterAds **esto ya depende de cómo vayas a trackear el tráfico.
- **utm_medium** Una vez definido la fuente debemos especificar el medio, es decir porque medio llega este tráfico (valga la redundancia) , por ejmplo creaste una campaña de video en Google Ads, entonces tu medio será **medium=video **o si creaste un banner para Display será **medium=display **o enviaste un correo entonces puedes usar **medium=email**. Esto es importante para poder continuar con nuestro etiquetado personalizado.
- **utm_campaign**. Qué nombre tiene la campaña? es indispensable determinar el nombre de nuestras campañas independientemente del medio y la fuente, esto es por si manejas varias campañas y necesitas identificarlas entre los reportes en Analytics, en la url de ejemplo yo puse **utm_campaign=utm_signficado** pero puede ser **utm_campaign=lanzamientoAgosto **o **utm_campaign=ventaCalzado **Ya tu le pondrás el nombre adecuado. Hasta acá las variables deben ser obligatorias ya luego te explico el por qué
- **utm_term** Este parametro nos permite identificar el término por el cual llegan a nuestra url, se usa exclusivamente para campañas en búsqueda, y sirve para identificar las keywords por las cuales nos están encontrando en Google, por ejemplo puedes usar **utm_term=que_es_una_utm** o **utm_term=venta_de_celulares **Aca nos podemos poner más especificos, un gran ejemplo si tenemos una landing page que vende celulares podemos hacerle seguimiento a nuestros grupos de anuncios y usar estos dos terminos venta de celulares y celulares baratos **utm_term=venta_de_celulares y utm_term=celulares_baratos **con esto determinamos cual de las 2 keyword tiene mas visitas a una sola landing, genial no?
- **utm_content** es opcional, esto solo es para tráfico interno y te sirve para identificar si tienes varios banners o botones en una misma landing page, puedes usar por ejemplo **utm_content=bannerAzul** o **utm_content=botonContacto** es opcional así que no hay problema si lo agregas o no.

Todo esta bien pero cómo hacemos para crear esas UTMs? pues existe una aplicación que hace esta construcción muy fácil se llama Campaing Url builder y este es el enlace:  [https://ga-dev-tools.appspot.com/campaign-url-builder/](https://ga-dev-tools.appspot.com/campaign-url-builder/) 

### Ventajas de usar las UTMs

Creo que es hora de conocer qué vamos a obtener si usamos el etiquetado personalizado de urls [tal cual nos lo enseña Google en estas recomendaciones](https://support.google.com/analytics/answer/1037445?hl=es&ref_topic=1032998) es hora de saber qué vamos a obtener si hacemos uso de las UTMs

- Mejorar el tracking de tu tráfico
- Determinar si tus campañas están teniendo tráfico de calidad
- Saber cual campaña no está teniendo los resultados esperados
- Hacer seguimiento a una sola URL y conocer el performance desde varias plataformas como Google, Facebook, campañas de mailing, etc.
- Tener un control general sobre el tráfico de tus campañas.
- Mejorar tus conversiones
- Saber qué keywords son las más usadas y las que mas convierten.
- Te ahorra tiempo ya que puedes tener toda esa data de manera mas sencilla
- Te da una visión mas completa del tráfico de tus landing pages
- Te hace conocer si tus anuncios de imágenes están teniendo éxito.

### Cómo crear las UTMs?

Si has llegado hasta este punto, me alegra mucho, significa que mis habilidades en bloging están en aumento 😎, bien ya sabemos todo lo relacionado a las UTMs, asi que crearlas va a ser muy sencillo con esta herramienta:

<div class="wp-block-image"><figure class="aligncenter">![constructor utm](https://fabipers.com/wp-content/uploads/2019/08/utm1.png)<figcaption>Estructura herramienta UTM de Google URL builder</figcaption></figure></div>

Cuando lleguemos a esta página te vas a encontrar con un formulario muy sencillo e intuitivo, solo debes agregar lo que hemos repasado en la construcción de tu URL personalizada, justo abajo la herramienta une todos los parámetros que has ingresado para que los puedas usar en tus enlaces o campañas:

<div class="wp-block-image"><figure class="aligncenter">![constructor utm ](https://fabipers.com/wp-content/uploads/2019/08/utm2.png)<figcaption>La herramienta URL builder une todos los parámetros por ti</figcaption></figure></div>

Vale, finalmente ya tienes tu URL con parametros UTM, y acá tines dos opciones copiarla tal cual te la muestra la herramienta o convertirla mediante [Bitly](https://bitly.com) para que la puedas mostrar en tus post de redes sociales y evitar que se vea la ULR muy larga, ya es decisión tuya. 

### Cómo medir el tráfico de UTMs en Analytics

Es necesario conocer cómo sacar estos datos si no, toda la lectura habrá sido en vano, pero es muy sencillo tomar estos datos y existen dos maneras, ver el tráfico de UTMs en tiempo real y verlo a lo largo de un periodo determinado.

**Para verlo en tiempo real**. Debes ir en tu cuenta de Analytics a la opción "en Tiempo real" y seleccionar  "Fuentes de Tráfico" acá te va a mostrar las personas que en ese instante están en tu sitio web y que Medio y Tráfico usaron para llegar a tu web, esto es dependiendo de los tráficos y fuentes que hayas configurado en tus parámetros:

<figure class="wp-block-image">![analytics en las utms](https://fabipers.com/wp-content/uploads/2019/08/utm3-1024x468.png)<figcaption>Acá existen 3 usuarios uno de los cuales ingreso por la fuente (Source) Google y el medio (Medium) fue CPC</figcaption></figure>

**Periodo determinado**. Claro no vamos a estar todo el día en este panel para saber de que medio nos visitaron, y para sacar los datos en determinado tiempo solo debemos ir en nuestro Google Analytics a "Adquisición" luego elegir "Todo el tráfico" y por último "Fuente/Medio", no olvides determinar el filtro en el periodo de tiempo que lo desees ver:

<div class="wp-block-image"><figure class="aligncenter">![medición de las UTMs](https://fabipers.com/wp-content/uploads/2019/08/utm4.png)<figcaption>Acá vemos todo el tráfico según la fuente o medio</figcaption></figure></div>

**Importante**. Fíjate en la imagen que tache una línea <s>recta</s> en rojo, acá puedes filtrar los demás parámetros que haz creado en tu URL, esto te ayuda a entender de una mejor manera las variables que hemos construido y sacar todas las métricas que te da Analytics con estos datos: cantidad de usuarios, rebote, tiempo en el sitio, sesiones, paginas por sesión, conversiones, etc.

### Conclusión

Creo que hemos captado todo lo que podemos hacer con las UTMs, su importancia depende de entender de una mejor manera que es una UTM, para que sirve una UTM, como medir las UTMs y porque necesitamos las UTM en nuestras vidas, acuérdate que decidir que datos vamos a medir es la tarea principal antes de iniciar una campaña en marketing digital, y el uso y tratamiento que les demos a estos datos nos garantiza una buena gestión de recursos y mejoras en nuestro camino a optimizar nuestras campañas, así que gracias por estos minutos de tu vida y espero que este post te haya dado un mejor panorama en cómo usar la Analítica web, ya saben:

<pre style="text-align:center" class="wp-block-verse">**Optimizar o morir**</pre>

Si te gustó este post, me puede ayudar a compartir está inforamción con tus colegas o redes sociales y hacer que todos podamos mejorar nuestras campañas, si compartes me ayudas un montón a poder realizar muchos más tutoriales como este, si tienes dudas puedes preguntarlas por este medio, muchas gracias!