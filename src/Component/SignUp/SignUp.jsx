import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";


const SignUp = () => {

    const {createUser} = useContext(AuthContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        try {
            const result = await createUser(email, password);
            console.log(result.user);
            const createdAt = result?.user?.metadata?.creationTime;
            const user = {email, createdAt: createdAt};
            const res = await axios.post('http://localhost:5000/user', user, {
                headers: {
                    'Content-Type': 'application/json'
                }   
            })
            console.log(res.data)
            form.reset();
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;