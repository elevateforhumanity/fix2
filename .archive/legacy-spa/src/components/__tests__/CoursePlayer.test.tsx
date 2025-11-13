import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CoursePlayer from '../CoursePlayer';

describe('CoursePlayer', () => {
  const mockOnProgress = vi.fn();
  const mockOnComplete = vi.fn();
  const videoUrl = 'https://example.com/video.mp4';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders video player', () => {
    render(<CoursePlayer videoUrl={videoUrl} />);
    const video = screen.getByRole('video', { hidden: true });
    expect(video).toBeDefined();
  });

  it('calls onProgress when video plays', async () => {
    render(
      <CoursePlayer
        videoUrl={videoUrl}
        onProgress={mockOnProgress}
      />
    );

    const video = screen.getByRole('video', { hidden: true }) as HTMLVideoElement;
    
    // Simulate video progress
    Object.defineProperty(video, 'currentTime', { value: 50, writable: true });
    Object.defineProperty(video, 'duration', { value: 100, writable: true });
    
    fireEvent.timeUpdate(video);

    await waitFor(() => {
      expect(mockOnProgress).toHaveBeenCalledWith(50);
    });
  });

  it('calls onComplete only once at 90% progress', async () => {
    render(
      <CoursePlayer
        videoUrl={videoUrl}
        onComplete={mockOnComplete}
      />
    );

    const video = screen.getByRole('video', { hidden: true }) as HTMLVideoElement;
    
    // Simulate 90% progress
    Object.defineProperty(video, 'currentTime', { value: 90, writable: true });
    Object.defineProperty(video, 'duration', { value: 100, writable: true });
    
    fireEvent.timeUpdate(video);
    fireEvent.timeUpdate(video);
    fireEvent.timeUpdate(video);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onComplete when video ends', async () => {
    render(
      <CoursePlayer
        videoUrl={videoUrl}
        onComplete={mockOnComplete}
      />
    );

    const video = screen.getByRole('video', { hidden: true }) as HTMLVideoElement;
    fireEvent.ended(video);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('toggles play/pause', async () => {
    render(<CoursePlayer videoUrl={videoUrl} />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /pause/i })).toBeDefined();
    });
  });

  it('toggles mute', async () => {
    render(<CoursePlayer videoUrl={videoUrl} />);
    
    const muteButton = screen.getByRole('button', { name: /volume/i });
    fireEvent.click(muteButton);

    const video = screen.getByRole('video', { hidden: true }) as HTMLVideoElement;
    expect(video.muted).toBe(true);
  });
});
