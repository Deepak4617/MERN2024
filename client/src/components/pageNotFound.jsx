import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    
    const navigate = useNavigate();

    const home = () =>{
        navigate('/')
    }

    const contact = () => {
        navigate('/contact')
    }

    return (
        <>
        <div className="bg-black flex flex-col items-center justify-center" style={{height:'666px'}}>
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">404</h1>
            <p className="text-white text-xl mt-4">SORRY! PAGE NOT FOUND</p>
        
            <p className="text-gray-400 mt-2 text-center max-w-md">
                Oops! It seems like the page you're trying to access doesn't exist. If you believe there's an issue, feel free to report it, and we'll look into it.
            </p>
            <div className="mt-8 flex space-x-4">
                <span onClick={home} className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 rounded-full">
                    RETURN HOME
                </span>
                <span onClick={contact} className="px-6 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 rounded-full">
                    REPORT PROBLEM
                </span>
            </div>
        </div>
        </>
    )
}

export default PageNotFound
