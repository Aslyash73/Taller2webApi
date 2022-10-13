
import React from 'react'

const Pagination = ({ pagination, setPagination }) => {
    return (<>

        {
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    pagination.previous &&
                    <button className='btn btn-primary m-3' onClick={() => setPagination({ current: pagination.previous })}>⏪ PREVIOUS</button>
                }
                <button className='btn m-3' style={{ backgroundColor: '#80EEEE', fontSize: '20px', color: 'darkblue' }}>
                    <a className='text-decoration-none' href="/">💫 PokeApi 💫</a>
                </button>
                {
                    pagination.next &&
                    <button className='btn btn-primary m-3' onClick={() => setPagination({ current: pagination.next })}>NEXT ⏩</button>
                }
            </div>}
    </>
    )
}

export default Pagination