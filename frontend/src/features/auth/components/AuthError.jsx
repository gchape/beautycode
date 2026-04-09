export const AuthError = ({ message }) =>
  message ? (
    <p role="alert" className="text-center text-sm text-red-500 font-medium">
      {message}
    </p>
  ) : null;
