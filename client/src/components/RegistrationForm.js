import React, {useState} from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

export default function RegistrationForm(){
    const [errors, setError] = useState('')
    const [formState, setFormState] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    function handleChange(event){
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8000/api/users', formState, {withCredentials:true})
        .then(()=>navigate('/'))
        .catch(err => {
            console.log(err)
            setError(err.response.data.errors)
        }); 
    }
    
    return(
        
        // <form onSubmit={handleSubmit}>
        //     {errors&& <p>{errors.password.message}</p>}
        //     <div>
        //         <label>First Name</label>
        //         <input
        //             name="firstName"
        //             value={formState.firstName}
        //             onChange={handleChange}
        //         />
        //     </div>
        //     <div>
        //         <label>Last Name</label>
        //         <input
        //             name="lastName"
        //             value={formState.lastName}
        //             onChange={handleChange}
        //         />
        //     </div>
        //     <div>
        //         <label>Email</label>
        //         <input
        //             name="email"
        //             value={formState.email}
        //             onChange={handleChange}
        //         />
        //     </div>
        //     <div>
        //         <label>Password</label>
        //         <input
        //             name="password"
        //             type="password"
        //             value={formState.password}
        //             onChange={handleChange}
        //         />
        //     </div>
        //     <div>
        //         <label>Confirm Password</label>
        //         <input
        //             name="passwordConfirmation"
        //             type="password"
        //             value={formState.passwordConfirmation}
        //             onChange={handleChange}
        //         />
        //     </div>
        //     <button type="submit"> Register </button>
        // </form>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <input 
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        type="text" 
                        className={errors.firstName? "form-control is-invalid" : "form-control"}
                        placeholder="First name" 
                    />
                    <div className={errors.firstName?"invalid-feedback":"valid-feedback"}>
                        {errors.firstName?errors.firstName.message:"Looks good!"}
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <input
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange} 
                        type="text" 
                        className={errors.lastName? "form-control is-invalid" : "form-control"}
                        placeholder="Last name" 
                    />
                    <div className={errors.lastName?"invalid-feedback":"valid-feedback"}>
                        {errors.lastName?errors.lastName.message:"Looks good!"}
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <input
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        type="text" 
                        className={errors.email? "form-control is-invalid" : "form-control"}
                        placeholder="Email" 
                    />
                    <div className={errors.email?"invalid-feedback":"valid-feedback"}>
                        {errors.email?errors.email.message:"Looks good!"}
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <input
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange} 
                        className={errors.password? "form-control is-invalid" : "form-control"}
                        placeholder="Password" 
                    />
                    <div className={errors.password?"invalid-feedback":"valid-feedback"}>
                        {errors.password?errors.password.message:"Looks good!"}
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formState.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword?"form-control is-invalid":"form-control"}
                        placeholder="Confirm Password" 
                    />
                    <div className={errors.email?"invalid-feedback":"valid-feedback"}>
                        {errors.confirmPassword?errors.confirmPassword.message:"Looks good!"}
                    </div>
                </div>
            </div>
            <button className="btn btn-dark" type="submit"> Register </button>                                                                   
        </form>
        
    )
}