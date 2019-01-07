import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrainingService } from './training.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  trainingOngoing = false
  private exerciseSubscription: Subscription
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.changeExercise.subscribe(
      ex => {
        if (ex) {
          this.trainingOngoing = true
        } else {
          this.trainingOngoing = false
        }
      }
    )
  }
  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
  }
}
