import { Outlet } from "react-router-dom"
import Header from "@/components/Header";

const AppLayout = () => {
  return (
    <div>
        <div className="grid-background"></div>
        <main className="min-h-screen container mx-auto px-5">
            <Header />
            <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">
        Made by Bismay Bibhabasu 💙
        </div>
    </div>
  )
}
export default AppLayout;