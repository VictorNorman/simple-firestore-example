import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public simple: FormGroup;
  private dataList: firebase.firestore.CollectionReference;
  private resultsList: string[];
  public numEntries = 0;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.simple = this.formBuilder.group({
      text: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.dataList = firebase.firestore().collection('/simple');
    this.getData();
  }

  async getData() {
    // Get all values from firestore, ordered by 'value'.
    const data = await this.dataList.orderBy('value').get();
    // reset the resultsList and copy values from data to resultsList.
    this.resultsList = [];
    data.forEach((doc) => this.resultsList.push(doc.data().value));
    this.numEntries = this.resultsList.length;
  }

  async submit() {
    // Send to the database.
    this.dataList.add({
      value: this.simple.get('text').value,
      time: new Date().getTime(),
    });
    this.getData();
    // Reset the GUI field to empty.
    this.simple.setValue({ 'text': '' });
  }

  // Return the document id (which was created automatically) for the given
  // text value.
  async getIdForText(entryText: string): Promise<string> {
    const docs = await this.dataList.where('value', '==', entryText).get();
    // console.log('docs size is', docs.size);
    let docId: string;
    docs.forEach((doc) => docId = doc.id);
    // TODO: assumes one match!!!
    return docId;
  }

  async remove(entryText: string) {
    console.log('removing item with value', entryText);
    const docId = await this.getIdForText(entryText);
    console.log('docId is', docId);
    this.dataList.doc(docId).delete();
    // update the cached list.
    this.getData();
  }

  getAllResults(): string[] {
    // Would have liked to get the results here but then you have to return a Promise,
    // and I couldn't figure out how to make the html code happy with that... even using | async.
    return this.resultsList;
  }

}
