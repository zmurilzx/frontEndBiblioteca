import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
  @Input() data: number[] = [];
  @Input() width = 640;
  @Input() height = 160;
  @Input() stroke = 'var(--primary)';
  @Input() fill = 'rgba(99, 102, 241, 0.15)';
  @Input() showMarkers = true;
  @Input() horizontalSteps = 4;
  @Input() verticalSteps = 5;

  points = '';
  areaPoints = '';
  pointList: Array<[number, number]> = [];
  gridY: number[] = [];
  gridX: number[] = [];
  readonly gradientId = `lc-grad-${Math.random().toString(36).slice(2, 8)}`;
  readonly glowId = `lc-glow-${Math.random().toString(36).slice(2, 8)}`;

  ngChanges() { this.compute(); }

  ngOnChanges(): void { this.compute(); }

  private compute(): void {
    const padX = 16;
    const padY = 12;
    const w = this.width - padX * 2;
    const h = this.height - padY * 2;
    if (!this.data || this.data.length === 0) {
      this.points = '';
      this.areaPoints = '';
      this.pointList = [];
      this.gridY = [];
      this.gridX = [];
      return;
    }
    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const span = max - min || 1;
    const stepX = w / (this.data.length - 1 || 1);
    const pts: Array<[number, number]> = this.data.map((v, i) => {
      const x = padX + i * stepX;
      const norm = (v - min) / span;
      const y = padY + (1 - norm) * h;
      return [Number(x.toFixed(2)), Number(y.toFixed(2))];
    });
    this.points = pts.map(([x, y]) => `${x},${y}`).join(' ');
    const areaStart = `${padX},${padY + h}`;
    const areaEnd = `${padX + w},${padY + h}`;
    this.areaPoints = [areaStart, ...pts.map(([x, y]) => `${x},${y}`), areaEnd].join(' ');
    this.pointList = pts;

    const horizontalSteps = Math.max(1, this.horizontalSteps);
    this.gridY = Array.from({ length: horizontalSteps + 1 }, (_, i) =>
      Number((padY + (h / horizontalSteps) * i).toFixed(2))
    );

    const verticalSteps = Math.min(Math.max(1, this.verticalSteps), this.data.length - 1 || 1);
    const columnCount = Math.max(1, verticalSteps);
    this.gridX = Array.from({ length: columnCount + 1 }, (_, i) =>
      Number((padX + (w / columnCount) * i).toFixed(2))
    );
  }
}
