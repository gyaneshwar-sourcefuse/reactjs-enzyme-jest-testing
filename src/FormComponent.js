import { Form, Formik } from "formik";
import { useState } from "react";
import { Button, Col, Container, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as Yup from "yup";
import { FORM_VALIDATIONS } from "./constants";
import Error from "./Error";

export default function FormComponent() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(FORM_VALIDATIONS.NAME_REQUIRED),
    email: Yup.string().required(FORM_VALIDATIONS.EMAIL_REQUIRED).email(FORM_VALIDATIONS.EMAIL_INVALID),
    phone: Yup.string().required(FORM_VALIDATIONS.PHONE_REQUIRED),
    gender: Yup.string().required(FORM_VALIDATIONS.GENDER_REQUIRED),
  });

  const [, setUser] = useState(initialValues);

  return (
    <Container className="mt-4">
      <Row>
        <h2>Form:</h2>
        <Col>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setUser(setUser);
              console.log("form values", values);
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <FormLabel>Name:</FormLabel>
                  <FormControl
                    name="name"
                    type="text"
                    id="name"
                    data-testid="name"
                    value={values.name ?? ""}
                    onChange={handleChange}
                  />
                  <Error name="name" />
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel>Email:</FormLabel>
                  <FormControl
                    name="email"
                    type="email"
                    id="email"
                    data-testid="email"
                    value={values.email ?? ""}
                    onChange={handleChange}
                  />
                  <Error name="email" />
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel>Phone number:</FormLabel>
                  <FormControl
                    name="phone"
                    type="number"
                    id="phone"
                    data-testid="phone"
                    value={values.phone ?? ""}
                    onChange={handleChange}
                  />
                  <Error name="phone" />
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel>Gender:</FormLabel>
                  <FormControl
                    as="select"
                    className="form-control"
                    name="gender"
                    id="gender"
                    data-testid="gender"
                    value={values.gender ?? ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender...</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Others">Others</option>
                  </FormControl>
                  <Error name="gender" />
                </FormGroup>
                <div className="d-flex justify-content-end">
                  <Button type="submit" data-testid="submit">Submit</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
