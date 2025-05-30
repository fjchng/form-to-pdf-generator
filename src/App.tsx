import React from 'react';
import { FormContainer } from './components/FormContainer';
import { FileBadge, FileText } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Branded Form to PDF Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below, upload your images, and we'll generate a professionally branded PDF document for you to download.
          </p>
        </header>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <FileBadge className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Your Information</h2>
            </div>
            
            <FormContainer />
          </div>
          
          <div className="bg-gray-50 px-6 py-4 text-sm text-gray-500 border-t">
            <p>
              All information submitted will be used only for generating your PDF document. 
              Your data is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;