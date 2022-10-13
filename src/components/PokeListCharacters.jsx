import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './poke.css'

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
            <div className='container d-flex flex-wrap'>
                <div className='row row-cols-1 row-cols-md-4 g-5 mt-2 mb-4'>
                    {
                        pokemones.map((poke) => {
                            return <div key={poke.id} className="col">
                                <div className="p-4 container_card d-flex flex-wrap">
                                    <img src={poke.sprites.other.dream_world.front_default}
                                        className="card-img-top img-fluid"
                                        alt={poke.name}/>
                                    <div className="card-body">
                                        <h5 className="card-title text-center mt-5">{poke.name}</h5>
                                        <h6 className='text-center mt-1'>{`tipo: ${poke.types[0].type.name}`}</h6>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
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
