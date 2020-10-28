import React, { useState, useEffect } from 'react'
import Adresa from './components/Adresa'
import adreseServer from './services/adrese'

const App = (props) => {
    const [adrese, postaviAdrese] = useState([])
    const [unosImePrezime, postaviIme] = useState()
    const [unosEmail, postaviEmail] = useState()
    const [ispisiSve, postaviIspis] = useState(true)
    
    useEffect( () => {
        console.log("Effect hook");
        adreseServer
        .dohvatiSve()
        .then( (response) => {
            console.log("Podaci učitani");
            postaviAdrese(response.data)
        })
    }, [])

    console.log("Renderirano je", adrese.length, "objekata")

    const porukeZaIspis = ispisiSve ? adrese : adrese.filter(p => p)

    const novaAdresa = (e) => {
        e.preventDefault()
        console.log("Klik", e.target);
        const noviObjekt = {           
            imeprezime: unosImePrezime,
            email: unosEmail
        }
        adreseServer
        .stvori(noviObjekt)
        .then( (response) => {
            console.log(response)
            postaviAdrese(adrese.concat(response.data))
            postaviIme('')
            postaviEmail('')
        })          
    }
    
    const promjenaImena = (e) => {
        console.log(e.target.value);
        postaviIme(e.target.value)
    }

    const promjenaEmaila = (e) => {
        console.log(e.target.value);
        postaviEmail(e.target.value)
    }

    const brisanjeAdrese = (id) => {
        adreseServer
        .brisi(id)
        .then( response => {
            console.log(response);
            postaviAdrese(adrese.filter(p => p.id !== id))
        })
    }

    return (
        <div>
            <h1>Adresar</h1>
            <input type="text" id="ime"></input>
            
            <ul>
                {porukeZaIspis.map(p =>
                <Adresa
                key={p.id}
                adresa={p}
                brisiAdresu={() => brisanjeAdrese(p.id)}
                />
                )}
            </ul>
            <h2>Novi kontakt</h2>
            <ul>
                <form onSubmit={novaAdresa}>
                <tr>
                    <td>Ime i prezime: </td>
                    <td><input value={unosImePrezime} onChange={promjenaImena}></input></td>
                </tr>
              <tr>
                <td>Email adresa: </td>
                <td><input value={unosEmail} onChange={promjenaEmaila}></input></td>
              </tr>
              <tr>
                <td>
                <button type="submit">Dodaj</button>
                </td>
              </tr>
                </form>
           </ul>
        </div>
    )
}
export default App