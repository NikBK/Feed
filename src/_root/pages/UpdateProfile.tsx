import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import { Loader, ProfileUploader, Toast } from "@/components";

type ProfileFormData = {
    name: string;
    username: string;
    email: string;
    bio: string;
    file: File[];
}


const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    const initialFormState = {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        file: []
    };

    const [ProfileData, setProfileData] = useState<ProfileFormData>(initialFormState);

    // Queries
    const { data: currentUser } = useGetUserById(id || "");
    const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

    if (!currentUser) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
    }

    // Handler
    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        const updatedUser = await updateUser({
            userId: currentUser.$id,
            name: ProfileData.name,
            bio: ProfileData.bio,
            file: ProfileData.file,
            imageUrl: currentUser.imageUrl,
            imageId: currentUser.imageId,
        });

        if (!updatedUser) {
            <Toast title="Update user failed. Please try again." type="error" />
        }

        setUser({
            ...user,
            name: updatedUser?.name,
            bio: updatedUser?.bio,
            imageUrl: updatedUser?.imageUrl,
        });

        return navigate(`/profile/${id}`);
    };

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img
                        src="/assets/icons/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
                </div>

                <form
                    onSubmit={handleUpdate}
                    className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
                >
                    <ProfileUploader fieldChange={setProfileData} mediaUrl={currentUser.imageUrl} />

                    <label htmlFor="name" className="shad-form_label">Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        value={ProfileData.name}
                        onChange={(e) => setProfileData({ ...ProfileData, name: e.target.value })}
                        className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                    />

                    <label htmlFor="username" className="shad-form_label">Username</label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={ProfileData.username}
                        onChange={(e) => setProfileData({ ...ProfileData, username: e.target.value })}
                        className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                    />

                    <label htmlFor="email" className="shad-form_label">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={ProfileData.email}
                        onChange={(e) => setProfileData({ ...ProfileData, email: e.target.value })}
                        className="mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                    />

                    <label htmlFor="bio" className="shad-form_label">Bio</label>
                    <textarea
                        name="bio"
                        value={ProfileData.bio}
                        onChange={(e) => setProfileData({ ...ProfileData, bio: e.target.value })}
                        className="shad-textarea custom-scrollbar mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                    />

                    <div className="flex gap-4 items-center justify-end">
                        <button
                            type="button"
                            className="rounded-md px-3 py-2 bg-[#201f23] mr-3"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex flex-between rounded-md px-3 py-2 bg-[#877eff] text-white whitespace-nowrap"
                            disabled={isLoadingUpdate}>
                            {isLoadingUpdate && <Loader />}
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;