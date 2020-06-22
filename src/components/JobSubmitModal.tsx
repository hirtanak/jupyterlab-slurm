import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
// Local
// import Select from './Select';

namespace types {
  export type Props = {
    show: boolean,
    onHide: () => void;
    submitJob: (input: string, inputType: string) => void;
    error?: string;
  };

  export type State = {
    inputType: string;
    filepath: string;
    inlineScript: string;
  };
}

export default class JobSubmitModal extends Component<types.Props, types.State> {
  constructor(props) {
    super(props);
    this.state = {
      inputType: 'path',
      filepath: '',
      inlineScript: '',
    };
  }

  changeInputType(inputType: string) {
    this.setState({ inputType, filepath: '', inlineScript: '' });
  }

  updateFilepath(filepath) {
    this.setState({ filepath });
  }

  updateInlineScript(inlineScript) {
    this.setState({ inlineScript });
  }

  handleSubmit() {
    const { inputType, filepath, inlineScript } = this.state;
    console.log(inputType, filepath, inlineScript);
    const input = inputType === 'path' ? filepath : inlineScript;
    this.props.submitJob(input, inputType);
  }

  render() {
    const { show, onHide } = this.props;
    const { inputType } = this.state;
    return (
      <Modal show={show} size="lg" onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit a Batch Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="mode-selector">
            <Form.Label>Script type</Form.Label>
            <Form.Control as="select" onChange={e => this.changeInputType(e.target.value)}>
              <option value="path">File</option>
              <option value="contents">Text input</option>
            </Form.Control>
          </Form.Group>
          {inputType === 'path' &&
            <Form.Group controlId="filepath-input">
              <Form.Label>File path</Form.Label>
              <Form.Control
                type="text"
                placeholder="path relative to filebrowser"
                onChange={(e) => this.updateFilepath(e.target.value)}
              />
            </Form.Group>
          }
          {inputType !== 'path' &&
            <Form.Group>
              <Form.Label>Write your script here</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                onChange={e => this.updateInlineScript(e.target.value)}
              />
            </Form.Group>
          }
          <div>{this.props.error}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={this.handleSubmit.bind(this)}>Submit Job</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
