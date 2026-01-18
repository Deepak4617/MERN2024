const NoInternet = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white p-6 rounded-lg text-center w-80 shadow-lg">
                <h2 className="text-xl font-semibold text-red-600 mb-2">
                    No Internet Connection
                </h2>
                <p className="text-gray-600 text-sm">
                    Please check your network and try again.
                </p>
            </div>
        </div>
    );
};

export default NoInternet;
