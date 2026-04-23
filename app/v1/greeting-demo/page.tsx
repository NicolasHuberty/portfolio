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
            See what&apos;s actually possible without OAuth or login
          </p>
        </div>
        <SmartGreeting />
      </div>
    </main>
  )
}
