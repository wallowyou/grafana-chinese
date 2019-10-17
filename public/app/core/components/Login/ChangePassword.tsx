import React, { PureComponent, SyntheticEvent, ChangeEvent } from 'react';
import { Tooltip } from '@grafana/ui';
import appEvents from 'app/core/app_events';

interface Props {
  onSubmit: (pw: string) => void;
  onSkip: Function;
  focus?: boolean;
}

interface State {
  newPassword: string;
  confirmNew: string;
  valid: boolean;
}

export class ChangePassword extends PureComponent<Props, State> {
  private userInput: HTMLInputElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmNew: '',
      valid: false,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.focus && this.props.focus) {
      this.focus();
    }
  }

  focus() {
    this.userInput.focus();
  }

  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const { newPassword, valid } = this.state;
    if (valid) {
      this.props.onSubmit(newPassword);
    } else {
      appEvents.emit('alert-warning', ['New passwords do not match', '']);
    }
  };

  onNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newPassword: e.target.value,
      valid: this.validate('newPassword', e.target.value),
    });
  };

  onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      confirmNew: e.target.value,
      valid: this.validate('confirmNew', e.target.value),
    });
  };

  onSkip = (e: SyntheticEvent) => {
    this.props.onSkip();
  };

  validate(changed: string, pw: string) {
    if (changed === 'newPassword') {
      return this.state.confirmNew === pw;
    } else if (changed === 'confirmNew') {
      return this.state.newPassword === pw;
    }
    return false;
  }

  render() {
    return (
      <div className="login-inner-box" id="change-password-view">
        <div className="text-left login-change-password-info">
          <h5>
            {/* Change Password */}
            修改密码
          </h5>
          {/* Before you can get started with awesome dashboards we need you to make your account more secure by changing
          your password. */}
          在您开始使用仪表板之前，我们需要您通过更改密码来确保帐户安全。
          <br />
          {/* You can change your password again later. */}
          您也可以稍后修改您的密码！
        </div>
        <form className="login-form-group gf-form-group">
          <div className="login-form">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="gf-form-input login-form-input"
              required
              placeholder="New password"
              onChange={this.onNewPasswordChange}
              ref={input => {
                this.userInput = input;
              }}
            />
          </div>
          <div className="login-form">
            <input
              type="password"
              name="confirmNew"
              className="gf-form-input login-form-input"
              required
              ng-model="command.confirmNew"
              placeholder="Confirm new password"
              onChange={this.onConfirmPasswordChange}
            />
          </div>
          <div className="login-button-group login-button-group--right text-right">
            <Tooltip
              placement="bottom"
              // content="If you skip you will be prompted to change password next time you login."
              content="如果您跳过，则下次登录时将提示您更改密码。"
            >
              <a className="btn btn-link" onClick={this.onSkip}>
                {/* Skip */}
                跳过
              </a>
            </Tooltip>

            <button
              type="submit"
              className={`btn btn-large p-x-2 ${this.state.valid ? 'btn-primary' : 'btn-inverse'}`}
              onClick={this.onSubmit}
              disabled={!this.state.valid}
            >
              {/* Save */}
              保存
            </button>
          </div>
        </form>
      </div>
    );
  }
}
