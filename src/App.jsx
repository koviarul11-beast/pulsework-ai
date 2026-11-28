import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Command,
  LayoutDashboard,
  ListTodo,
  LockKeyhole,
  Mail,
  Menu,
  Plus,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import './App.css'

const taskSchema = z.object({
  title: z.string().trim().min(3, 'Use at least 3 characters for the task title.'),
  description: z.string().trim().min(1, 'Add a short task description.'),
  employee: z.string().min(1, 'Choose an employee.'),
  priority: z.enum(['Low', 'Medium', 'High'], { error: 'Choose a priority.' }),
  dueDate: z.string().min(1, 'Choose a due date.').refine(
    (value) => !Number.isNaN(Date.parse(value)),
    'Enter a valid due date.',
  ),
  status: z.enum(['Pending', 'In Progress', 'Completed'], { error: 'Choose a task status.' }),
})

const loginSchema = z.object({
  email: z.email({ error: 'Enter a valid email address.' }),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.email({ error: 'Enter a valid email address.' }),
  password: z.string().min(8, 'Use at least 8 characters.'),
  confirmPassword: z.string().min(1, 'Confirm your password.'),
}).refine((values) => values.password === values.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match.',
})

const requestEmployees = () => api.get('/users').then(({ data }) => data)

const featureItems = [
  {
    icon: ListTodo,
    title: 'Work, in one clear view',
    description: 'Bring priorities, deadlines, and ownership together so every next step feels obvious.',
  },
  {
    icon: UsersRound,
    title: 'Teams that move together',
    description: 'Keep people connected to the work and give everyone a shared picture of progress.',
  },
  {
    icon: Sparkles,
    title: 'More focus, less busywork',
    description: 'Make room for deep work with thoughtful workflows that take the friction out of planning.',
  },
]

