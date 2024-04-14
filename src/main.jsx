import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import './index.css'
import {About} from './pages/About.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {PageNotFound} from './pages/PageNotFound.jsx'
import { ProductDetail } from './pages/ProductDetail.jsx';
import { Layout } from './pages/Layout.jsx';
import { ContactUs } from './pages/ContactUs.jsx';
import { Cart } from './component/Cart.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { store } from './store.js';
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "aboutowner",
        element: <About />
      },
      {
        path: "contactUs",
        element: <ContactUs />
      },
      {
        path: "product/:id",
        element: <ProductDetail />
      },
      {
        path: "cartitems",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />
      }
    ],

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
