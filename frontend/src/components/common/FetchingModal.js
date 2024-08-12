import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Loader from 'react-spinners/RotateLoader';
import './css/FetchingModal.css'

export default function FetchingModal({show_modal}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(show_modal)
    }, [show_modal])

  return (
    <div>
         <Modal
                centered
                show={show}
                dialogClassName="loading-container"
                style={{ backgroundColor: "rgba(30,30,30,0.5)" }}
            >
                <Modal.Body style={{ display: "none" }}></Modal.Body>
                <div className="overlay-box" width="100%">
                    <Loader
                        color={"#19DBB4"}
                        loading={show}
                        size={15}
                        speedMultiplier={0.4}
                    />
                    <p style={{ marginTop: "40px", color: "rgb(1B1D1D)", fontWeight: "bold" }}>Loading...</p>
                </div>
            </Modal>
    </div>
  )
}
