"use client";

import { useEffect, useRef } from "react";

interface BrownNoisePlayerProps {
    isPlaying: boolean;
    volume?: number;
    showVolumeControl?: boolean;
    onVolumeChange?: (volume: number) => void;
}

export function BrownNoisePlayer({
    isPlaying,
    volume = 0.5,
}: BrownNoisePlayerProps) {
    const audioContextRef = useRef<AudioContext | null>(null);
    const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {
        // Only create audio context on first play
        if (!isPlaying) {
            // Stop and clean up
            if (noiseNodeRef.current) {
                noiseNodeRef.current.stop();
                noiseNodeRef.current.disconnect();
                noiseNodeRef.current = null;
            }
            return;
        }

        // Create audio context if needed (must be done after user interaction)
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }

        const audioContext = audioContextRef.current;

        // Create gain node for volume control
        if (!gainNodeRef.current) {
            gainNodeRef.current = audioContext.createGain();
            gainNodeRef.current.connect(audioContext.destination);
        }
        gainNodeRef.current.gain.value = volume * 0.3; // Reduce volume

        // Generate brown noise buffer
        const bufferSize = audioContext.sampleRate * 5; // 5 seconds of noise
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Brown noise: integrate white noise
            lastOut = (lastOut + (0.02 * white)) / 1.02;
            data[i] = lastOut * 3.5; // Amplify
        }

        // Create and play the noise source
        const noiseNode = audioContext.createBufferSource();
        noiseNode.buffer = buffer;
        noiseNode.loop = true;
        noiseNode.connect(gainNodeRef.current);
        noiseNode.start();

        noiseNodeRef.current = noiseNode;

        return () => {
            if (noiseNodeRef.current) {
                noiseNodeRef.current.stop();
                noiseNodeRef.current.disconnect();
                noiseNodeRef.current = null;
            }
        };
    }, [isPlaying, volume]);

    // Update volume
    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volume * 0.3;
        }
    }, [volume]);

    return null; // No UI, just manages audio
}
