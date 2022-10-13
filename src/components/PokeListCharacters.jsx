import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'
import CardPokeCharacters from './CardPokeCharacters'
import load from '../assets/ballLoading.gif'
import './poke.css'

const PokeListCharacters = () => {

    const [pokemones, setPokemones] = useState([])
    const [loader, setLoader] = useState(false)
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
        setLoader(true)
        getPokemones()
    }, [pagination.current])

    const dataPokemones = async (data) => {
        try {
            const pokePromise = await Promise.allSettled(data.map(({ url }) => axios.get(url)))
            const pokeData = pokePromise.map(pokemon => pokemon.value.data)
            setPokemones(pokeData)
            setLoader(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Pagination pagination={pagination} setPagination={setPagination} />
            {loader ?
                <div style={{ width: '450px', height: '70vh', marginTop: '80px', }}>
                    <img src={load} alt="" />
                </div>
                :
                <CardPokeCharacters pokemones={pokemones} />
            }
            <Pagination pagination={pagination} setPagination={setPagination} />
        </>
    )
}

export default PokeListCharacters