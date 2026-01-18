const ContactAndDownloadButton = () => {
    return (
        <>
            <div className="mt-6 space-x-8">
                <button
                    className="px-6 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-green-400 to-blue-500 rounded-full hover:from-green-500 hover:to-blue-600 shadow-lg transform transition duration-300 hover:scale-105"
                >
                    Download CV
                </button>
                <button
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-full hover:bg-gray-700 shadow-lg transform transition duration-300 hover:scale-105"
                >
                    Contact Info
                </button>
            </div>
        </>
    )
}

export default ContactAndDownloadButton
