import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

type UserCardProps = {
    user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
    const { user: currentuser } = useUserContext();

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
                type="button"
                disabled={currentuser.id === user.$id}
                className={`shad-button_primary px-5 py-1 rounded ${currentuser.id === user.$id ? "cursor-no-drop bg-gray-500 hover:bg-gray-500" : ""}`}
            >
                Follow
            </button>
        </Link>
    );
};

export default UserCard;