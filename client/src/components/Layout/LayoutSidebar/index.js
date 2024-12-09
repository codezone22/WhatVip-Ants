import Sidebar from "./Sidebar";

function LayoutSidebar({children}) {
    return ( 
        <div>
            <div style={{ display:'flex'}}>
                <Sidebar />
                <div style={{marginLeft:'250px', width:'100%'}}>{children}</div>
            </div>
        </div>
    );
}

export default LayoutSidebar;