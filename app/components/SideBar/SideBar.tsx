'use client'

import styles from "./SideBar.module.scss"
import { useRecoilState } from "recoil";
import { adminPanel, forYouItems, mainMenuItems } from "@/public/script";
import { sideBarOpenState, isAdminState } from "@/app/states";
import Logo from "./Logo/Logo";
import SideBarHeading from "./SideBarHeading/SideBarHeading";
import SideBarNav from "./SideBarNav/SideBarNav";
import SidebarSelected from "./SidebarSelected/SidebarSelected";


export function SideBar() {

    const [isActive, setIsActive] = useRecoilState(sideBarOpenState)
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState)

    return (
        <aside className={`${styles.sidebar} ${isActive && styles.active}`}>
            <div className={styles.scroll}>
                <div className={styles.wrapper}>
                    <Logo />
                    <div className={styles.navSection}>
                        <SideBarHeading text="Main Menu"/>
                        <SideBarNav navItemsMap={mainMenuItems}/>
                    </div>
                    <div className={styles.navSection}>
                        <SideBarHeading text="For You"/>
                        <SideBarNav navItemsMap={forYouItems}/>
                    </div>
                    {isAdmin &&
                    <>
                        <SideBarHeading text="Admin Panel"/>
                        <SideBarNav navItemsMap={adminPanel}/>
                    </>
                    }
                </div>
                <SidebarSelected />
            </div>
        </aside>
    )
}