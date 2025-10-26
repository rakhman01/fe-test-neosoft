import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import PageProduct from './app/products/page'
import PageTransaction from './app/transactions/page';
import PagePatient from './app/patient/page';

function App() {
  const queryClient = new QueryClient();
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="container mx-auto px-8 py-4">
            <div className="flex gap-4 border-b">
              <button
                onClick={() => setActiveTab('patients')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'patients'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pasien
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'transactions'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Transactions
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === 'products' ? <PageProduct /> : activeTab === 'patients' ? <PagePatient /> : <PageTransaction />}

      </div>
    </QueryClientProvider>
  )
}

export default App
