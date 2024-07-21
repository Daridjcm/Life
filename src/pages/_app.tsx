// pages/_app.tsx
import '../styles/index.css'; // Asegúrate de que la ruta sea correcta
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
