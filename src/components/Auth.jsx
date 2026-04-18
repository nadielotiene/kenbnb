import { useState } from 'react'

export default function Auth({ onLogin }) {
	const [isLogin, setIsLogin] = useState(true)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	async function handleSubmit(e) {
		e.preventDefault()
		const endpoint = isLogin ? 'login' : 'register'

		const body = isLogin
			? { email, password }
			: { name, email, password }

		try {
			const res = await fetch(`http://localhost:3001/api/auth/${endpoint}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error)
				return
			}

			localStorage.setItem('token', data.token)
			localStorage.setItem('user', JSON.stringify(data.user))
			onLogin(data.user)
		} catch (error) {
			setError('Something went wrong')
		}
	}

	return (
		<div className="auth-container">
			<div className="auth-card">
				<h2>{isLogin ? 'Log in' : 'Sign up'}</h2>

				{!isLogin && (
					<div className="auth-field">
						<label>Name</label>
						<input 
							type="text" 
							placeholder="Your name"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
				)}

				<div className="auth-field">
					<label>Email</label>
					<input 
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<div className="auth-field">
					<label>Password</label>
					<input 
						type="password" 
						placeholder="••••••••"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				{error && <p className="auth-error">{error}</p>}

				<button className="auth-submit" onClick={handleSubmit}>
					{isLogin ? 'Log in' : 'Sign up'}
				</button>

				<p className="auth-switch">
					{isLogin ? "Don't have an account?" : "Already have an account?"}
					<span onClick={() => { setIsLogin(!isLogin); setError(null) }}>
						{isLogin ? ' Sign up' : ' Log in'}
					</span>
				</p>
			</div>
		</div>
	)
}