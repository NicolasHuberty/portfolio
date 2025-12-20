import SmartGreeting from "@/components/smart-greeting"

export default function GreetingDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent">
            Smart Greeting Demo
          </h1>
          <p className="text-lg text-slate-400">
            See what's actually possible without OAuth or login
          </p>
        </div>

        <SmartGreeting />

        {/* Code Examples */}
        <div className="mt-12 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-slate-200">
              📝 How to Actually Implement Facebook Pixel
            </h2>
            <p className="mb-4 text-slate-400">
              Here's the real Facebook Pixel code (but remember, it won't give
              you user names!):
            </p>

            <div className="overflow-x-auto rounded-lg bg-slate-900 p-4">
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
            <h2 className="mb-4 text-2xl font-bold text-slate-200">
              🚀 Better Alternatives for "Wow Factor"
            </h2>

            <div className="space-y-4 text-slate-300">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 p-4">
                <h3 className="mb-2 font-semibold text-emerald-400">
                  1. Smart Geolocation Greeting (Currently Implemented Above)
                </h3>
                <p className="text-sm text-slate-400">
                  "Good evening, visitor from Paris! 🌙" - Uses IP geolocation
                  API
                </p>
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-blue-950/30 p-4">
                <h3 className="mb-2 font-semibold text-blue-400">
                  2. Company Detection (B2B)
                </h3>
                <p className="text-sm text-slate-400">
                  "Hello visitor from Google!" - Uses Clearbit Reveal or similar
                  services
                </p>
              </div>

              <div className="rounded-lg border border-purple-500/20 bg-purple-950/30 p-4">
                <h3 className="mb-2 font-semibold text-purple-400">
                  3. Contextual AI Greeting
                </h3>
                <p className="text-sm text-slate-400">
                  "Hello tech enthusiast browsing at 3 AM from California!" -
                  Combines multiple signals
                </p>
              </div>

              <div className="rounded-lg border border-pink-500/20 bg-pink-950/30 p-4">
                <h3 className="mb-2 font-semibold text-pink-400">
                  4. Returning Visitor Recognition
                </h3>
                <p className="text-sm text-slate-400">
                  "Welcome back! Your 3rd visit this week 🎉" - Uses
                  localStorage
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6">
            <h2 className="mb-4 text-2xl font-bold text-red-400">
              🛑 What's Illegal or Unethical
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>
                  Using data breach databases (WeLeakInfo, etc.) -{" "}
                  <strong>ILLEGAL</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>
                  Scraping social media without authorization -{" "}
                  <strong>Violates ToS</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>
                  Browser fingerprinting for tracking -{" "}
                  <strong>GDPR violation</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">✗</span>
                <span>
                  Reverse-engineering identities without consent -{" "}
                  <strong>Privacy violation</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
