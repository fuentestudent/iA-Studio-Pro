import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CodeEditor from '../src/components/CodeEditor';

describe('CodeEditor Component', () => {
  it('renders the code editor with initial text', () => {
    render(<CodeEditor />);
    expect(screen.getByText('Editor de Código')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu prompt o código aquí...')).toHaveValue('Escribe tu prompt o código aquí...');
  });

  it('updates textarea value on change', () => {
    render(<CodeEditor />);
    const textarea = screen.getByPlaceholderText('Escribe tu prompt o código aquí...');
    fireEvent.change(textarea, { target: { value: 'New code content' } });
    expect(textarea).toHaveValue('New code content');
  });

  it('calls onOptimize with current code when button is clicked', () => {
    const mockOnOptimize = jest.fn();
    render(<CodeEditor onOptimize={mockOnOptimize} />);
    const textarea = screen.getByPlaceholderText('Escribe tu prompt o código aquí...');
    fireEvent.change(textarea, { target: { value: 'Test prompt for optimization' } });
    fireEvent.click(screen.getByText('Optimizar Prompt'));
    expect(mockOnOptimize).toHaveBeenCalledWith('Test prompt for optimization');
  });

  it('disables the button and changes text when isOptimizing is true', () => {
    render(<CodeEditor isOptimizing={true} />);
    const button = screen.getByText('Optimizando...');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Optimizando...');
  });

  it('enables the button and shows original text when isOptimizing is false', () => {
    render(<CodeEditor isOptimizing={false} />);
    const button = screen.getByText('Optimizar Prompt');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Optimizar Prompt');
  });
});