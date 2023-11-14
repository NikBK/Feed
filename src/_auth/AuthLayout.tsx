import { useUserContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
    const { isAuthenticated } = useUserContext();

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section className="flex flex-1 justify-center items-center flex-col py-10">
                        <img src="/assets/icons/logo.svg" alt='App logo yet to come' width={200} height={50} />
                        <Outlet />
                    </section>
                </>
            )}
        </>
    )
}

export default AuthLayout;
