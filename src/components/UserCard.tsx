import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Loader } from ".";
import { MouseEvent, useState } from "react";
import { useFollowingUser } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

type UserCardProps = {
    user: Models.Document;
    loggedInUserFollowings: string[];
    setLoggedInUserFollowings: React.Dispatch<React.SetStateAction<string[]>>;
};

const UserCard = ({ user, loggedInUserFollowings, setLoggedInUserFollowings }: UserCardProps) => {
    const { user: currentUser } = useUserContext();

    const { mutateAsync: handleFollowingUser, isPending: isFollowingUser } = useFollowingUser();
    const [followingUser, setFollowinguser] = useState(loggedInUserFollowings.includes(user.$id));


    const handleFollow = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (currentUser) {
            var updatedFollowings = [];
            if (!followingUser) {
                updatedFollowings = [...loggedInUserFollowings, user.$id];
            }
            else {
                updatedFollowings = loggedInUserFollowings.filter((UID: string) => UID !== user.$id);
            }
            await handleFollowingUser({ userId: currentUser.id, followUserArray: updatedFollowings });
            setLoggedInUserFollowings(updatedFollowings)
            setFollowinguser((prev: boolean) => !prev);
        }
    }

    return (
        <Link to={`/profile/${user.$id}`} className="user-card">
            <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="rounded-full w-14 h-14"
            />

            <div className="flex-center flex-col gap-1">
                <p className="base-medium text-light-1 text-center line-clamp-1">
                    {user.name}
                </p>
                <p className="small-regular text-light-3 text-center line-clamp-1">
                    @{user.username}
                </p>
            </div>

            <button
                onClick={handleFollow}
                type="button"
                disabled={(currentUser?.id === user.$id) || isFollowingUser}
                className={`shad-button_primary px-5 py-1 rounded ${currentUser?.id === user.$id ? "cursor-no-drop bg-gray-500 hover:bg-gray-500" : ""}`}
            >
                {isFollowingUser && <Loader />}
                {followingUser ? "Following" : "Follow"}
            </button>
        </Link>
    );
};

export default UserCard;