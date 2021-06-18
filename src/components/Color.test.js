import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const setEditMock = jest.fn();
const toggleMock = jest.fn();
const deleteMock = jest.fn();

const TestColor = () => {
    return (
    <Color
        color={{
	color: 'black',
	code: {
	    hex: '#000000'
	},
	id: 1
        }}
        setEditColor={setEditMock}
        toggleEdit={toggleMock}
        deleteColor={deleteMock}
    />
    )
};

test("Renders without errors with blank color passed into component", () => {
    render(<Color />)
});

test("Renders the color passed into component", () => {
    render(<Color />)

    const color = screen.queryByTestId('color')

    expect(color).toBeInTheDocument()

});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    render(<TestColor/>);
    const delButton = screen.getByTestId('delete');
    userEvent.click(delButton);
    expect(toggleMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledTimes(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    render(<TestColor/>);
    const color = screen.getByTestId('color');
    userEvent.click(color);
    expect(toggleMock).toHaveBeenCalledTimes(2);
    expect(setEditMock).toHaveBeenCalledTimes(1);
});