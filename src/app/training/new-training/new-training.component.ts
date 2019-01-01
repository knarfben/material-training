import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { TrainingService } from '../training.service'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  torture
  exercises: Observable<any>
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.exercises = this.db.collection('availableExercises').valueChanges()
  }

  onStartTraining() {
    console.log('selectedId:' + this.torture)
    this.trainingService.startExercise(this.torture)
  }
}
