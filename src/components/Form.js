import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import { formUpdate, gohome } from './../actions';

class Form extends React.PureComponent {

  constructor (props) {
    super(props);
    this.timer = null;
    this.inputChange = this.inputChange.bind(this);
    this.state = { form: Object.assign({}, props.form) };
    this.actions = bindActionCreators(
      { formUpdate, gohome },
      this.props.dispatch,
    );
  }

  componentWillMount () {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  componentDidMount () {
    const { form } = this.state;
    if (form && form.url) return;
    this.actions.gohome();
  }

  inputChange ({ target }) {
    const { name, value } = target;
    this.setState(
      prev => ({ form: Object.assign({}, prev, { [name]: value }) }),
      () => {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => this.actions.formUpdate(this.state.form), 800);
      },
    );
  }

  render () {
    const { form } = this.state;
    return (
      <div id="createform"
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

Form.defaultProps = {
  form: null,
};

Form.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  form: state.form,
  router: state.router,
});

export default connect(mapStateToProps)(Form);