function Brand({ light = false }) {
  return (
    <Link className={`brand ${light ? 'brand-light' : ''}`} to="/" aria-label="Pulseworks home">
      <span className="brand-name">pulseworks</span>
      <span className="brand-ai">AI</span>
    </Link>
  )
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="landing-page">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`} aria-label="Main navigation">
            <a href="#features" onClick={() => setMenuOpen(false)}>Why Pulseworks</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
            <div className="nav-actions">
              <Button variant="ghost" render={<Link to="/login" />}>Log in</Button>
              <Button className="button-gold" render={<Link to="/register" />}>Get started <ArrowRight size={16} /></Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A calmer way to get work done</div>
          <h1>Good work happens when <span>everything</span> comes together.</h1>
          <p className="hero-description">
            A thoughtful workspace for ambitious teams. Plan the work, bring your people along,
            and make progress you can actually feel.
          </p>
          <div className="hero-actions">
            <Button className="button-dark" size="lg" render={<Link to="/register" />}>Build your workspace <ArrowRight size={17} /></Button>
            <a className="text-link" href="#features">Explore the platform <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true">
              <span>AM</span><span>JR</span><span>SK</span><span>+</span>
            </div>
            <p><strong>Made for teams that care</strong><br />Thoughtful work starts with a better rhythm.</p>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-photo"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
            alt="Colleagues collaborating around a table"
          />
          <div className="hero-photo-shade" />
          <div className="visual-caption">
            <span className="caption-dot" />
            <span>Better together, every day</span>
          </div>
          <div className="floating-note">
            <span className="note-icon"><Check size={16} /></span>
            <div><strong>Project momentum</strong><span>Looking really good</span></div>
            <ArrowUpRight size={16} className="note-arrow" />
          </div>
          <div className="visual-index">01 <span>/</span> 03</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Platform benefits">
        <p>SPACE TO DO YOUR BEST WORK</p>
        <div><ShieldCheck size={16} /> Private by design</div>
        <div><Clock3 size={16} /> Clear by default</div>
        <div><UsersRound size={16} /> Better together</div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> The workday, reimagined</div>
            <h2>Less juggling.<br /><span>More meaningful work.</span></h2>
          </div>
          <p>Everything your team needs to stay aligned and make progress, without adding another layer of complexity.</p>
        </div>
        <div className="feature-grid">
          {featureItems.map(({ icon: Icon, title, description }, index) => (
            <article className="feature-card" key={title}>
              <div className={`feature-icon feature-icon-${index}`}><Icon size={20} strokeWidth={1.8} /></div>
              <span className="feature-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowUpRight className="feature-arrow" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="story-section" id="approach">
        <div className="story-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
            alt="Team sharing ideas during a working session"
            loading="lazy"
          />
          <div className="image-label">Space for your next big idea</div>
        </div>
        <div className="story-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A little more human</div>
          <h2>Make room for the work that <span>matters.</span></h2>
          <p>Less switching between tools. More clarity around who is doing what, and why. Pulseworks helps your team build a rhythm that feels good and gets great work over the line.</p>
          <Link className="text-link" to="/register">Find your team’s rhythm <ArrowRight size={16} /></Link>
          <div className="story-stat"><strong>One</strong><span>shared place to get everyone moving forward.</span></div>
        </div>
      </section>

      <footer className="site-footer">
        <Brand />
        <p>Make meaningful work, together.</p>
        <div><Link to="/login">Log in</Link><Link to="/register">Create account</Link></div>
        <span className="footer-copy">© 2026 Pulseworks</span>
      </footer>
    </main>
  )
}

function AuthLayout({ children, heading, description, mode }) {
  return (
    <main className="auth-page">
      <section className="auth-story">
        <Brand light />
        <div className="auth-story-content">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> A workspace with room to grow</div>
          <h1>{heading}</h1>
          <p>{description}</p>
          <div className="auth-photo">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=85" alt="Team collaborating in a bright studio" />
            <span>Good ideas move further together.</span>
          </div>
        </div>
        <span className="auth-copyright">© 2026 Pulseworks · Thoughtfully made for teams</span>
      </section>
      <section className="auth-main">
        <div className="auth-mobile-brand"><Brand /></div>
        <Card className="auth-card">
          <CardContent>
            <div className="auth-heading">
              <span className="auth-kicker">{mode === 'login' ? 'YOUR WORKSPACE IS WAITING' : 'START SOMETHING GOOD'}</span>
              <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
              <p>{mode === 'login' ? 'Sign in to pick up where you left off.' : 'A better workday starts with a few details.'}</p>
            </div>
            {children}
            <p className="auth-switch">
              {mode === 'login' ? 'New to Pulseworks?' : 'Already part of Pulseworks?'}{' '}
              <Link to={mode === 'login' ? '/register' : '/login'}>
                {mode === 'login' ? 'Create an account' : 'Sign in'}
              </Link>
            </p>
            <div className="auth-secure"><LockKeyhole size={14} /> Your team’s information stays private.</div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function FormError({ children }) {
  if (!children) return null
  return <p className="field-error" role="alert">{children}</p>
}

function LoginPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (values) => {
    console.info('Login form submitted', { email: values.email })
    setMessage('You’re signed in. Your workspace is ready.')
    window.setTimeout(() => navigate('/dashboard'), 700)
  }

  return (
    <AuthLayout mode="login" heading={<>A better way to<br />move work forward.</>} description="A focused home for your people, projects, and next great ideas.">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field-group">
          <Label htmlFor="login-email">Email address</Label>
          <div className="input-with-icon"><Mail size={17} /><Input id="login-email" type="email" placeholder="you@company.com" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} /></div>
          <FormError>{errors.email?.message}</FormError>
        </div>
        <div className="field-group">
          <div className="field-label-row"><Label htmlFor="login-password">Password</Label><Link to="/forgot-password">Forgot password?</Link></div>
          <div className="input-with-icon"><LockKeyhole size={17} /><Input id="login-password" type="password" placeholder="Enter your password" autoComplete="current-password" aria-invalid={Boolean(errors.password)} {...register('password')} /></div>
          <FormError>{errors.password?.message}</FormError>
        </div>
        {message && <p className="form-success" role="status">{message}</p>}
        <Button className="auth-submit" type="submit" disabled={isSubmitting}>Sign in <ArrowRight size={16} /></Button>
      </form>
    </AuthLayout>
  )
}

function RegisterPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = ({ name, email }) => {
    console.info('Registration form submitted', { name, email })
    setMessage('Your account is ready. Sign in to continue.')
    window.setTimeout(() => navigate('/login'), 900)
  }

  return (
    <AuthLayout mode="register" heading={<>Good work starts<br />with a good team.</>} description="Create your space to plan clearly, collaborate openly, and make progress together.">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field-group">
          <Label htmlFor="register-name">Full name</Label>
          <Input id="register-name" placeholder="Jordan Lee" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
          <FormError>{errors.name?.message}</FormError>
        </div>
        <div className="field-group">
          <Label htmlFor="register-email">Email address</Label>
          <Input id="register-email" type="email" placeholder="you@company.com" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register('email')} />
          <FormError>{errors.email?.message}</FormError>
        </div>
        <div className="auth-input-grid">
          <div className="field-group">
            <Label htmlFor="register-password">Password</Label>
            <Input id="register-password" type="password" placeholder="8+ characters" autoComplete="new-password" aria-invalid={Boolean(errors.password)} {...register('password')} />
            <FormError>{errors.password?.message}</FormError>
          </div>
          <div className="field-group">
            <Label htmlFor="register-confirm">Confirm password</Label>
            <Input id="register-confirm" type="password" placeholder="Repeat password" autoComplete="new-password" aria-invalid={Boolean(errors.confirmPassword)} {...register('confirmPassword')} />
            <FormError>{errors.confirmPassword?.message}</FormError>
          </div>
        </div>
        {message && <p className="form-success" role="status">{message}</p>}
        <Button className="auth-submit" type="submit" disabled={isSubmitting}>Create account <ArrowRight size={16} /></Button>
        <p className="terms-note">By creating an account, you agree to keep things thoughtful and respectful.</p>
      </form>
    </AuthLayout>
  )
}

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(z.object({ email: z.email({ error: 'Enter a valid email address.' }) })),
  })
  return (
    <main className="forgot-page">
      <Brand />
      <Card className="forgot-card">
        <CardContent>
          <span className="auth-kicker">ACCOUNT SUPPORT</span>
          <h1>Reset your password</h1>
          <p>Enter your email and we’ll send you a link to reset your password.</p>
          {sent ? (
            <p className="form-success" role="status">If an account exists for that email, a reset link is on its way.</p>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit(() => setSent(true))} noValidate>
              <div className="field-group">
                <Label htmlFor="reset-email">Email address</Label>
                <Input id="reset-email" type="email" placeholder="you@company.com" {...register('email')} />
                <FormError>{errors.email?.message}</FormError>
              </div>
              <Button className="auth-submit" type="submit">Send reset link <ArrowRight size={16} /></Button>
            </form>
          )}
          <Link className="back-link" to="/login">Back to sign in</Link>
        </CardContent>
      </Card>
    </main>
  )
}

function WorkspaceLayout({ children, title, description }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)
  return (
    <main className="workspace">
      <aside className={`workspace-sidebar ${sidebarOpen ? 'workspace-sidebar-open' : ''}`}>
        <div className="workspace-brand-row"><Brand /><button className="sidebar-close" type="button" onClick={closeSidebar} aria-label="Close menu"><X size={18} /></button></div>
        <p className="sidebar-label">WORKSPACE</p>
        <nav className="workspace-nav" aria-label="Workspace navigation">
          <NavLink to="/dashboard" onClick={closeSidebar}><LayoutDashboard size={17} /> Overview</NavLink>
          <NavLink to="/tasks/new" onClick={closeSidebar}><ListTodo size={17} /> Create a task</NavLink>
          <a href="#team" onClick={closeSidebar}><UsersRound size={17} /> Team directory</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><CircleHelp size={17} /><div><strong>Need a hand?</strong><span>We’re here to help.</span></div></div>
          <Link to="/" className="sidebar-home">← Back to Pulseworks</Link>
        </div>
      </aside>
      {sidebarOpen && <button className="sidebar-backdrop" onClick={closeSidebar} aria-label="Close menu" />}
      <section className="workspace-main">
        <header className="workspace-topbar">
          <button type="button" className="workspace-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          <div className="workspace-breadcrumb"><span>Workspace</span><span>/</span><strong>{title}</strong></div>
          <div className="user-avatar" aria-label="Account menu">JL</div>
        </header>
        <div className="workspace-content">
          <div className="workspace-page-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> YOUR TEAM, IN SYNC</p><h1>{title}</h1><p>{description}</p></div></div>
          {children}
        </div>
      </section>
    </main>
  )
}

function DashboardPage() {
  const [employees, setEmployees] = useState([])
  const [apiState, setApiState] = useState({ loading: true, error: '' })
  const [tasks] = useState(() => JSON.parse(window.localStorage.getItem('pulseworks.tasks') ?? '[]'))

  const loadEmployees = () => {
    setApiState({ loading: true, error: '' })
    requestEmployees()
      .then((data) => {
        setEmployees(data.slice(0, 4))
        setApiState({ loading: false, error: '' })
      })
      .catch(() => setApiState({ loading: false, error: 'We couldn’t load your team right now. Check your connection and try again.' }))
  }

  useEffect(() => {
    let active = true
    requestEmployees()
      .then((data) => {
        if (!active) return
        setEmployees(data.slice(0, 4))
        setApiState({ loading: false, error: '' })
      })
      .catch(() => {
        if (active) setApiState({ loading: false, error: 'We couldn’t load your team right now. Check your connection and try again.' })
      })
    return () => { active = false }
  }, [])

  return (
    <WorkspaceLayout title="Overview" description="A little clarity for everything you’re moving forward.">
      <div className="dashboard-welcome">
        <div><span className="welcome-label">MONDAY, LET’S MAKE IT COUNT</span><h2>Good morning, Jordan.</h2><p>Here’s what’s happening across your team today.</p></div>
        <div className="welcome-icon"><Command size={24} /></div>
      </div>
      <div className="stats-grid">
        <Card className="stat-card"><CardContent><span>Active tasks</span><strong>{tasks.filter((task) => task.status !== 'Completed').length.toString().padStart(2, '0')}</strong><small><span className="stat-trend">On track</span> across your workspace</small><div className="stat-icon stat-rose"><ListTodo size={19} /></div></CardContent></Card>
        <Card className="stat-card"><CardContent><span>Team members</span><strong>{apiState.loading ? '—' : employees.length.toString().padStart(2, '0')}</strong><small>{apiState.error ? 'Team data unavailable' : 'Connected and collaborating'}</small><div className="stat-icon stat-gold"><UsersRound size={19} /></div></CardContent></Card>
        <Card className="stat-card"><CardContent><span>Due this week</span><strong>{tasks.filter((task) => task.status !== 'Completed').length.toString().padStart(2, '0')}</strong><small>Keep the momentum going</small><div className="stat-icon stat-peach"><CalendarDays size={19} /></div></CardContent></Card>
      </div>
      <div className="dashboard-columns">
        <Card className="dashboard-card task-list-card">
          <CardContent>
            <div className="card-heading"><div><span className="card-kicker">YOUR FOCUS</span><h3>Recent tasks</h3></div><Button className="button-light" render={<Link to="/tasks/new" />}>New task <Plus size={16} /></Button></div>
            {tasks.length ? (
              <div className="recent-task-list">
                {tasks.slice(-4).reverse().map((task) => (
                  <div className="recent-task" key={`${task.title}-${task.dueDate}`}>
                    <span className={`task-status-dot status-${task.status.toLowerCase().replace(' ', '-')}`} />
                    <div className="recent-task-main"><strong>{task.title}</strong><span>{task.employee} · Due {task.dueDate}</span></div>
                    <span className={`priority-pill priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-tasks"><span className="empty-icon"><ListTodo size={21} /></span><strong>Your next great thing starts here.</strong><p>Create a task and give your team a clear next step.</p><Button variant="outline" render={<Link to="/tasks/new" />}>Create your first task <ArrowRight size={15} /></Button></div>
            )}
          </CardContent>
        </Card>
        <Card className="dashboard-card team-card" id="team">
          <CardContent>
            <div className="card-heading"><div><span className="card-kicker">THE PEOPLE BEHIND IT</span><h3>Your team</h3></div><UsersRound size={18} className="team-heading-icon" /></div>
            {apiState.loading ? <p className="api-feedback">Loading team members…</p> : apiState.error ? (
              <div className="api-error" role="alert"><p>{apiState.error}</p><button type="button" onClick={loadEmployees}>Try again</button></div>
            ) : (
              <ul className="team-list">
                {employees.map((employee, index) => (
                  <li key={employee.id}><span className={`employee-avatar employee-avatar-${index}`}>{employee.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span><strong>{employee.name}</strong><small>{employee.company.name}</small></span><span className="member-status"><span /> Active</span></li>
                ))}
              </ul>
            )}
            <p className="api-source-note">Team preview · powered by a sample directory</p>
          </CardContent>
        </Card>
      </div>
    </WorkspaceLayout>
  )
}

