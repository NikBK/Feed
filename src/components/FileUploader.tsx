import { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'

type PostFormDataProps = {
    caption: string;
    file: File[];
    location: string;
    tags: string;
}

type FileUploaderProps = {
    fieldChange: React.Dispatch<React.SetStateAction<PostFormDataProps>>;
    mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl || '');

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(prev => ({ ...prev, file: acceptedFiles }));
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.svg']
        }
    })

    return (
        <div {...getRootProps()} className='flex flex-center flex-col mt-2 bg-dark-3 rounded-xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl ? (
                    <>
                        <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                            <img
                                src={fileUrl}
                                alt='image'
                                className='file_uploader-img'
                            />
                        </div>
                        <p className='file_uploader-label'>Click or drag photo to replace</p>
                    </>
                ) : (
                    <div className='file_uploader-box'>
                        <img
                            src='/assets/icons/file-upload.svg'
                            width={96}
                            height={77}
                            alt='file-upload'
                        />
                        <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                        <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

                        <button className='shad-button_dark_4 items-center rounded-lg'>Select from device</button>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader
