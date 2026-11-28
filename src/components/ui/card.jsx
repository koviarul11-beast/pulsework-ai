import { cn } from '@/lib/utils'

function Card({ className, ...props }) {
  return <div className={cn('app-card', className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn('app-card-content', className)} {...props} />
}

export { Card, CardContent }
