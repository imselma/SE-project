import React, { useEffect } from 'react'
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

export type LoginFormData = {
    email?: string;
    password?: string;
}

const loginSchema = yup
    .object({
        email: yup.string().email().required("This field is required."),
        password: yup.string().min(5).max(20).required("This field is required."),
    }).required()

const LoginPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema)
    })

    const { loading, userToken, error } = useSelector((state: RootState) => state.auth)


    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = (data: LoginFormData) => {
        dispatch(login(data))
    }

    useEffect(() => {
        if (userToken) {
            navigate("/recipes")
        }
    }, [navigate, userToken])

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='col-12 col-md-5 m-5'>
                <h1 className='mb-5 container d-flex justify-content-center'>Login to your account...</h1>
                {
                    error &&
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Unable to render data!</h4>
                        <p>{error}</p>
                        <hr />
                        <p className="mb-0">
                            Something went wrong, please try again.
                        </p>
                    </div>
                }
                <div className='card p-2'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label htmlFor="exampleFormControlInput1" className="form-label"> <b>Email address:</b></label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" {...register("email")} />
                            <div className="form-text">We'll never share your email with others.</div>
                            {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="inputPassword5" className="form-label"><b>Password:</b></label>
                            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" {...register("password")} />
                            {errors.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                        </div>

                        <button className="btn" type="submit" style={{ backgroundColor: '#47817E', color: 'white' }} disabled={loading}>
                            {loading ? 'Submitting...' : 'Log in'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage