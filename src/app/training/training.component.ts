import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrainingService } from './training.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  trainingOngoing = false
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.changeExercise.subscribe(ex => {
      if (ex) {
        console.log(ex)
        this.trainingOngoing = true
      } else {
        this.trainingOngoing = false
      }
    })
  }
  ngOnDestroy(): void {
    this.trainingService.changeExercise.unsubscribe()
  }
}
