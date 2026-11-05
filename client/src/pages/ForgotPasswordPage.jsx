import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-hot-toast'
import { Mail, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/common/Button'
import FormInput from '../components/common/FormInput'
import GlassCard from '../components/common/GlassCard'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      await resetPassword(values.email)
      setSent(true)
      toast.success('Password reset link dispatched!')
    } catch (err) {
      toast.error(err.message || 'Failed to dispatch reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080b1e] bg-system-grid flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center glow-blue">
            <Sparkles className="w-6 h-6 text-cyan-300" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold font-display text-white tracking-wide">
          RESET <span className="text-gradient-electric">CREDENTIALS</span>
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-mono">
          [ RESTORE SYSTEM ACCESS PROTOCOL ]
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard className="p-8 border-blue-500/30 glow-blue">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If a Hunter profile matches that email, instructions to reset your passcode have been transmitted.
              </p>
              <Link to="/login" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Registered College Email"
                name="email"
                type="email"
                placeholder="hunter@college.edu"
                icon={Mail}
                register={register}
                error={errors.email}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-2"
              >
                Dispatch Reset Link
              </Button>

              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

