import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  torture
  exercises: Exercise[]
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises()
  }

  onStartTraining() {
    console.log('selectedId:' + this.torture)
    this.trainingService.startExercise(this.torture)
  }
}
