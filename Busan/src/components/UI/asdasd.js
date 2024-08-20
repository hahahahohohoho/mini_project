import React,{useState} from 'react'
import { Link } from 'react-router-dom'
export default function HeadetNav({ }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div>
            <nav className="bg-indigo-500 border-gray-200 rounded-3xl">
                <div className="w-full flex flex-wrap justify-between mx-auto p-3">
                    <Link to='/main' className="flex justify-items-start space-x-3 rtl:space-x-reversew-1/4">
                        <img src="image/bycicle.png" className="h-8 flex" alt="Logo" />
                        <span className="self-center text-2xl  font-extrabold font-serif  whitespace-nowrap text-gray-50">B Travel</span>
                    </Link>
                    <div className="w-3/4 flex">
                        <ul className="w-full flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-16 rtl:space-x-reverse md:flex-row  md:mt-0 md:border-0 md:bg-indigo-500 ">
                            
                            <li>
                                <Link to='/map' className="block py-2 px-3 text-white rounded-full md:bg-transparent md:text-white text-lg font-semibold  md:p-1" aria-current="page">Busan</Link>
                            </li>
                            <li>
                                <Link to='/board' className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-white text-lg font-semibold md:p-1" aria-current="page">Board</Link>
                            </li>
                            <li>
                                <Link to='/login' className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-white text-lg font-semibold md:p-1" aria-current="page">로그인</Link>
                            </li>
                            <li>
                                <Link to='/register' className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-white text-lg font-semibold md:p-1" aria-current="page">회원가입</Link>
                            </li>
                            {/* 기타 버튼 및 네비게이션 코드 */}
                            <button
                                id="dropdownNavbarLink"
                                onClick={toggleDropdown}
                                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                            >
                                Dropdown
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            <div id="dropdownNavbar" className={`${isDropdownOpen ? '' : 'hidden'} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link to='/myinfo' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mypage</Link>
                                    </li>
                                    <li>
                                        <Link to='/admin' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">AdminPage</Link>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </div>
                            </div>
                          
                        </ul>
                    </div>
                </div>
            </nav>
        </div>



    )
}
