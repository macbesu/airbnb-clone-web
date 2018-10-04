import * as React from 'react';
import { Form as ANTDForm, Icon, Button } from 'antd';
import { withFormik, FormikErrors, FormikProps, Field, Form } from 'formik';
import * as yup from 'yup';
import { InputField } from '../../shared/InputField';

const FormItem = ANTDForm.Item;

interface FormValues {
  email: string,
  password: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="login-form" style={{ width: 400, marginTop: 40 }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            component={InputField}
          />
          <Field
            name="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            component={InputField}
          />
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
      </Form>
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
  mapPropsToValues: () => ({ email: '', password: '' }), 
  handleSubmit: async (values, { props, setErrors }) => {
    console.log(values);
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);