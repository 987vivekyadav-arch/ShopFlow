import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout(){

   const [sidebar,setSidebar]=React.useState(true) 

    return(
        <div>

<Sidebar
sidebar={sidebar}
setSidebar={setSidebar}
/>
<Outlet/>



        </div>
    )
}export default Layout;