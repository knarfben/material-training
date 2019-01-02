import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrainingService } from '../training.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  torture: string
  changedExercisesSubscription: Subscription
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.changedExercisesSubscription = this.trainingService.changedExercises.subscribe(
      () => {}
    )
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy() {
    this.changedExercisesSubscription.unsubscribe()
    console.log('NewTraining onDestroy...')
  }

  onStartTraining() {
    console.log('selectedId:' + this.torture)
    this.trainingService.startExercise(this.torture)
  }
}
