import { Drawer, Sidebar } from "flowbite-react"
import { useNavigate, useLocation } from "react-router-dom"
import listMenu from "./MenuItems"

const SidebarDrawer = ({ isOpen, handleClose }) => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="MENU" titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar className="[&>div]:bg-transparent [&>div]:p-0">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                {listMenu.map((menu, i) => (
                                    <Sidebar.Item
                                        key={i}
                                        className={`cursor-pointer ${location.pathname === menu.path ?' border-2 border-blue-300':''} ${menu.private && 'font-semibold uppercase'}`}
                                        icon={menu.icon}
                                        onClick={() => {
                                            handleClose()
                                            navigate(menu.path)
                                        }}
                                        active={location.pathname === menu.path ? true : false}
                                    >
                                        {menu.text}
                                    </Sidebar.Item>
                                ))}
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    )
}
export default SidebarDrawer