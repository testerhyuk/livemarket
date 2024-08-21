import React from 'react'
import { Overlay } from 'react-bootstrap'

export default function ResultOverlay({target, show, message}) {
  return (
    <Overlay target={target.current} show={show} placement='right'>
        {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _show,
            popper: _popper,
            hasDoneInitialMeasure: _hasDoneInitialMeasure,
            ...props
            }) => (
            <div
                {...props}
                style={{
                position: 'absolute',
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
                }}
            >
                {message}
            </div>
        )}
    </Overlay>
  )
}
