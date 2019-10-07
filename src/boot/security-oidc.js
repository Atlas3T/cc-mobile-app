/* eslint-disable class-methods-use-this */
import 'babel-polyfill';
import Oidc from 'oidc-client';

const mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore({
    // prefix: 'oidc',
    store: window.localStorage,
  }),
  authority: 'https://cryptocycle.online/identity/',
  client_id: 'r4w.app.implicit',
  redirect_uri: 'http://localhost:8080/#/callback#',
  response_type: 'id_token token',
  scope: 'openid profile email r4w-api-consumer', // 'openid profile',
  post_logout_redirect_uri: 'http://localhost:8080/index.html',
  silent_redirect_uri: `${window.location.origin}/silent-renew.html`,
  accessTokenExpiringNotificationTime: 2,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  clockSkew: 900,
  silentRequestTimeout: 2,
});

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded((user, ...args) => {
  console.log('New User Loaded：', args);
  console.log('Acess_token: ', user.access_token);
});

mgr.events.addAccessTokenExpiring((...args) => {
  console.log('AccessToken Expiring：', args);
});

mgr.events.addAccessTokenExpired((...args) => {
  console.log('AccessToken Expired：', args);
  // alert('Session expired. Going out!')
  //   Dialog.create({
  //     title: 'Session expired',
  //     message: 'Redirection to authenticate.',
  //     preventClose: true,
  //   }).then(() => {
  try {
    mgr.signoutRedirect().then((resp) => {
      console.log('signed out', resp);
    }).catch((err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
});

mgr.events.addSilentRenewError((...args) => {
  console.error('Silent Renew Error：', args);
});

mgr.events.addUserSignedOut(() => {
  mgr.removeUser().then(() => {
    mgr.clearStaleState()
      .then(() => {
        mgr.signinRedirect();
      });
  });
});

export default class SecurityService {
  constructor() {
    console.log('Construtor');
  }

  getUser() {
    const self = this;
    return new Promise((resolve, reject) => {
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
    mgr.signinRedirect().catch((err) => {
      console.log(err);
    });
  }

  signOut() {
    mgr.signoutRedirect().then((resp) => {
      console.log('signed out', resp);
    }).catch((err) => {
      console.log(err);
    });
  }

  getToken() {
    const self = this;
    return new Promise((resolve, reject) => {
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
      mgr.getUser().then((user) => {
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
