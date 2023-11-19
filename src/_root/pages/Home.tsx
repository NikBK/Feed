import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";
import { Loader, PostCard, PostSkeleton } from "@/components";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

const Home = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPosts, fetchNextPage, hasNextPage } = useGetRecentPosts();

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView])

    if (isErrorPosts) {
        return (
            <div className="flex flex-1">
                <div className="home-container">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {isPostLoading && !posts ? <PostSkeleton /> : (
                        <ul className="flex flex-col flex-1 gap-9 w-full">
                            {/* {posts?.documents.map((post: Models.Document) => (
                                <PostCard key={post.$id} post={post} />
                            ))} */}

                            {posts?.pages.map((item) => (
                                item?.documents.map((post: Models.Document) => (
                                    <PostCard key={post.$id} post={post} />
                                ))
                            ))}
                        </ul>
                    )}

                    {hasNextPage && (
                        <div ref={ref} className='mt-10'>
                            <Loader />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Home
