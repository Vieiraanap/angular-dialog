import { DialogSize } from "./dialog-size";

export class DialogData<T> {
  title: string;
  size: DialogSize;
  object?: T;

  constructor(dialogData: DialogData<T>) {
    this.title = dialogData.title;
    this.size = dialogData.size;
    this.object = dialogData.object;
  }
}