function TaskPage() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [apiState, setApiState] = useState({ loading: true, error: '' })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', description: '', employee: '', priority: '', dueDate: '', status: '' },
  })

  const loadEmployees = () => {
    setApiState({ loading: true, error: '' })
    requestEmployees()
      .then((data) => {
        setEmployees(data.slice(0, 10))
        setApiState({ loading: false, error: '' })
      })
      .catch(() => setApiState({ loading: false, error: 'Employee options could not be loaded. Check your connection and retry.' }))
  }

  useEffect(() => {
    let active = true
    requestEmployees()
      .then((data) => {
        if (!active) return
        setEmployees(data.slice(0, 10))
        setApiState({ loading: false, error: '' })
      })
      .catch(() => {
        if (active) setApiState({ loading: false, error: 'Employee options could not be loaded. Check your connection and retry.' })
      })
    return () => { active = false }
  }, [])

  const onSubmit = (values) => {
    const savedTasks = JSON.parse(window.localStorage.getItem('pulseworks.tasks') ?? '[]')
    const submittedTask = { ...values, createdAt: new Date().toISOString() }
    console.log('Task created:', submittedTask)
    window.localStorage.setItem('pulseworks.tasks', JSON.stringify([...savedTasks, submittedTask]))
    navigate('/dashboard')
  }

  return (
    <WorkspaceLayout title="Create a task" description="Make the next step clear, with the right people and details in place.">
      <div className="task-layout">
        <Card className="task-form-card">
          <CardContent>
            <div className="task-form-intro"><span className="task-form-icon"><Plus size={19} /></span><div><h2>Task details</h2><p>Give your team the context to do their best work.</p></div></div>
            <form className="task-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="field-group">
                <Label htmlFor="task-title">Task title <span className="required-mark">*</span></Label>
                <Input id="task-title" placeholder="e.g. Prepare the quarterly product update" aria-invalid={Boolean(errors.title)} {...register('title')} />
                <FormError>{errors.title?.message}</FormError>
              </div>
              <div className="field-group">
                <Label htmlFor="task-description">Description <span className="required-mark">*</span></Label>
                <textarea id="task-description" className="app-textarea" placeholder="Add a little context, expected outcome, or anything else the team should know…" rows={4} aria-invalid={Boolean(errors.description)} {...register('description')} />
                <FormError>{errors.description?.message}</FormError>
              </div>
              <div className="field-group">
                <Label htmlFor="task-employee">Assigned employee <span className="required-mark">*</span></Label>
                <select id="task-employee" className="app-select" disabled={apiState.loading || Boolean(apiState.error)} aria-invalid={Boolean(errors.employee)} {...register('employee')}>
                  <option value="">{apiState.loading ? 'Loading people…' : 'Select a teammate'}</option>
                  {employees.map((employee) => <option value={employee.name} key={employee.id}>{employee.name} · {employee.company.name}</option>)}
                </select>
                {apiState.error && <div className="api-inline-error" role="alert"><span>{apiState.error}</span><button type="button" onClick={loadEmployees}>Retry</button></div>}
                <FormError>{errors.employee?.message}</FormError>
              </div>
              <div className="task-fields-row">
                <div className="field-group">
                  <Label htmlFor="task-priority">Priority <span className="required-mark">*</span></Label>
                  <select id="task-priority" className="app-select" aria-invalid={Boolean(errors.priority)} {...register('priority')}>
                    <option value="">Select priority</option><option>Low</option><option>Medium</option><option>High</option>
                  </select>
                  <FormError>{errors.priority?.message}</FormError>
                </div>
                <div className="field-group">
                  <Label htmlFor="task-status">Task status <span className="required-mark">*</span></Label>
                  <select id="task-status" className="app-select" aria-invalid={Boolean(errors.status)} {...register('status')}>
                    <option value="">Select status</option><option>Pending</option><option>In Progress</option><option>Completed</option>
                  </select>
                  <FormError>{errors.status?.message}</FormError>
                </div>
              </div>
              <div className="field-group task-date-group">
                <Label htmlFor="task-due-date">Due date <span className="required-mark">*</span></Label>
                <Input id="task-due-date" type="date" aria-invalid={Boolean(errors.dueDate)} {...register('dueDate')} />
                <FormError>{errors.dueDate?.message}</FormError>
              </div>
              <div className="task-submit-row">
                <span>All fields are required</span>
                <Button className="button-dark" type="submit" disabled={isSubmitting || apiState.loading || Boolean(apiState.error)}>
                  Create task <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <aside className="task-aside">
          <Card className="task-aside-card"><CardContent>
            <span className="aside-icon"><Sparkles size={18} /></span>
            <span className="card-kicker">A THOUGHTFUL TIP</span>
            <h3>Clarity is a team superpower.</h3>
            <p>A specific title and a little context can help everyone get started with confidence.</p>
            <div className="aside-rule" />
            <div className="aside-check"><CheckCircle2 size={16} /><span>Clear ownership</span></div>
            <div className="aside-check"><CheckCircle2 size={16} /><span>A realistic due date</span></div>
            <div className="aside-check"><CheckCircle2 size={16} /><span>Room to do great work</span></div>
          </CardContent></Card>
          <Link className="cancel-task-link" to="/dashboard">Cancel and return to overview</Link>
        </aside>
      </div>
    </WorkspaceLayout>
  )
}

function NotFoundPage() {
  return <main className="not-found"><Brand /><p className="eyebrow">NOT QUITE THE RIGHT PLACE</p><h1>This page took a wrong turn.</h1><Link className="text-link" to="/">Back to the home page <ArrowRight size={16} /></Link></main>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks/new" element={<TaskPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
