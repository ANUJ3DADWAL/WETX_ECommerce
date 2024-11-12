import React from 'react';
import {AuthResponse, LoginFormData} from "../utils/types.ts";
import useFormHandler from "../hooks/useFormHandler.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../features/userSlice.ts";
import {useUserLoginMutation} from "../api/authApi.ts";

const Login: React.FC = () => {
    const initialLoginData: LoginFormData = {
        email: '',
        password: '',
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {formData, changeHandler, resetForm} = useFormHandler<LoginFormData>(initialLoginData);
    // {error, isLoading, isSuccess, isError}
    const [userLogin] = useUserLoginMutation();


    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response: AuthResponse = await userLogin(formData).unwrap();
            console.log(response);
            dispatch(login({user: response.user, token: response.token}));
            navigate("/");
            resetForm();
        } catch (e) {
            console.log("Error while signup: ", e);
        }
    };

    return (
        <div className={"w-full"}>
            <h1 className="text-5xl font-bold mb-4">Welcome back</h1>
            <h3 className="textfont-light mb-14">
                New to WetX?
                <Link to="/auth/signup" className="text-blue-400"> Create new account</Link>
            </h3>

            <form
                onSubmit={formSubmitHandler}
                className={"w-1/3 flex flex-col gap-4"}
            >
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={changeHandler}
                        className={"px-4 py-2 rounded-lg focus:outline-none bg-slate-600 bg-opacity-50"}
                    />
                </div>

                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password}
                           onChange={changeHandler}
                           className={"px-4 py-2 rounded-lg focus:outline-none bg-slate-600 bg-opacity-50"}
                    />
                </div>

                <div className={"mt-8 w-full flex gap-4"}>
                    <button
                        className={"px-8 py-4 w-1/2 bg-slate-600 rounded-full hover:bg-slate-700 transition duration-300 ease-in-out cursor-pointer"}
                    >
                        Change method
                    </button>
                    <input
                        type="submit"
                        value="Login"
                        className={"px-8 py-4 w-1/2 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"}
                    />
                </div>
            </form>
        </div>);
};

export default Login;
