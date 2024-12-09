import Home from "~/pages/user/Home"
import { LayoutNoSidebar,LayoutSidebar, LayoutSidebarUser } from "~/components/Layout"
import Dashboard from "~/pages/admin/Dashboard"
import Products from "~/pages/admin/Products"
import ImportProducts from "~/pages/admin/ImportProducts"
import Orders from "~/pages/admin/Orders"
import Bill from "~/pages/admin/History/Bill"
import RentalImport from "~/pages/admin/History/RentalImport"
import ProductDetail from "~/pages/user/ProductDetail"
import Collection from "~/pages/user/Collection"
 
import Info from "~/pages/user/Profile/Info"
import Vouchers from "~/pages/user/Profile/Vouchers"
import OrdersUser from "~/pages/user/Profile/Orders"
import Addresses from "~/pages/user/Profile/Addresses"
import ReviewsUser from "~/pages/user/Profile/Reviews"
import Policies from "~/pages/user/Profile/Policies"
import Payment from "~/pages/user/Payment"
import { 
    CustomerManage,
    VouchersAdmin
} from "~/pages/admin"
import Reviews from "~/pages/admin/Reviews"
import DetailReview from "~/pages/admin/Reviews/DetailReview"
import Feedbacks from "~/pages/admin/Feedbacks"
import FeedbackDetail from "~/pages/admin/Feedbacks/FeedbackDetail"
import Profile from "~/pages/user/Profile"
import SuccessPayment from "~/pages/user/Payment/SuccessPayment"
import { RequestLogin, Unauthozied } from "~/pages/auth"

export const publicRoutes = [
    // user: => path: '/user/[pageName]'
    {path:'/' , component: Home, layout:LayoutNoSidebar},
    {path:'/user' , component: Home, layout:LayoutNoSidebar},
    
    {path:'/cart' , component: Payment, layout: LayoutNoSidebar},
    {path:'/product/:id' , component: ProductDetail, layout:LayoutNoSidebar},
    {path:'/collection/:id' , component: Collection, layout:LayoutNoSidebar},
    {path:'/successPayment' , component: SuccessPayment, layout:LayoutNoSidebar},
    {path:'/unauthozied' , component: Unauthozied, layout:LayoutNoSidebar},
    {path:'/request-login' , component: RequestLogin, layout:LayoutNoSidebar},

    // admin: => path: '/admin/[pageName]'
]
export const buyerRoutes = [
    {path:'/user-profile' , component: Profile, layout:LayoutSidebarUser},
    {path:'/user-profile/info' , component: Info, layout:LayoutSidebarUser},
    {path:'/user-profile/orders' , component: OrdersUser, layout:LayoutSidebarUser},
    {path:'/user-profile/vouchers' , component: Vouchers, layout:LayoutSidebarUser},
    {path:'/user-profile/addresses' , component: Addresses, layout:LayoutSidebarUser},
    {path:'/user-profile/reviews' , component: ReviewsUser, layout:LayoutSidebarUser},
    {path:'/user-profile/policies' , component: Policies, layout:LayoutSidebarUser},
]
export const adminRoutes = [
    {path:'/admin/customer-manage' , component: CustomerManage, layout:LayoutSidebar},
    {path:'/admin/vouchers-manage' , component: VouchersAdmin, layout:LayoutSidebar},
    {path:'/admin/reviews' , component: Reviews, layout:LayoutSidebar},
    {path:'/admin/reviews/:id/detail' , component: DetailReview, layout:LayoutSidebar},
    {path:'/admin/feedbacks' , component: Feedbacks, layout:LayoutSidebar},
    {path:'/admin/feedbacks/detail' , component: FeedbackDetail, layout:LayoutSidebar},
    {path:'/admin' , component: Dashboard, layout:LayoutSidebar},
    {path:'/admin/products' , component: Products, layout:LayoutSidebar},
    {path:'/admin/products/import' , component: ImportProducts, layout:LayoutSidebar},
    {path:'/admin/orders' , component: Orders, layout:LayoutSidebar},
    {path:'/admin/history/bill' , component: Bill, layout:LayoutSidebar},
    {path:'/admin/history/import' , component: RentalImport, layout:LayoutSidebar}
]