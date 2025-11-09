import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Privacy Policy - Addler</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support.
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Shipping and billing address</li>
              <li>Payment information</li>
              <li>Purchase history and preferences</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Process your orders and transactions</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our products and services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect 
              your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cookies</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website 
              and hold certain information to enhance your shopping experience.
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              For any privacy-related questions, contact us at privacy@addler.com
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}