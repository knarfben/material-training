import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { MatDialog } from "@angular/material"
import { StopTrainingComponent } from "./stop-training.component"

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.scss"]
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter()
  progress = 0
  step = 5
  timer: number
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer()
  }

  private startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + this.step
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  /**
   * onStop
   */
  public onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit()
      } else {
        this.startOrResumeTimer()
      }
    })
  }
}
