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
