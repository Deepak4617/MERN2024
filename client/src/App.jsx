import './App.css'
import '../src/assets/css/style.css'
import AppRoutes from './routes/appRoutes'
import 'flowbite';
import useOnlineStatus from './hooks/useOnlineStatus';
import NoInternet from './common/noInternet';


function App() {

  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline && <NoInternet />}
      <AppRoutes />

    </>
  )
}

export default App
