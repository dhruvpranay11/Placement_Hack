import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function FormSelect({
  label,
  name,
  options = [], // [{ value, label }] or string array
  icon: Icon,
  error,
  register,
  className = '',
  required = false,
  placeholder = 'Select an option',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative rounded-xl overflow-hidden">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <select
          id={name}
          className={`w-full appearance-none bg-[#0a0f30]/80 border ${
            error ? 'border-red-500/80 focus:border-red-400' : 'border-blue-500/25 focus:border-blue-400'
          } rounded-xl py-2.5 ${Icon ? 'pl-10' : 'pl-3.5'} pr-10 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
          {...(register ? register(name) : {})}
          {...props}
        >
          {placeholder && <option value="" className="bg-[#0a0f30] text-slate-500">{placeholder}</option>}
          {options.map((opt, i) => {
            const val = typeof opt === 'string' ? opt : opt.value
            const lbl = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={i} value={val} className="bg-[#0b1033] text-slate-200">
                {lbl}
              </option>
            )
          })}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-400 font-medium pl-1 flex items-center gap-1">
          <span>•</span> {error.message || error}
        </p>
      )}
    </div>
  )
}

