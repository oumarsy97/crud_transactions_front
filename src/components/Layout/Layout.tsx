// components/Layout/Layout.tsx
import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white py-4 px-8 shadow-md">
        <h1 className="text-2xl font-bold">Transaction Manager</h1>
      </header>
      <main className="flex-1 py-8 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
      <footer className="bg-gray-800 text-white py-4 px-8 text-center shadow-inner">
        <p>&copy; 2024 Transaction Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
