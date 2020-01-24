import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private fs: AngularFirestore) { }

  getQuestion(id) { 
    return this.fs.collection('questions', ref => ref.where('id', '==', id.toString()))
    .valueChanges();
  }
}
