import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "@/components";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const initialFormState = {
    email: "", password: ""
};

const SigninForm: React.FC = () => {
    const [signInData, setSignInData] = useState<{ email: string, password: string }>(initialFormState);
    const navigate = useNavigate();

    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const session = await signInAccount({
            email: signInData.email,
            password: signInData.password
        });

        if (!session) {
            return <Toast title="Sign in failed, Please try again" type="error" />
        }

        const isLoggedIn = await checkAuthUser();

        if (isLoggedIn) {
            setSignInData(initialFormState);
            navigate('/');
        }
        else {
            return <Toast title="Sign in failed, Please try again." type="error" />
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
            <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Log in to your account</h2>
            <p className="text-light-3 small-medium md:base-regular">Welcome back! Please enter your details</p>
            <div className="flex flex-col md:w-72">
                <label htmlFor="email" className="mt-5 text-xs">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />
                <label htmlFor="password" className="mt-5 text-xs">Password</label>
                <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />
                <button type="submit" className="mt-5 p-1 rounded-md bg-primary-600 hover:bg-primary-500 text-light-1">
                    {(isSigningIn ? 'Signing in...' :
                        (isUserLoading ? 'Authenticating user' : 'Sign in')
                    )}
                </button>
            </div>
            <p className="text-xs md:text-sm text-light-2 text-center mt-2">
                Don't have an account?
                <Link to={"/sign-up"} className="text-primary-500 text-small-semibold ml-1">sign up</Link>
            </p>
        </form>
    )
}

export default SigninForm
