import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthResponse, SignupFormData} from "../utils/types.ts";
import useFormHandler from "../hooks/useFormHandler.tsx";
import {useUserSignupMutation} from "../api/authApi.ts";
import {useDispatch} from "react-redux";
import {signup} from "../features/userSlice.ts";

const Signup: React.FC = () => {
    const initialSignupData: SignupFormData = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {formData, changeHandler, resetForm} = useFormHandler<SignupFormData>(initialSignupData);
    // , {error, isLoading, isSuccess, isError}
    const [userSignup] = useUserSignupMutation();

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response: AuthResponse = await userSignup(formData).unwrap();
            console.log(response);
            dispatch(signup({user: response.user, token: response.token}));
            navigate("/");
            resetForm();
        } catch (e) {
            console.log("Error while signup: ", e);
        }

    };

    return (
        <div className={"w-full"}>
            <h1 className="text-5xl font-bold mb-4">Create new account</h1>
            <h3 className="textfont-light mb-14">
                Already A Member?
                <Link to="/auth/login" className="text-blue-400"> Log In</Link>
            </h3>

            <form onSubmit={formSubmitHandler} className={"w-1/3 flex flex-col gap-4"}>
                <div className={"flex w-full justify-between"}>
                    <div className={"flex flex-col gap-2 w-[48%]"}>
                        <label htmlFor="first_name">First name</label>
                        <input type="text" name="first_name" id="first_name"
                               className={"px-4 py-2 rounded-lg focus:outline-none bg-slate-600 bg-opacity-50"}
                               value={formData.first_name}
                               onChange={changeHandler} required/>
                    </div>
                    <div className={"flex flex-col gap-2 w-[48%]"}>
                        <label htmlFor="last_name">Last name</label>
                        <input type="text" name="last_name" id="last_name"
                               className={"px-4 py-2 rounded-lg focus:outline-none bg-slate-600 bg-opacity-50"}
                               value={formData.last_name}
                               onChange={changeHandler} required/>
                    </div>
                </div>

                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                           className={"px-4 py-2 rounded-lg focus:outline-none bg-slate-600 bg-opacity-50"}
                           value={formData.email}
                           onChange={changeHandler} required/>
                </div>

                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"
                           className={"px-4 py-2 rounded-lg focus:outline-none bg-slate-600 bg-opacity-50"}
                           value={formData.password}
                           onChange={changeHandler} required/>
                </div>

                <div className={"mt-8 w-full flex gap-4"}>
                    <button
                        className={"px-8 py-4 w-1/2 bg-slate-600 rounded-full hover:bg-slate-700 transition duration-300 ease-in-out cursor-pointer"}
                    >
                        Change method
                    </button>
                    <input
                        type="submit"
                        value="Create account"
                        className={"px-8 py-4 w-1/2 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"}
                    />
                </div>
            </form>
        </div>
    );
};

export default Signup;
