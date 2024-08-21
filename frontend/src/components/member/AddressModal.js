import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import DaumPostcodeEmbed from 'react-daum-postcode'

export default function AddressModal({show_modal, callbackFn}) {
    const [show, setShow] = useState(false)

    const handleComplete = (data) => {
        const {address, zonecode} = data

        callbackFn(zonecode, address)

        setShow(false)
    }

    useEffect(() => {
        setShow(show_modal)
    }, [show_modal])

  return (
    <div>
        <Modal show={show}>
            <Modal.Body>
                <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal.Body>
        </Modal>
    </div>
  )
}
