export const DeleteMessage = ({message,onClose}) => {

    return <>
        <div
            id="toast-success"
            className="fixed top-4 right-7 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-red-500 rounded-lg shadow"
            role="alert"
        >
            <div className="ms-2.5 text-sm border-s border-default ps-3.5 pr-7">
                {message}
            </div>

            <button
                type="button"
                className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-simple" aria-label="Close"
                onClick={onClose}
            >
                ✕
            </button>
        </div>

    </>
}

export const UpdateMessage = ({message,onClose}) => {

    return <>
        <div
            id="toast-success"
            className="fixed top-4 right-7 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-green-400 rounded-lg shadow"
            role="alert"
        >
            <div className="ms-2.5 text-sm border-s border-default ps-3.5 pr-14">
                {message}
            </div>

            <button
                type="button"
                className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-simple" aria-label="Close"
                onClick={onClose}
            >
                ✕
            </button>
        </div>

    </>
}