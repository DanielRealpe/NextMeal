import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { CartProvider } from './assets/pages/Carrito/utilities/cart';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      <App />
    </CartProvider>
  </StrictMode>

)
