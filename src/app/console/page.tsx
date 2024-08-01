'use client'
import { FormEvent,  } from 'react'
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, auth, onAuthStateChanged  } from '../_firebase/firebaseConfig'
import Crud from '../_components/crud/crud';


export default function Console() {

  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    const interval = setInterval(checkTimeout, 1000);

    // Cleanup subscription on unmount
    return () =>{ 
      unsubscribe();
    clearInterval(interval);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const signOutUser = async () => {
    await signOut(auth);
    localStorage.removeItem('signInTime');
    setLoggedIn(false);
  };

  const checkTimeout = () => {
    const signInTime = localStorage.getItem('signInTime');
    if (signInTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(signInTime, 10);
      const timeout = 60 * 60 * 1000; // 30 minutes in milliseconds
      if (elapsedTime > timeout) {
        signOutUser();
      }
    }
  };



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signInTime = new Date().getTime();
      localStorage.setItem('signInTime', signInTime.toString());
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your username and password.');
    }
  }
 
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password }),
    // })
 
    // if (response.ok) {
    //   setLoggedIn(true);
    // } else {
    //   const errorData = await response.json()
    //   console.error('Login failed:', errorData.error)
    //   alert('Login failed. Please check your username and password.')
    // }

 
  return (
<>
{loggedIn? <div>Welcome to the Console


<Crud/>

</div>
:
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>


}
</>
  )
}