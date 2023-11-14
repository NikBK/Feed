const Toast = ({ title, type }: { title: string, type: string }) => {
    return (
        <div className={`toast_${type} fixed `}>
            {title}
        </div>
    )
}

export default Toast;
