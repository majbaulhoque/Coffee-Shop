import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../../config";


const SignIn = () => {

    const {signInUser} = useContext(AuthContext)

    const handleLogin = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await signInUser(email, password)
            console.log(result.data);
            const user = {
                email,
                lastLoggedAt: result.user?.metadata?.lastSignInTime
            }
            // update last logged at in the user
            const res = await axios.patch(`${BASE_URL}/user`, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" 
                            name='email'
                            className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required name='password' />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;