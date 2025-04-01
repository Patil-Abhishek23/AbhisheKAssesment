'use client';
import "./globals.scss";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import React from 'react';


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}