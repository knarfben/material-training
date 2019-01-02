import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrainingService } from '../training.service'
import { Subscription } from 'rxjs'
import { Exercise } from '../exercise.model'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  torture: string
  exercises: Exercise[]
  changedExercisesSubscription: Subscription
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.changedExercisesSubscription = this.trainingService.changedExercises.subscribe(
      exs => {
        this.exercises = exs
      }
    )
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy() {
    this.changedExercisesSubscription.unsubscribe()
  }

  onStartTraining() {
    this.trainingService.startExercise(this.torture)
  }
}
