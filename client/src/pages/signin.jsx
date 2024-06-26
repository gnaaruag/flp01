import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email); 
        localStorage.setItem('userName', data.user.username);
        navigate("/profile");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <Toaster/>
      <h2 className='header txt-primary ft-primary'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            className='ft-sec-reg fields'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            className='ft-sec-reg fields'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className='btn' />
        </div>
      </form>
      <div className="create-account-link ft-sec-reg txt-ternary">
        <p><a className="link" href="/signup">Create account</a></p>
      </div>
    </div>
  );
}

export default LoginForm;
