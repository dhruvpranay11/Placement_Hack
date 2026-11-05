import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-hot-toast'
import { Mail, Lock, Sparkles, Shield, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import FormInput from '../components/common/FormInput'
import GlassCard from '../components/common/GlassCard'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      await signIn(values.email, values.password)
      toast.success('Welcome back, Hunter! Accessing System...', {
        icon: '⚔️',
      })
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Failed to authenticate. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // Quick Demo Login for evaluator convenience
  const handleQuickDemoLogin = async () => {
    setLoading(true)
    try {
      await signIn('hunter@placeready.ai', 'password123')
      toast.success('Hunter Access Granted! Welcome to PlaceReady AI.', {
        icon: '🛡️',
      })
      navigate('/dashboard')
    } catch (err) {
      toast.error('Demo login error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080b1e] bg-system-grid flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center glow-blue group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-cyan-300" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide">
          WELCOME BACK, <span className="text-gradient-electric">HUNTER</span>
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-mono">
          [ AUTHENTICATE TO RESUME TRAINING PROTOCOL ]
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard className="p-8 border-blue-500/30 glow-blue">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Hunter Email"
              name="email"
              type="email"
              placeholder="hunter@college.edu"
              icon={Mail}
              register={register}
              error={errors.email}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password <span className="text-red-400">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <FormInput
                name="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                register={register}
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to System
            </Button>
          </form>

          {/* Quick Demo Button for Hackathon Evaluators */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleQuickDemoLogin}
              disabled={loading}
              className="w-full text-xs font-mono border-dashed border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/30"
              icon={Shield}
            >
              ⚡ Instant Evaluator Demo Access
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have a Hunter Profile yet?{' '}
            <Link to="/register" className="font-semibold text-cyan-400 hover:text-cyan-300">
              Awaken Profile
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

