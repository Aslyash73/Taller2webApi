import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './poke.css'
import CardPokeCharacters from './CardPokeCharacters'

const PokeListCharacters = () => {

    const [pokemones, setPokemones] = useState([])
    const [pagination, setPagination] = useState({
        current: "https://pokeapi.co/api/v2/pokemon",
        next: null,
        previous: null
    })

    const getPokemones = async () => {
        const { data } = await axios.get(pagination.current)
        const { results, next, previous } = data;
        setPagination({ current: pagination.current, next, previous })
        dataPokemones(results)
    }
    useEffect(() => {
        getPokemones()
    }, [pagination.current])

    const dataPokemones = async (data) => {
        try {
            const pokePromise = await Promise.allSettled(data.map(({ url }) => axios.get(url)))
            const pokeData = pokePromise.map(pokemon => pokemon.value.data)
            setPokemones(pokeData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
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
            </div>
            <CardPokeCharacters pokemones={pokemones}/>
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
            </div>
        </>
    )
}

export default PokeListCharacters
