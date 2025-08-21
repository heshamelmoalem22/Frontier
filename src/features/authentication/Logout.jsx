/* eslint-disable no-unused-vars */
import { HiArrowCircleRight } from "react-icons/hi";
import ButtonIcon from "../../ui/ButtonIcon";
import { uselogout } from "./useLogout";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
function Logout() {
    const{logout,isLoading}=uselogout()
    return (
        <ButtonIcon disabled={isLoading}>
            <HiArrowRightOnRectangle onClick={logout}/>
        </ButtonIcon>
    );
}

export default Logout;
