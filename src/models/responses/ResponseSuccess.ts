import { StatusType } from './StatusType'

export class ResponseSuccess {
  status: StatusType

  constructor(body?: object) {
    Object.assign(this, body)
    this.status = 'success'
  }
}
