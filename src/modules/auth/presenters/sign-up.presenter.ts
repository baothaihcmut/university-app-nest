import { Expose } from 'class-transformer';

export class SignUpPresenterInput {}

export class SignUpPresenterOutput {
  @Expose({ name: 'hello' })
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
