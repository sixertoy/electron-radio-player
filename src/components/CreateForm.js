import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './createform.css';

class CreateForm extends React.PureComponent {

  constructor (props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.state = { form: Object.assign({}, props.form) };
  }

  componentWillReceiveProps (nextprops) {
    this.setState(prev => ({ form: Object.assign(prev, nextprops.form) }));
  }

  inputChange ({ target }) {
    const { name, value } = target;
    this.setState(prev => ({ form: Object.assign({}, prev, { [name]: value }) }));
  }

  render () {
    const { form } = this.state;
    return (
      <div id="creation-form"
        className="form">
        <label htmlFor="name">
          <span>Name</span>
          <input required
            type="text"
            name="name"
            value={form.name || ''}
            onChange={this.inputChange}
            placeholder="Please enter a value" />
        </label>
        <label htmlFor="website">
          <span>Website</span>
          <input required
            type="url"
            name="website"
            value={form.website || ''}
            onChange={this.inputChange}
            placeholder="Please enter a value" />
        </label>
        <input type="hidden"
          name="uri"
          defaultValue={form.uri || ''} />
        <input type="hidden"
          name="type"
          defaultValue={form.type || 'radio'} />
      </div>
    );
  }

}

CreateForm.defaultProps = {
  form: null,
};

CreateForm.propTypes = {
  form: PropTypes.object,
};

const mapStateToProps = state => ({
  form: state.createform,
});

export default connect(mapStateToProps)(CreateForm);
