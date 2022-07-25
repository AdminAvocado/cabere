import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import './FileSelector.scss';

class FileSelector extends React.Component {
  constructor() {
    super();
    this.state = { file: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { file } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    return onSubmit(file);
  }

  handleChange(e) {
    const { files } = e.target;
    const { autoUpload, onSelectFile } = this.props;
    if (!autoUpload) {
      onSelectFile(files[0]);
      this.setState({ file: files[0] });
      return;
    }
    this.setState({ file: files[0] }, () => {
      if (autoUpload) {
        this.buttonElement.click();
      }
    });
  }

  handleClick() {
    this.inputElement.click();
  }

  render() {
    const { children, variant, disabled } = this.props;
    const { file } = this.state;
    return (
      <form encType="multipart/form-data" onSubmit={this.onSubmit}>
        <input
          ref={(input) => { this.inputElement = input; }}
          className="FileSelector__input"
          type="file"
          name="file"
          onChange={this.handleChange}
        />
        <Button
          disabled={disabled}
          variant={variant}
          onClick={this.handleClick}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          {file ? file.name : children}
        </Button>
        <button
          ref={(button) => { this.buttonElement = button; }}
          type="submit"
          className="FileSelector__input"
        >
          s
        </button>
      </form>
    );
  }
}

FileSelector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.shape({}),
  ]),
  autoUpload: PropTypes.bool,
  onSubmit: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onSelectFile: PropTypes.func,
};

FileSelector.defaultProps = {
  autoUpload: false,
  disabled: false,
  onSubmit: () => 1,
  onSelectFile: () => 1,
  variant: '',
  children: '',
};

export default FileSelector;
