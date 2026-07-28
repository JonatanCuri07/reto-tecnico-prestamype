rmite realizar conversiones entre dólares y soles utilizando las tasas de compra y venta obtenidas desde Firebase. La aplicación escucha los cambios del documento en tiempo real, por lo que las tasas se actualizan sin necesidad de recargar la página.

## Funcionalidades

- Conversión de dólares a soles.
- Conversión de soles a dólares.
- Cambio de dirección mediante el botón central.
- Uso de las tasas `purchase_price` y `sale_price`.
- Actualización de tasas en tiempo real desde Firebase.
- Manejo de estados de carga y error.
- Diseño responsive para escritorio y dispositivos móviles.
- Comunicación entre componentes mediante props y eventos.

## Tecnologías utilizadas

- Vue 3
- TypeScript
- Vite
- Pinia
- Firebase / Cloud Firestore
- Tailwind CSS

## Requisitos

- Node.js 22.18.0
- npm

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/JonatanCuri07/reto-tecnico-prestamype.git
```

Ingresar a la carpeta del proyecto:

```bash
cd reto-tecnico-prestamype
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` tomando como base `.env.example`.

Completar las siguientes variables con la configuración de Firebase proporcionada para el reto:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Scripts disponibles

Ejecutar el proyecto en desarrollo:

```bash
npm run dev
```

Validar los tipos y generar la versión de producción:

```bash
npm run build
```
