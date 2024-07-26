import './index.css';
import { useRef, useState, useEffect } from 'react';

function User() {
  const nameRef = useRef('');
  const lastRef = useRef('');
  const emailRef = useRef('');
  const comRef = useRef('');
  const addRef = useRef('');
  const monRef = useRef('');
  const dayRef = useRef('');
  const yerRef = useRef('');

  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const name = nameRef.current.value.trim();
    const last = lastRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const company = comRef.current.value.trim();
    const address = addRef.current.value.trim();
    const month = monRef.current.value.trim();
    const day = dayRef.current.value.trim();
    const year = yerRef.current.value.trim();

    if (!name || !last || !email || !month || !day || !year) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email address');
      return;
    }

    const newUser = {
      name,
      last,
      email,
      company,
      address,
      month,
      day,
      year,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log(newUser);
    setError('');

    
    nameRef.current.value = '';
    lastRef.current.value = '';
    emailRef.current.value = '';
    comRef.current.value = '';
    addRef.current.value = '';
    monRef.current.value = '';
    dayRef.current.value = '';
    yerRef.current.value = '';
  }

  return (
    <div className='user_container'>
      <h1 className='registr'>Online Registration</h1>
      <div className="input">
        <form className='form' onSubmit={handleSubmit}>
          <div className="first_last">
            <div className="t_name">
              <label className='label' htmlFor="firstName">First Name</label>
              <input ref={nameRef} className='first_text' type="text" id='firstName' name='firstName' placeholder='First Name' />
            </div>
            <div className="t_name">
              <label className='label' htmlFor="lastName">Last Name</label>
              <input ref={lastRef} className='first_text' type="text" id='lastName' name='lastName' placeholder='Last Name' />
            </div>
          </div>

          <div className="t_name">
            <label className='label' htmlFor="email">Email Address</label>
            <input ref={emailRef} className='email' type="email" id='email' name='email' placeholder='Email Address' />
          </div>
          <div className="t_name">
            <label className='label' htmlFor="company">Company</label>
            <input ref={comRef} className='company' type="text" id='company' name='company' placeholder='Company' />
          </div>
          <div className="t_name">
            <label className='label' htmlFor="physicalAddress">Physical Address</label>
            <input ref={addRef} className='physical' type="text" id='physicalAddress' name='physicalAddress' placeholder='Physical Address' />
          </div>

          <div className="user_day">
            <div className="t_name">
              <input ref={monRef} className='date_inpu' type="number" id='Month' name='Month' placeholder='Month' min="1" max="12" step="1" />
            </div>
            <div className="t_name">
              <input ref={dayRef} className='date_inputd' type="number" id='Day' name='Day' placeholder='Day' min="1" max="31" step="1" />
            </div>
            <div className="t_name">
              <input ref={yerRef} className='date_input' type="number" id='Year' name='Year' placeholder='Year' min="1900" max="2099" step="1" />
            </div>
          </div>
          <div>{error}</div>
          <button type="submit" className='button_save'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default User;
