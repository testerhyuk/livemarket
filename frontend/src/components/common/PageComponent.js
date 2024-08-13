import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PageComponent({serverData, movePage}) {
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
        <Pagination>
            {serverData.prev ?
                <Pagination.Prev onClick={() => movePage({page:serverData.prevPage})}>
                    Prev
                </Pagination.Prev>
                :
                <></>
            }

            {serverData.pageNumList.map(pageNum =>
                <Pagination.Item
                    key={pageNum} 
                    onClick={() => movePage({page:pageNum})}
                    className={`${serverData.current === pageNum ? 'active' : ''}`}
                >
                    {pageNum}
                </Pagination.Item>
            )}

            {serverData.next ?
                <Pagination.Next onClick={() => movePage({page:serverData.nextPage})}>
                    Next
                </Pagination.Next>
                :
                <></>
            }
        </Pagination>
    </div>
  )
}
