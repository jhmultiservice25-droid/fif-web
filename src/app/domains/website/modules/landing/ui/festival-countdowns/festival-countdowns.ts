import { Component, OnDestroy, signal } from '@angular/core';

export interface CountdownTarget {
  readonly label: string;
  readonly deadline: string;
  readonly target: string;
}

interface CountdownView extends CountdownTarget {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly expired: boolean;
}

@Component({
  selector: 'festival-countdowns',
  templateUrl: './festival-countdowns.html'
})
export class FestivalCountdowns implements OnDestroy {
  private readonly targets: readonly CountdownTarget[] = [
    {
      label: 'FIKIRI Innovation Festival 2026',
      deadline: '25 novembre 2026',
      target: '2026-11-25T00:00:00+01:00'
    },
    {
      label: 'Clôture des candidatures — solutions innovantes',
      deadline: '25 octobre 2026 · 23h59',
      target: '2026-10-25T23:59:00+01:00'
    },
    {
      label: 'Clôture de génération du badge participant',
      deadline: '20 novembre 2026 · 23h59',
      target: '2026-11-20T23:59:00+01:00'
    }
  ];

  protected readonly countdowns = signal<readonly CountdownView[]>(this.calculate());

  private readonly timer = window.setInterval(() => {
    this.countdowns.set(this.calculate());
  }, 1000);

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }

  private calculate(): readonly CountdownView[] {
    const now = Date.now();

    return this.targets.map((item) => {
      const remaining = Math.max(0, new Date(item.target).getTime() - now);
      return {
        ...item,
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor((remaining % 86_400_000) / 3_600_000),
        minutes: Math.floor((remaining % 3_600_000) / 60_000),
        seconds: Math.floor((remaining % 60_000) / 1000),
        expired: remaining === 0
      };
    });
  }
}
