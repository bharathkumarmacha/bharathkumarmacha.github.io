import HomePage from "../../components/homePage/homePage";
import Invoice from "../../pages/invoice/invoiceApp";
import UserPage from "../../pages/userPage";

export const AppsJson = [
    {
        id: "homepage",
        title: "Home",        
        path: "/",
        component: HomePage
    },
    {
        id: "homepage",
        title: "Home",        
        path: "/react-app",
        component: HomePage
    },
    {
        id: "card 1",
        title: "App1",        
        image: "https://source.unsplash.com/user/erondu/600x400",
        path: "/invoice",
        component: Invoice
    },
    {
        id: "card 2",
        title: "App2",        
        image: "https://source.unsplash.com/user/erondu/600x400",
        path: "/path2",
        component: UserPage
    },
    {
        id: "card 3",
        title: "App3",        
        image: "https://source.unsplash.com/user/erondu/600x400",
        path: "/path3",
        component: UserPage
    },
    {
        id: "card 4",
        title: "App4",        
        image: "https://source.unsplash.com/user/erondu/600x400",
        path: "/path4",
        component: UserPage
    }
    
];

