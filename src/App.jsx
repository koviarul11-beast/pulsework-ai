
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import './App.css'

const loginSchema = z.object({
  email: z.email({ error: 'Enter a valid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
})

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = () => {
    console.log('Login form is valid')
  }

  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center p-5">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT BRANDING PANEL */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#211744] via-[#17182F] to-[#101827]">

          <div>
            <h1 className="text-3xl font-bold">
              Pulse<span className="text-violet-400">Works</span>
              <span className="text-xs ml-2 text-violet-300 bg-violet-500/20 px-2 py-1 rounded">AI</span>
            </h1>
          </div>

          <div>
            <div className="w-20 h-20 rounded-2xl bg-violet-500/20 border border-violet-400/20 flex items-center justify-center mb-8">
              <span className="text-5xl text-violet-300">✦</span>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Your workspace.
              <span className="block text-violet-400">
                Your intelligence.
              </span>
            </h2>

            <p className="text-gray-400 mt-6 leading-7">
              Bring your projects, people and ideas together.
              Experience smarter collaboration with PulseWorks AI,
              your secure enterprise workspace.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-3">
                <span className="text-violet-400">✦</span>
                <span className="text-sm text-gray-300">Intelligent task management</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-violet-400">✦</span>
                <span className="text-sm text-gray-300">AI-powered document assistance</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-violet-400">✦</span>
                <span className="text-sm text-gray-300">Secure team collaboration</span>
              </div>

            </div>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 PulseWorks AI. All rights reserved.
          </p>

        </div>


        {/* RIGHT LOGIN PANEL */}
        <div className="flex items-center justify-center p-8 sm:p-12 md:p-14">

          <div className="w-full max-w-sm">

            {/* MOBILE BRAND */}
            <div className="md:hidden mb-12">
              <h1 className="text-2xl font-bold">
                Pulse<span className="text-violet-400">Works</span> AI
              </h1>
            </div>

            <div className="mb-9">

              <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 text-2xl mb-6">
                ✦
              </div>

              <h2 className="text-3xl font-bold text-white">
                Welcome back
              </h2>

              <p className="text-gray-400 text-sm mt-3">
                Sign in to continue to your workspace.
              </p>

            </div>


            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              <div className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full h-12 px-4 rounded-lg bg-[#1B2435] border border-white/10 text-white text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>


                {/* PASSWORD */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-300">
                      Password
                    </label>

                    <a href="#forgot" className="text-xs text-violet-400 hover:text-violet-300">
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      aria-invalid={Boolean(errors.password)}
                      className="w-full h-12 px-4 pr-16 rounded-lg bg-[#1B2435] border border-white/10 text-white text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
                      {...register('password')}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400" role="alert">
                      {errors.password.message}
                    </p>
                  )}
                </div>


                {/* REMEMBER */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="accent-violet-500 w-4 h-4"
                  />

                  <label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </label>
                </div>


                {/* LOGIN BUTTON */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold"
                >
                  Sign In →
                </Button>

              </div>

            </form>


            {/* REGISTER LINK */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="#register" className="text-violet-400 font-semibold hover:text-violet-300">
                  Create an account
                </a>
              </p>
            </div>


            {/* SECURITY */}
            <div className="mt-12 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 text-center">
                🔒 Secure Enterprise Workspace
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App
