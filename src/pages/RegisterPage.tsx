import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { registerUser } from '../store/authSlice';


export type RegisterFormData = {
    email?: string;
    password?: string;
    username?: string;
    name?: string;
    surname?: string;
    userType?: 'MEMBER';
}

const registrationSchema = yup.object({
    email: yup.string().email().required("This field is required."),
    password: yup.string().min(5).max(20).required("This field is required."),
    username: yup.string().required("This field is required."),
    name: yup.string().required("This field is required."),
    surname: yup.string().required("This field is required."),
}).required()


const RegisterPage = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registrationSchema)
    })

    const { loading, userToken, error, success } = useSelector(
        (state: RootState) => state.auth
    )
    const dispatch = useDispatch<AppDispatch>()



    const onSubmit = (data: RegisterFormData) => {
        console.log("Submitting data:", data);
        dispatch(registerUser(data))


    }

    useEffect(() => {
        // Redirect user to login page if registration was successful
        if (success) navigate('/login')
        // Redirect authenticated user to home screen
        if (userToken) navigate('/home')
    }, [navigate, userToken, success])

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='col-12 col-md-5 m-5' style={{ padding: '10px' }}>
                <h1 className='mb-5 container d-flex justify-content-center' style={{ marginTop: '10px' }}>Register your account...</h1>
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
                <div className='card p-2' style={{ marginTop: '-20px', marginBottom: '10px' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5" style={{ marginTop: '0px' }}>
                            <label htmlFor="exampleFormControlInput1" className="form-label"> <b>Email:</b></label>
                            <input type="text" className="form-control" placeholder="name@example.com" {...register("email")} />
                            {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                        </div>
                        <div className='mb-5' style={{ marginTop: '-30px' }}>
                            <label htmlFor="inputPassword5" className="form-label"><b>Password:</b></label>
                            <input type="password" className="form-control" aria-describedby="passwordHelpBlock" {...register("password")} />
                            {errors.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                        </div>
                        <div className="mb-5" style={{ marginTop: '-30px' }}>
                            <label htmlFor="exampleFormControlInput1" className="form-label"> <b>Username:</b></label>
                            <input type="text" className="form-control" {...register("username")} />
                            {errors.username && <small style={{ color: "red" }}>{errors.username.message}</small>}
                        </div>
                        <div className="mb-5" style={{ marginTop: '-30px' }}>
                            <label htmlFor="exampleFormControlInput1" className="form-label"> <b>Name:</b></label>
                            <input type="text" className="form-control"{...register("name")} />
                            {errors.name && <small style={{ color: "red" }}>{errors.name.message}</small>}
                        </div>
                        <div className="mb-5" style={{ marginTop: '-30px' }}>
                            <label htmlFor="exampleFormControlInput1" className="form-label"> <b>Surname:</b></label>
                            <input type="text" className="form-control" {...register("surname")} />
                            {errors.surname && <small style={{ color: "red" }}>{errors.surname.message}</small>}
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: '#47817E', color: 'white' }} disabled={loading}>
                            {loading ? 'Submitting...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage