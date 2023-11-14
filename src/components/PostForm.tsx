import { useState } from "react"
import FileUploader from "./FileUploader"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

type PostFormProps = {
    post?: Models.Document;
    action: 'Create' | 'Update';
}

type PostFormDataProps = {
    caption: string;
    file: File[];
    location: string;
    tags: string;
}

const PostForm = ({ post, action }: PostFormProps) => {
    const INITIAL_POST_FORM_DATA = {
        caption: post ? post.caption : "",
        file: [],
        location: post ? post.location : "",
        tags: post ? post.tags.join(',') : "",
    };

    const [postFormData, setPostFormData] = useState<PostFormDataProps>(INITIAL_POST_FORM_DATA);

    const { user } = useUserContext();
    const navigate = useNavigate();

    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...postFormData,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl
            });

            if (!updatedPost) {
                return <Toast title="Please try again" type="error" />
            }

            return navigate(`/posts/${post.$id}`);
        }

        const newPost = await createPost({
            ...postFormData,
            userId: user.id
        });

        if (!newPost) return <Toast title="Please try again" type="error" />

        navigate("/");
    }

    return (
        <form className="flex flex-col gap-9 w-full max-w-5xl" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
                <label htmlFor="caption" className="mt-5 text-sm">Caption</label>
                <textarea
                    name="caption"
                    required
                    value={postFormData.caption}
                    onChange={(e) => setPostFormData({ ...postFormData, caption: e.target.value })}
                    className="mt-2 py-1.5 px-2.5 shad-textarea custom-scrollbar focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />

                <label htmlFor="photos" className="mt-5 text-sm">Add Photos</label>
                <FileUploader fieldChange={setPostFormData} mediaUrl={post?.imageUrl} />

                <label htmlFor="location" className="mt-5 text-sm">Add Location</label>
                <input
                    name="location"
                    required
                    value={postFormData.location}
                    onChange={(e) => setPostFormData({ ...postFormData, location: e.target.value })}
                    className="shad-input mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />

                <label htmlFor="tags" className="mt-5 text-sm">Add Tags (separated by comma " , ")</label>
                <input
                    name="tags"
                    placeholder="Art, Learn, React, NextJS"
                    required
                    value={postFormData.tags}
                    onChange={(e) => setPostFormData({ ...postFormData, tags: e.target.value })}
                    className="shad-input mt-2 py-1.5 px-2.5 bg-[#201f23] rounded-md leading-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-light-3"
                />

                <div className="flex flex-4 items-center justify-end pt-5">
                    <button
                        type="button"
                        className="rounded-md px-3 py-2 bg-[#201f23] mr-3"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md px-3 py-2 bg-[#877eff] text-white"
                        disabled={isLoadingCreate || isLoadingUpdate}
                    >
                        {isLoadingCreate || isLoadingUpdate && 'Loading...'}
                        {action} Post
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PostForm
