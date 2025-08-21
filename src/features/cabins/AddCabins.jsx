/* eslint-disable no-unused-vars */

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabins() {
    
    return(

    <Modal>
        <Modal.Open opens="cabin-form">
            <Button size="large">Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinForm />
        </Modal.Window>
    </Modal>
    )
}
    export default AddCabins