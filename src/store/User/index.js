import { Model } from '@vuex-orm/core';

export default class User extends Model {
  static entity = 'users';

  static primaryKey = 'accountNumber';

  static fields() {
    return {
      userName: this.attr(''),
      accountNumber: this.attr(''),
      emailAddress: this.attr(''),
      pointsBalance: this.attr(0),
      cashBalance: this.attr(0),
      itemsRecycled: this.attr(''),
      bottleTarget: this.attr(0),
      canTarget: this.attr(0),
      expires: this.attr(''),
    };
  }
}
