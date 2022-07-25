import React from 'react';
import { SignIn } from 'aws-amplify-react';
import logo from 'assets/img/logo.png';
import Text from 'components/Text';

export default class CustomSignIn extends SignIn {
  render() {
    return (
      <div className="Card_Login">
        <div className="GRUPO-CABERE">
          <Text translationKey="GRUPO CABERE" />
        </div>
        <div className="login-welcome">
          <Text translationKey="Bienvenido" />
        </div>

        <form className="login-form">
          <div>
            <div className="col-auto">
              <input
                className="appearance-none login-input border
                              rounded w-full py-2 px-3 text-grey-darker
                              mb-3 leading-tight focus:outline-none
                              focus:shadow-outline"
                id="username"
                key="username"
                name="username"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Usuario"
              />
            </div>
            <div className="mb-6">
              <input
                className="appearance-none login-input border
                  rounded w-full py-2 px-3 text-grey-darker
                  mb-3 leading-tight focus:outline-none
                  focus:shadow-outline"
                id="password"
                key="password"
                name="password"
                onChange={this.handleInputChange}
                type="password"
                placeholder="Contraseña"
              />

            </div>
            <div className="flex items-center justify-between">
              <button
                className="btn-login"
                type="button"
                onClick={() => super.signIn()}
              >
                Ingresar
              </button>
              <p className="login-pwd">
                <a
                  href="/#"
                  role="button"
                  tabIndex={0}
                  className="login-pwd"
                  onClick={() => super.changeState('forgotPassword')}
                  onKeyDown={() => super.changeState('forgotPassword')}
                >
                  Recuperar contraseña
                </a>
              </p>
            </div>
            <img src={logo} className="login-logo" alt="logo" />
          </div>
        </form>
      </div>
    );
  }
}
