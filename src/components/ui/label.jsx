import { cn } from '@/lib/utils'

function Label({ className, ...props }) {
  return <label className={cn('app-label', className)} {...props} />
}

export { Label }
