import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const LeftSidebar = () => {
    const { user, checkAuthUser } = useUserContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { mutate: signOut } = useSignOutAccount();


    const handleSignOut = async () => {
        signOut();
        await checkAuthUser();
        navigate('/sign-in');
    }


    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img src='/assets/icons/logo.svg' alt='logo' width={170} height={36} />
                </Link>

                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt='profile' className='h-14 w-14 rounded-full' />
                    <div className='flex flex-col'>
                        <p className='body-bold'>{user.name || 'Guest'}</p>
                        <p className='small-regular text-light-3'>@{user.username || 'guest'}</p>
                    </div>
                </Link>

                <ul className='flex flex-col gap-4'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;

                        return (
                            <li className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`} key={link.label}>
                                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button onClick={handleSignOut} className='shad-button_ghost' title='logout'>
                <img src='/assets/icons/logout.svg' alt='logout' />
                <p className='small-medium lg:base-medium'>Logout</p>
            </button>
        </nav>
    )
}

export default LeftSidebar
