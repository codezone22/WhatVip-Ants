import { useSelector } from "react-redux";
import { UnauthoziedIcon } from "~/assets/icons";
function Unauthozied() {
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    return (<>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ margin: '150px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    <img src={UnauthoziedIcon} style={{ width: '300px' }} alt="" />
                </div>
                <div style={{ marginTop: '10px', fontSize: '28px', color: '#696969', fontWeight: '500' }}>Unauthozied!</div>
                <div style={{ fontSize: '26px', color: 'red' }}>Access to this page is restricted!</div>
                <div style={{ marginTop: '20px', height: '50px', width: '200px', alignSelf: 'center', backgroundColor: '#537e9e', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    {currentUser?.role === 'Buyer' ? <a href="/user" style={{ color: 'white', textDecoration: 'none' }}>Go back</a>
                        : <a href="/Admin" style={{ color: 'white', textDecoration: 'none' }}>Go back</a>
                    }
                </div>
            </div>
        </div>
    </>);
}

export default Unauthozied;