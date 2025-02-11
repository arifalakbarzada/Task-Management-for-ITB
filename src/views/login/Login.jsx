import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'
import { RiArrowDropRightLine } from 'react-icons/ri'

function Login() {
    const handleLogin = () => {
        console.log('Login button clicked')
    }
    return (
        <div className="login-container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={() => {
                        handleLogin()
                    }}>
                        <div className="login__field">
                            <FaUser className='login__icon' />
                            <input
                                type="email"
                                className="login__input"
                                placeholder="Email"
                            />
                        </div>
                        <div className="login__field">
                            <FaLock className='login__icon' />
                            <input
                                type="password"
                                className="login__input"
                                placeholder="Password"
                            />
                        </div>
                        <button className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <RiArrowDropRightLine className='button__icon' />
                        </button>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4" />
                    <span className="screen__background__shape screen__background__shape3" />
                    <span className="screen__background__shape screen__background__shape2" />
                    <span className="screen__background__shape screen__background__shape1" />
                </div>
            </div>
        </div>
    )
}

export default Login