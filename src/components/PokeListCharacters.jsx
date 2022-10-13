import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'
import CardPokeCharacters from './CardPokeCharacters'
import './poke.css'
import CardPokeCharacters from './CardPokeCharacters'
import Pagination from './Pagination'

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
            <Pagination pagination={pagination} setPagination={setPagination} />
            <CardPokeCharacters pokemones={pokemones} />
            <Pagination pagination={pagination} setPagination={setPagination} />
        </>
    )
}

export default PokeListCharacters
