import React from 'react'
import axiosWithAuth from '../helpers/axiosWithAuth'

async function editColorService(newColor) {
    axiosWithAuth()
    .put(`/colors/${newColor.id}`, newColor)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log({err})
    })
}

async function deleteColorService(id) {
    axiosWithAuth()
    .delete(`/colors/${id}`)
    .then((res) => {
        // setColors(colors.filter((col) => col.id !== Number(res.data)))
        console.log(res)
    })
    .then((err) => {
        console.log({err})
    })
}

export {
    editColorService,
    deleteColorService
}