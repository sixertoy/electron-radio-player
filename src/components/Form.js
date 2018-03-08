import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import { formUpdate, gohome } from './../actions';
import ColorPickerInput from './colorpicker/ColorPickerInput';

class Form extends React.PureComponent {
  constructor (props) {
    super(props);
    this.timer = null;
    this.inputChange = this.inputChange.bind(this);
    this.state = { form: Object.assign({}, props.form) };
    this.actions = bindActionCreators({ formUpdate, gohome }, this.props.dispatch);
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

  inputChange (obj) {
    const { name, value } = obj.target || obj;
    const delay = !obj.target ? 1 : 400;
    this.setState(
      prev => ({ form: Object.assign({}, prev.form, { [name]: value }) }),
      () => {
        if (this.timer) clearTimeout(this.timer);
        const { form } = this.state;
        this.timer = setTimeout(() => this.actions.formUpdate(form), delay);
      },
    );
  }

  render () {
    const { form } = this.state;
    const { errors } = this.props;
    return (
      <div id="createform" className="form">
        <label htmlFor="url" className={errors && errors.url ? 'error' : ''}>
          <span>{errors && errors.url && '*'} Radio URL</span>
          <input type="url"
            name="url"
            value={form.url || ''}
            onChange={this.inputChange}
            placeholder="Radio stream URI" />
        </label>
        <label htmlFor="name" className={errors && errors.name ? 'error' : ''}>
          <span>{errors && errors.name && '*'} Name</span>
          <input type="text"
            name="name"
            value={form.name || ''}
            onChange={this.inputChange}
            placeholder="Name you favorite radio station" />
        </label>
        <label htmlFor="website">
          <span>Website</span>
          <input type="url"
            name="website"
            value={form.website || ''}
            onChange={this.inputChange}
            placeholder="Website URL" />
        </label>
        <label htmlFor="twitter">
          <span>Twitter</span>
          <input type="text"
            name="twitter"
            pattern="^(@[a-zA-Z0-9]+)$"
            value={form.twitter || ''}
            onChange={this.inputChange}
            placeholder="Twitter username @ prefixed" />
        </label>
        <div className="fieldset">
          <label htmlFor="color">
            <span>Font</span>
            <ColorPickerInput color={form.color || '#FFFFFF'}
              name="color"
              onChange={this.inputChange} />
          </label>
          <label htmlFor="background">
            <span>Background</span>
            <ColorPickerInput color={form.background || '#000000'}
              name="background"
              onChange={this.inputChange} />
          </label>
        </div>
        <input type="hidden" name="id" defaultValue={form.id} />
        <input type="hidden" name="type" defaultValue={form.type || 'radio'} />
      </div>
    );
  }
}

Form.defaultProps = {
  form: null,
};

Form.propTypes = {
  form: PropTypes.object,
  errors: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  form: state.form,
  router: state.router,
  errors: state.formerrors,
});

export default connect(mapStateToProps)(Form);
