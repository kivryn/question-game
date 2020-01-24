import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
import { Question } from 'src/app/models';
import { ClipboardService } from 'ngx-clipboard'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question;
  sub: Subscription;
  isLoading = true;
  
  constructor(private db: DbService, private _clipboardService: ClipboardService,
    private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.getPGQuestion();
  }

  getQuestion(start,end) {
    this.isLoading = true;
    const random = this.getRandom(start, end);
    console.log('id', random);
    this.sub = this.db.getQuestion(random).subscribe(data => {
      console.log(data);
      this.question = data[0] as Question;
      this.isLoading = false;
    });
  }

  getRQuestion() {
    this.getQuestion(678, 873);
  }

  getPGQuestion() {
    this.getQuestion(1, 677);
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  copyQuestion() {
    if (!this.isLoading) {
      this._clipboardService.copyFromContent("Random Question from Generator: " + this.question.question.toString());
      this._snackBar.open('Question Copied!', 'OK', {
        duration: 2000,
      });
    } else {
      this._snackBar.open('Sorry Something Went Wrong!', 'Try Again', {
        duration: 2000,
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
