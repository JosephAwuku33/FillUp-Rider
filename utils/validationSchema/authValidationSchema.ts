import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signUpSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^0\d{9}$/, "Invalid phone number"),

  password: yup
    .string()
    .min(8, "Minimum of 8 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
