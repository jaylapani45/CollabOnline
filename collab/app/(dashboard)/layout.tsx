import { Sidebar } from "./_components/sidebar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Navbar } from "./_components/navbar";
interface DashBoardProps {
    children: React.ReactNode;
}


const DashBoardLayout = ({ children }: DashBoardProps) => {

    return (
        <main className="h-full">

            <Sidebar />

            <div className="h-full pl-[60px]">
                <div className="flex h-full gap-x-3">

                    <OrgSidebar />

                    <div className="h-full flex-1">

                        <Navbar />

                        {children}

                    </div>

                </div>

            </div>
        </main>
    )

}
export default DashBoardLayout;