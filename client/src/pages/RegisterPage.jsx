import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-hot-toast'
import { User, Mail, Lock, Sparkles, Shield, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import FormInput from '../components/common/FormInput'
import GlassCard from '../components/common/GlassCard'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'],
})

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      await signUp(values.email, values.password, values.fullName)
      toast.success('Hunter Awakened! Proceeding to Hunter Onboarding...', {
        icon: '⚔️',
      })
      navigate('/onboarding')
    } catch (err) {
      toast.error(err.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080b1e] bg-system-grid flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center glow-blue group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-cyan-300" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide">
          AWAKEN YOUR <span className="text-gradient-electric">HUNTER PROFILE</span>
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 font-mono">
          [ COMMENCE PLACEMENT PREPARATION PROTOCOL ]
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard className="p-8 border-blue-500/30 glow-blue">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Full Name"
              name="fullName"
              placeholder="Jinwoo Sung"
              icon={User}
              register={register}
              error={errors.fullName}
              required
            />

            <FormInput
              label="College Email"
              name="email"
              type="email"
              placeholder="candidate@university.edu"
              icon={Mail}
              register={register}
              error={errors.email}
              required
            />

            <FormInput
              label="System Password"
              name="password"
              type="password"
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              icon={Lock}
              register={register}
              error={errors.password}
              required
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              icon={Lock}
              register={register}
              error={errors.confirmPassword}
              required
            />

            <div className="text-[11px] text-slate-400 leading-relaxed">
              By awakening, you agree to our Terms of Training and confirm your goal to build genuine CSE placement abilities.
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
              icon={Shield}
              iconPosition="left"
            >
              Awaken Hunter Profile
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an active profile?{' '}
            <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
              Sign In
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

