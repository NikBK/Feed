import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IFormData } from "@/types";
import { Toast } from "@/components";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const initialFormState = {
    name: "", username: "", email: "", password: ""
};

const SignupForm: React.FC = () => {
    const [signUpData, setSignUpData] = useState<IFormData>(initialFormState);
    const navigate = useNavigate();

    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
    const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const newUser = await createUserAccount(signUpData);

        if (!newUser) {
            return <Toast title="Sign up failed, please try again" type="error" />;
        }

        const session = await signInAccount({
            email: signUpData.email,
            password: signUpData.password
        });

        if (!session) {
            return <Toast title="Sign in failed, Please try again" type="error" />
        }

        const isLoggedIn = await checkAuthUser();

        if (isLoggedIn) {
            setSignUpData(initialFormState);
            navigate('/');
        }
        else {
            return <Toast title="Sign up failed, Please try again." type="error" />
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
            <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
            <p className="text-light-3 small-medium md:base-regular">To use Feed, please enter your details</p>
            <div className="flex flex-col md:w-72">
                <label htmlFor="name" className="mt-5 text-xs">Name</label>
                <input
                    name="name"
                    type="text"
                    required
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />
                <label htmlFor="username" className="mt-5 text-xs">Username</label>
                <input
                    name="username"
                    type="text"
                    required
                    value={signUpData.username}
                    onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />
                <label htmlFor="email" className="mt-5 text-xs">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />
                <label htmlFor="password" className="mt-5 text-xs">Password</label>
                <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />
                <button type="submit" className="mt-5 p-1 rounded-md bg-primary-600 hover:bg-primary-500 text-light-1">
                    {isCreatingUser ? 'Creating user...' :
                        (isSigningIn ? 'Signing in...' :
                            (isUserLoading ? 'Authenticating user' : 'Sign up')
                        )
                    }
                </button>
            </div>
            <p className="text-xs md:text-sm text-light-2 text-center mt-2">
                Already have an account?
                <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">login</Link>
            </p>
        </form>
    )
}

export default SignupForm
