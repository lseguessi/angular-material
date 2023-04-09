import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { concat, interval, map, take, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {

  public loadPercent = 0;
  public queryValue = 0;
  public currentPlayback = 0;
  public queryMode:ProgressBarMode = 'query';


  constructor() {}

  ngOnInit(): void {
    this.loadingProgress(500, 100).subscribe( i => this.loadPercent = i);
    this.loadingProgress(250, 100).subscribe( i => this.currentPlayback = i);

    concat(
      interval(2000).pipe(
        take(1),
        tap(_ => (this.queryMode = 'determinate'))
      ),
      this.loadingProgress(500, 100)
    ).subscribe( i => this.queryValue = i);
  }

  loadingProgress(speed: number, takeUntil: number) {
    return interval(speed)
      .pipe(
        map(i => i * 5),
        takeWhile(i => i <= takeUntil)
      )
  }

}
