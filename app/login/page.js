'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setInfo('Account created. If email confirmation is enabled on your Supabase project, check your inbox — otherwise you can sign in now.');
        setMode('signin');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="appRoot">
      <div className="screen" style={{ justifyContent: 'center' }}>
        <div className="card">
          <h1 style={{ fontSize: 24, marginBottom: 6 }}>Verbario</h1>
          <p style={{ color: 'var(--paper-dim)', fontSize: 13.5, margin: '0 0 20px' }}>
            {mode === 'signin' ? 'Sign in to pick up where you left off.' : 'Create an account to start tracking your progress.'}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="authInput"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              className="authInput"
              type="password"
              required
              minLength={6}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
            {error && <p className="errorMsg">{error}</p>}
            {info && <p style={{ color: 'var(--good)', fontSize: 13, margin: '-4px 0 10px' }}>{info}</p>}
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            {mode === 'signin' ? (
              <button className="linkBtn" onClick={() => { setMode('signup'); setError(''); setInfo(''); }}>
                No account yet? Sign up
              </button>
            ) : (
              <button className="linkBtn" onClick={() => { setMode('signin'); setError(''); setInfo(''); }}>
                Already have an account? Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
