import React from "react"

export function Alert({ children, className = "", ...props }) {
  return (
    <div
      className={`relative w-full rounded-lg border p-4 flex items-start gap-2 ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  )
}

export function AlertDescription({ children, className = "" }) {
  return <div className={`text-sm ${className}`}>{children}</div>
}
