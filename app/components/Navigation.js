import { IoStatsChart } from "react-icons/io5";


export function Nav(){
    return  <header className="container max-w-2xl px-6 py-6 mx-auto">
    <div className="flex items-center justify-between">
    {/* {User Information} */}
    <div className="flex items-center gap-2">
      {/* {img} */}
      <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
      <img className="object-cover w-full h-full" src="https://thispersondoesnotexist.com/" alt="Profile image"/>
      </div>

      {/* {name} */}
      <small>Hi, Leon!</small>
    </div>
    {/* {Right side of our navigation} */}
    <nav className="flex items-center gap-4">
      <div>
        <IoStatsChart className="text-2xl" />
        </div>
      <div>
        <button className="btn btn-danger">Sign out</button>
      </div>
    </nav>
    </div>
  </header>
}
export default Nav;