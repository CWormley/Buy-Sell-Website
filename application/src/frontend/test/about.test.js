/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: about.test.js
*
* Description:: 
* This file contains the test cases for the About component.
* It verifies that the component renders correctly and displays the team members' information.
*
* The test cases check for the presence of team member names and images.
* It uses the React Testing Library to render the component and query for elements in the DOM.
**************************************************************/
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from "../src/about";

beforeAll(() => {
    console.warn = jest.fn();
});

describe('About Component', () => {
  it('displays team member cards with correct images and names', () => {
    render(
      <MemoryRouter
        future={{
            v7_startTransition: true,
        }}
      >
        <About />
      </MemoryRouter>
    );
    const members = [
      { name: 'Cj', imgAlt: "Claudia's photo" },
      { name: 'Daniel', imgAlt: "Daniel's photo" },
      { name: 'Nathan', imgAlt: "Nathan with pizza wings" },
      { name: 'Fatimah', imgAlt: "Fatimah's photo" },
      { name: 'Davis', imgAlt: "Davis's photo" },
    ];
    members.forEach(({ name, imgAlt }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByAltText(imgAlt)).toBeInTheDocument();
    });
  });
});
