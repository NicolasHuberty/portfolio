import SmartGreeting from "@/components/smart-greeting"

export default function GreetingDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Smart Greeting Demo
          </h1>
          <p className="text-slate-400 text-lg">
            See what's actually possible without OAuth or login
          </p>
        </div>

        <SmartGreeting />

        {/* Code Examples */}
        <div className="mt-12 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              📝 How to Actually Implement Facebook Pixel
            </h2>
            <p className="text-slate-400 mb-4">
              Here's the real Facebook Pixel code (but remember, it won't give you user names!):
            </p>

            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-emerald-400">
{`<!-- Add to your layout.tsx or _document.tsx -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', 'YOUR_PIXEL_ID'); // Replace with your pixel ID
  fbq('track', 'PageView');
</script>

<!-- Track events -->
<script>
  // Track when user clicks a button
  fbq('track', 'ViewContent', {
    content_name: 'Portfolio',
    content_category: 'Website'
  });

  // What this SENDS to Facebook:
  // ✓ Page URL
  // ✓ Referrer
  // ✓ User agent
  // ✓ IP address
  // ✓ Browser info
  // ✓ Cookies (if accepted)

  // What you CANNOT get back:
  // ✗ User's name
  // ✗ Email address
  // ✗ Facebook profile
  // ✗ Any personal information
</script>`}
              </pre>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              🚀 Better Alternatives for "Wow Factor"
            </h2>

            <div className="space-y-4 text-slate-300">
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-lg">
                <h3 className="font-semibold text-emerald-400 mb-2">1. Smart Geolocation Greeting (Currently Implemented Above)</h3>
                <p className="text-sm text-slate-400">
                  "Good evening, visitor from Paris! 🌙" - Uses IP geolocation API
                </p>
              </div>

              <div className="p-4 bg-blue-950/30 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold text-blue-400 mb-2">2. Company Detection (B2B)</h3>
                <p className="text-sm text-slate-400">
                  "Hello visitor from Google!" - Uses Clearbit Reveal or similar services
                </p>
              </div>

              <div className="p-4 bg-purple-950/30 border border-purple-500/20 rounded-lg">
                <h3 className="font-semibold text-purple-400 mb-2">3. Contextual AI Greeting</h3>
                <p className="text-sm text-slate-400">
                  "Hello tech enthusiast browsing at 3 AM from California!" - Combines multiple signals
                </p>
              </div>

              <div className="p-4 bg-pink-950/30 border border-pink-500/20 rounded-lg">
                <h3 className="font-semibold text-pink-400 mb-2">4. Returning Visitor Recognition</h3>
                <p className="text-sm text-slate-400">
                  "Welcome back! Your 3rd visit this week 🎉" - Uses localStorage
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              🛑 What's Illegal or Unethical
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>Using data breach databases (WeLeakInfo, etc.) - <strong>ILLEGAL</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>Scraping social media without authorization - <strong>Violates ToS</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>Browser fingerprinting for tracking - <strong>GDPR violation</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>Reverse-engineering identities without consent - <strong>Privacy violation</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
