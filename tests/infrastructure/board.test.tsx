import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from 'solid-testing-library';
import TicTacToeBoard from '../../src/infrastructure/ui/components/Board';

describe('TicTacToeBoard Integration', () => {
  it('should render the board with 9 cells', () => {
    render(() => <TicTacToeBoard />);
    const cells = screen.getAllByRole('button');
    expect(cells.length).toBe(9);
  });

  it('should place X on first click', async () => {
    render(() => <TicTacToeBoard />);
    const cells = screen.getAllByRole('button');
    await fireEvent.click(cells[0]);
    expect(cells[0].textContent).toBe('X');
  });

  it('should switch to O after X moves', async () => {
    render(() => <TicTacToeBoard />);
    const cells = screen.getAllByRole('button');
    await fireEvent.click(cells[0]); // X
    await fireEvent.click(cells[1]); // O
    expect(cells[0].textContent).toBe('X');
    expect(cells[1].textContent).toBe('O');
  });

  it('should show turn indicator', async () => {
    render(() => <TicTacToeBoard />);
    expect(screen.getByText(/Turno: X/)).toBeTruthy();
    const cells = screen.getAllByRole('button');
    await fireEvent.click(cells[0]);
    expect(screen.getByText(/Turno: O/)).toBeTruthy();
  });

  it('should reset game when reset button is clicked', async () => {
    render(() => <TicTacToeBoard />);
    const cells = screen.getAllByRole('button');
    await fireEvent.click(cells[0]); // X
    await fireEvent.click(cells[1]); // O
    // Wait for game to finish? No, let's make a winning move to show reset.
    // Alternatively, we can simulate a win first. But for simplicity, let's just check reset.
    // Actually, reset button only appears when game is finished. So let's make a winning move.
    // X wins: cells 0,0; 0,1; 0,2
    await fireEvent.click(cells[0]); // X (0,0)
    await fireEvent.click(cells[3]); // O (1,0)
    await fireEvent.click(cells[1]); // X (0,1)
    await fireEvent.click(cells[4]); // O (1,1)
    await fireEvent.click(cells[2]); // X (0,2) → X wins
    const resetButton = screen.getByText(/Reiniciar Juego/);
    expect(resetButton).toBeTruthy();
    await fireEvent.click(resetButton);
    // After reset, first cell should be empty
    expect(cells[0].textContent).toBe('');
    expect(screen.getByText(/Turno: X/)).toBeTruthy();
  });
});
