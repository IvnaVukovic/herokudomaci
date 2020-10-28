import React from 'react'

const Adresa = ({ adresa, brisiAdresu }) => {
    return (
        <li className="adresa">
            {adresa.imeprezime}
            <br></br>
            {adresa.email}
            <button onClick={brisiAdresu}>Izbrisi</button>
        </li>
    )
}
export default Adresa