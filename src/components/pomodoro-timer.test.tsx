import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PomodoroTimer } from "./pomodoro-timer";

describe("Pomodoro timer", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => { cleanup(); vi.useRealTimers(); });
  it("starts at 25:00", () => {
    render(<PomodoroTimer />);
    expect(screen.getByRole("timer").textContent).toBe("25:00");
  });
  it("counts down when Start is pressed", () => {
    render(<PomodoroTimer />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByRole("timer").textContent).toBe("24:57");
  });
  it("pauses and resumes from the remaining time", () => {
    render(<PomodoroTimer />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("timer").textContent).toBe("24:57");
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("timer").textContent).toBe("24:56");
  });
  it("Reset restores 25:00 and stops counting", () => {
    render(<PomodoroTimer />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("timer").textContent).toBe("25:00");
  });
  it("stops at zero", () => {
    render(<PomodoroTimer />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    act(() => vi.advanceTimersByTime(1501000));
    expect(screen.getByRole("timer").textContent).toBe("00:00");
    expect(screen.getByRole("button", { name: "Start" }).hasAttribute("disabled")).toBe(true);
  });
});