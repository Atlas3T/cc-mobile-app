/* eslint-disable class-methods-use-this */
import 'babel-polyfill';
import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

export default class SecurityService {
  constructor(config) {
    console.log('constructor');
    this.mgr = new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore({
        // prefix: 'oidc',
        store: window.localStorage,
      }),
      authority: 'https://cryptocycle.online/identity/',
      client_id: 'r4w.app.implicit',
      redirect_uri: config.callback,
      response_type: 'id_token token',
      scope: 'openid profile email r4w-api-consumer', // 'openid profile',
      post_logout_redirect_uri: config.logout_redirect,
      silent_redirect_uri: `${config.logout_redirect}/silent-renew.html`,
      accessTokenExpiringNotificationTime: 2,
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      loadUserInfo: true,
      clockSkew: 900,
      silentRequestTimeout: 2,
    });

    this.mgr.events.addUserLoaded((user, ...args) => {
      console.log('New User Loaded：', args);
    });

    this.mgr.events.addAccessTokenExpiring((...args) => {
      console.log('AccessToken Expiring：', args);
    });

    this.mgr.events.addAccessTokenExpired((...args) => {
      console.log('AccessToken Expired：', args);
      // alert('Session expired. Going out!')
      //   Dialog.create({
      //     title: 'Session expired',
      //     message: 'Redirection to authenticate.',
      //     preventClose: true,
      //   }).then(() => {
      try {
        this.mgr.signoutRedirect().then((resp) => {
          console.log('signed out', resp);
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.mgr.events.addSilentRenewError((...args) => {
      console.error('Silent Renew Error：', args);
    });

    this.mgr.events.addUserSignedOut(() => {
      this.mgr.removeUser().then(() => {
        this.mgr.clearStaleState()
          .then(() => {
            this.mgr.signinRedirect();
          });
      });
    });
  }


  getUser() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(null);
        }
        return resolve(user);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getSignedIn() {
    // const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          // self.signIn();
          return resolve(false);
        }
        console.log(user);
        return resolve(user);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  signIn() {
    this.mgr.signinRedirect().catch((err) => {
      console.log(err);
    });
  }

  signOut() {
    this.mgr.signoutRedirect().then((resp) => {
      console.log('signed out', resp);
    }).catch((err) => {
      console.log(err);
    });
  }

  getToken() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.access_token);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getProfile() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.profile);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getIdToken() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.id_token);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getSessionState() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.session_state);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getAcessToken() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.access_token);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getScopes() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.scopes);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }

  getRole() {
    const self = this;
    return new Promise((resolve, reject) => {
      this.mgr.getUser().then((user) => {
        if (user == null) {
          self.signIn();
          return resolve(false);
        }
        return resolve(user.profile.role);
      }).catch((err) => {
        console.log(err);
        return reject(err);
      });
    });
  }
}
