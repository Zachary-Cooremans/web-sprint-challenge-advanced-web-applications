import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { editColorService, deleteColorService } from '../services/colorServices';
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  console.log('bubble colors',colors)

  useEffect(() => {
    fetchColorService(setColors);
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    //editColorService(editColor)
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, editColor)
    .then(res => {
	    const newColors = colors.map(color => {
	      if (color.id === editColor.id){
	        return editColor
	      } else {
	        return color
	    }
	});
	setColors(newColors);
      })
      .catch(alert);
  };

  const deleteColor = (colorToDelete) => {
    // deleteColorService(colorToDelete.id)
    axiosWithAuth()
    .delete(`/colors/${colorToDelete.id}`)
    .then((res) => {
        setColors(colors.filter((col) => col.id !== Number(res.data)))
        console.log(res)
    })
    .then((err) => {
        console.log({err})
    })
  };

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
