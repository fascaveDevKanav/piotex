import Head from 'next/head';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Terms & Conditions - Addler</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Terms & Conditions</h1>
        
        <div className="space-y-6 text-gray-700">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Addler website and services, you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to temporarily use Addler website for personal, 
              non-commercial transitory viewing only.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on Addler website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">3. Products and Pricing</h2>
            <p className="leading-relaxed">
              All products are subject to availability. We reserve the right to discontinue 
              any products at any time. Prices are subject to change without notice.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">4. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the 
              laws of the jurisdiction where Addler is established.
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Last updated: October 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}