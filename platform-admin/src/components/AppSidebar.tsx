import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarFooter,
    SidebarMenu, SidebarMenuItem
, SidebarMenuButton, SidebarGroupContent} from "@/components/ui/sidebar";
import { BarChart3Icon, LayoutDashboardIcon, LayoutGridIcon, LogOut, MegaphoneIcon, Settings, ShieldCheckIcon, ShoppingBagIcon, Store, Truck, Users } from 'lucide-react'
import PlatformLogo from "@/assets/platform-logo.png";
import {useLocation, useNavigate} from "react-router";
import { cn } from "@/lib/utils";
import {useAppDispatch, useAppSelector} from "@/hooks/use-store.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {logoutUser} from "@/store/auths/authSlice.ts";


export const AppSidebar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(state => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logoutUser())
    }

     const SIDEBAR_NAV = [
         { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboardIcon },
         { href: "/dashboard/sellers", label: "Sellers", Icon: Store },
         { href: "/dashboard/commission-payouts", label: "Commission & Payouts", Icon: Store },
         { href: "/dashboard/global-catalog", label: "Global Catalog", Icon: LayoutGridIcon },
         { href: "/dashboard/delivery-network", label: "Delivery Network", Icon: Truck },
         { href: "/dashboard/customers", label: "Customers", Icon: Users },
         { href: "/dashboard/orders", label: "Orders", Icon: ShoppingBagIcon },
         { href: "/dashboard/support", label: "Supports", Icon: ShoppingBagIcon },
         { href: "/dashboard/marketing", label: "Marketing", Icon: MegaphoneIcon },
         { href: "/dashboard/reports", label: "Reports", Icon: BarChart3Icon },
         { href: "/dashboard/users-permissions", label: "Users & Permissions", Icon: ShieldCheckIcon },
         { href: "/dashboard/settings", label: "Settings", Icon: Settings },
     ]
    return (
        <Sidebar className='bg-muted-foreground'>
            <SidebarHeader>
                <SidebarMenu>
                    <div className="flex items-center gap-3 p-4">
                        <img src={PlatformLogo} alt="Platform Admin Logo" className='size-9 rounded-xl'/>
                        <span className='text-base font-bold text-white'>Platform</span>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                SIDEBAR_NAV.map((item, index) => {
                                    const isActive = item.href === location.pathname
                                    return (
                                        <SidebarMenuItem key={item?.href}>
                                            <SidebarMenuButton onClick={() => navigate(item.href)} className={cn(
                                                'text-accent hover:bg-white/10 hover:text-white px-2 py-3 h-9 hover:cursor-pointer',
                                                isActive && 'bg-[#9fe870]/15 text-[#9fe870]'
                                            )}>
                                                <item.Icon className='size-5' />
                                                {item.label}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className='flex items-center gap-2.5 rounded-md bg-white/[0.06] p-3'>
                    <div className="flex flex-1 items-center gap-2.5 p-2">

                        {/* Image => AP */}
                        <div>
                            <Avatar>
                                <AvatarImage src={user?.profile_image} />
                                <AvatarFallback className='bg-[#9fe870] font-semibold text-accent-foreground'>{user?.avatarName}</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Full Name*/}
                        <div className='min-w-0 flex-1'>
                            <div className="truncate text-sm font-semibold text-white">{user?.fullName}</div>
                            <div className="truncate text-xs text-accent">{user?.email}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className='shrink-0 cursor-pointer p-1.5 rounded-md text-accent hover:bg-white/10 hover:text-white'>
                        <LogOut className='size-4' />
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};
