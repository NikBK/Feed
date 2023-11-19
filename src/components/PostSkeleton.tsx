const PostSkeleton = () => {
    return (
        <div className='post-card min-h-[500px]'>
            <div className="animate-pulse shadow rounded-md p-4 w-full mx-auto">
                <div className="flex space-x-4">
                    <div className="rounded-full bg-slate-600 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-600 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-600 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-600 rounded col-span-1"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 mt-10 ">
                    <div className="flex-1 space-y-6 py-1 bg-slate-600 h-80 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default PostSkeleton;
