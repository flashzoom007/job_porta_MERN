import Router from './routes/auh';
import { BrowserRouter } from "react-router-dom";
import './css/style.css';
import DefaultLayout from './layout/Default';
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (

    <BrowserRouter>
      <DefaultLayout />
      <ToastContainer />
      <Router />
    </BrowserRouter>

  )
}

export default App