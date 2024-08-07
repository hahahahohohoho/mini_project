// import { BrowserRouter , Routes, Route, Link} from "react-router-dom"
import './App.css';
// import Login from "./Busan/Page/Login";
// import Main from "./Busan/Main";
// import Leeee from "./Busan/Leeee";

import NaverMapContainer from "./Busan/NaverMapContainer";

// import SignUp from "./Busan/Page/SignUp";
function App() {
  return (
    <div className="flex flex-col max-full max-w-screen-lg h-screen overflow-y-auto mx-auto ">
      <header className='flex justify-between items-center text-x1 font-bold h-20 p-10 bg-amber-200'>
        <div>REACT</div>
        <div>
          <NaverMapContainer/>
        </div>
      </header>
    </div>
  )
}
export default App;
