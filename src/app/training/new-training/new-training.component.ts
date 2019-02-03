import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrainingService } from '../training.service'
import { Subscription, Observable } from 'rxjs'
import { Exercise } from '../exercise.model'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  torture: string
  exercises: Exercise[]
  changedExercisesSubscription: Subscription
  spinMe$: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.spinMe$ = this.store.select(fromRoot.getIsLoading)
    this.changedExercisesSubscription = this.trainingService.changedExercises.subscribe(
      exs => {
        this.exercises = exs
      }
    )
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy() {
    if (this.changedExercisesSubscription) {
      this.changedExercisesSubscription.unsubscribe()
    }
  }

  onStartTraining() {
    this.trainingService.startExercise(this.torture)
  }
}
