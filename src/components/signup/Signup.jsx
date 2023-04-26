import React from 'react'

export default function Signup() {
  return (
    <div className='signup_page'>
        <h1>Sign Up</h1>
        <form className='signup_form'>
            <div>
                <label className='label_form'>Email adress</label>
                <input className='input_form' type="email" />
            </div>
            
            <div>
                <label className='label_form'>Password</label>
                <input className='input_form' type="password" />
            </div>

            <button className='sign_btn'>Sign Up</button>
        </form>
    </div>
  )
}
