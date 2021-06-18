import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

// import { editColorService, deleteColorService } from '../services/colorServices';
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, initialColor)
    .then((res) => {
      console.log(res.data)
      setColors(colors.map((color) => {
        if(color.id === res.data.id) {
          return res.data
        } else {
          return color
        }
      }))
    })
    .catch((err) => {
      console.log({err})
    })
  };

  const deleteColor = (colorToDelete) => {

    axiosWithAuth()
    .delete(`/colors/${colorToDelete.id}`)
    .then((res) => {
      setColors(colors.filter((col) => col.id !== Number(res.data)))
    })
    .then((err) => {
      console.log({err})
    })
  };

  useEffect(() => {
    fetchColorService()
    axiosWithAuth()
    .get(`/colors`)
    .then((res) => {
      setColors(res.data)
    })
    .then((err) => {
      console.log({err})
    })
    
  }, [])

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
