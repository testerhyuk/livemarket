import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ResultModal({title, content, callbackFn, show_modal}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        setShow(show_modal)
    }, [show_modal])

  return (
    <div 
        className="modal show" 
        style={{ display: 'block', position: 'initial', backgroundColor: 'white' }} 
        onClick={() => {
            if(callbackFn) {
                callbackFn()
            }
        }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{backgroundColor:'#6667AB', border:'white', color:'white'}}
            onClick={() => {
                handleClose()
                
                if(callbackFn) {
                    callbackFn()
                }
            }}
          >
            닫기
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
