import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrainingService } from '../training.service'
import { Subscription } from 'rxjs'
import { Exercise } from '../exercise.model'
import { UIService } from 'src/app/shared/ui.service'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  torture: string
  exercises: Exercise[]
  changedExercisesSubscription: Subscription
  dataLoadingSubs: Subscription
  spinMe = true
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.dataLoadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.spinMe = isLoading
      }
    )
    this.changedExercisesSubscription = this.trainingService.changedExercises.subscribe(
      exs => {
        this.exercises = exs
      }
    )
    this.trainingService.fetchAvailableExercises()
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy() {
    if (this.changedExercisesSubscription) {
      this.changedExercisesSubscription.unsubscribe()
    }
    if (this.dataLoadingSubs) {
      this.dataLoadingSubs.unsubscribe()
    }
  }

  onStartTraining() {
    this.trainingService.startExercise(this.torture)
  }
}
