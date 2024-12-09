import { Modal } from "bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnauthoziedIcon } from "~/assets/icons";
import Login from "../Login";
import SignUp from "../SignUp";
import ChangePass from "../ChangePass";
function RequestLogin() {
    let [login, setLogin] = useState(false)
    const navigate = useNavigate();
    const overLay = useRef();
    const [popup, setPopup] = useState("login")
    const handleNav = (e) => {
        if (e === "login") setPopup("login");
        else if (e === "signup") setPopup("signup");
        else setPopup("forgot");
    };
    return (<>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            {/* <Modal visible={login} setModal={setLogin}>
                {popup === "login" ? (
                    <Login navSignup={handleNav} navForgot={handleNav} />
                ) : popup === "signup" ? (
                    <SignUp navLogin={handleNav} />
                ) : (
                    <ChangePass navLogin={handleNav} />
                )}
            </Modal> */}
            <div style={{ margin: '150px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    <img src={UnauthoziedIcon} style={{ width: '300px' }} alt="" />
                </div>
                <div style={{ marginTop: '10px', fontSize: '28px', color: '#696969', fontWeight: '500' }}>Unauthozied!</div>
                <div style={{ fontSize: '26px', color: 'blue' }}>You have to login to access this page!</div>
                {/* <div onClick={() => setLogin(true)} style={{ marginTop: '20px', height: '50px', width: '200px', alignSelf: 'center', backgroundColor: '#537e9e', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ color: 'white', textDecoration: 'none' }}>Login</div>
                </div> */}
            </div>
        </div>
    </>);
}

export default RequestLogin;