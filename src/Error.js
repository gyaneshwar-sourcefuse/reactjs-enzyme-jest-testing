import { ErrorMessage } from "formik";

export default function Error({ name }) {
  return <ErrorMessage component="div" name={name} className="error" data-testid={`${name}-error`} />;
}
