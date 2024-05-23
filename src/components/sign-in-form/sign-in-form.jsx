import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { regExp } from '../../constants'
import "./sign-in-form.scss"

function SignInForm() {
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState("Email cannot be empty!")
	const [passwordError, setPasswordError] = useState("Password cannot be empty!")
	const [formValid, setFormValid] = useState(false)

	useEffect( () => {
		if(emailError || passwordError){
			setFormValid(false)
		}else{
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = (e) => {
		setEmail(e.target.value)
		
		
		if(!regExp.test(String(e.target.value).toLowerCase())){
			setEmailError("Email is incorrect!")
		}else{
			setEmailError("")
		}
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value)
		if(e.target.value.length < 8){
			setPasswordError("Password length must be at least 8!")
		}else{
			setPasswordError("")
		}
	}

	const blurHandler = (e) => {
		switch(e.target.name){
			case "email":
				setEmailDirty(true)
				break;
			case "password":
				setPasswordDirty(true)
				break;
		}
	}

	const navigate = useNavigate()
	return (
		<div className='form__wrapper'>
				<div className="container">
						<div className="form__box">
								<form >
										<h2>Sign In</h2>
										<div className="form__input">
												<ion-icon name="mail-outline"></ion-icon>
												{(emailDirty && emailError) && <div style={{color:'red'}} className="form-error">{emailError}</div>}
												<input onChange = {e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} type="email" name='email' placeholder='Enter your email...'/>
												<label>Email</label>
										</div>
										<div className="form__input">
												<ion-icon name="lock-closed-outline"></ion-icon>
												{(passwordDirty && passwordError) && <div style={{color:'red'}} className="form-error">{passwordError}</div>}
												<input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} type="password" name='password' placeholder='Enter your password...'/>
												<label>Password</label>
										</div>
										<button className='btn btn-primary form__btn' disabled={!formValid} onClick={() => navigate(`/home`)}>Sign In</button>
										<div className="register">
												<p>Don`t have account <a href="#">Register here</a></p>
										</div>
								</form>
					</div>
			</div>
    </div>
		
	)
}

export default SignInForm