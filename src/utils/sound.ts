class CyberAudioSynth {
  private ctx: AudioContext | null = null;
  private enabled = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): boolean {
    this.enabled = next;
    if (next) {
      this.ensureContext();
      this.playBootChord();
    }
    return this.enabled;
  }

  public toggle(): boolean {
    return this.setEnabled(!this.enabled);
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private tone(freq: number, duration: number, type: OscillatorType, volume: number, delay = 0) {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playHoverTick() {
    this.tone(1180, 0.035, 'triangle', 0.025);
  }

  public playClickBlip() {
    this.tone(660, 0.05, 'square', 0.03);
    this.tone(990, 0.06, 'sine', 0.035, 0.03);
  }

  public playBootChord() {
    this.tone(220, 0.14, 'sawtooth', 0.025, 0);
    this.tone(440, 0.16, 'triangle', 0.03, 0.05);
    this.tone(880, 0.2, 'sine', 0.03, 0.11);
  }

  public playTerminalKey() {
    this.tone(540 + Math.random() * 140, 0.025, 'square', 0.018);
  }
}

export const cyberAudio = new CyberAudioSynth();
