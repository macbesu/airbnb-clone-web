import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withFormik, FormikErrors, FormikProps } from 'formik';
import * as yup from 'yup';

const FormItem = Form.Item;

interface FormValues {
  email: string,
  password: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { values, handleChange, handleBlur, handleSubmit, touched, errors } = this.props;

    return (
      <form style={{ display: 'flex', justifyContent: 'center' }} onSubmit={handleSubmit}>
        <div className="login-form" style={{ width: 400, marginTop: 40 }}>
          <FormItem
            help={touched.email && errors.email ? errors.email : ''}
            validateStatus={touched.email && errors.email ? "error" : undefined}
          >
            <Input
              name="email"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem
            help={touched.password && errors.password ? errors.password : ''}
            validateStatus={touched.password && errors.password ? "error" : undefined}
          >
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem>
            <a className="login-form-forgot" href="">Forgot password</a>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </FormItem>
          <FormItem>
            Or <a href="">login now!</a>
          </FormItem>
        </div>
      </form>
    );
  }
};

const emailNotLongEnough = "email must be at least 3 characters";
const passwordNotLongEnough = "password must be at least 3 characters";
const invalidEmail = "email must be a valid email";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
    .required()
});

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => ({ email: '', password: '' }), 
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);