import React from 'react'

export default function SkeletonLoader({
  variant = 'card', // 'card', 'text', 'avatar', 'stat'
  count = 1,
  className = '',
}) {
  const items = Array.from({ length: count })

  const renderSkeleton = (key) => {
    switch (variant) {
      case 'avatar':
        return <div key={key} className={`w-12 h-12 rounded-full bg-slate-800/80 animate-shimmer ${className}`} />
      case 'text':
        return <div key={key} className={`h-4 bg-slate-800/80 rounded-md animate-shimmer ${className}`} />
      case 'stat':
        return (
          <div key={key} className={`glass-panel p-5 space-y-3 animate-shimmer ${className}`}>
            <div className="h-3 w-20 bg-slate-800 rounded" />
            <div className="h-7 w-28 bg-slate-800 rounded" />
            <div className="h-3 w-16 bg-slate-850 rounded" />
          </div>
        )
      case 'card':
      default:
        return (
          <div key={key} className={`glass-panel p-6 space-y-4 animate-shimmer ${className}`}>
            <div className="h-5 w-1/3 bg-slate-800 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-800/70 rounded" />
              <div className="h-3 w-4/5 bg-slate-800/70 rounded" />
            </div>
          </div>
        )
    }
  }

  return <>{items.map((_, i) => renderSkeleton(i))}</>
}

