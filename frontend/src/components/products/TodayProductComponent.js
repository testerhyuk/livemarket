import React from 'react'

export default function TodayProductComponent({product}) {
  return (
    <div>
        <div>
          {product.map(prd => {
            return(
              <div key={prd.pno}>
                {prd.pname}
              </div>
            )
          })}
        </div>
    </div>
  )
}
