export const AuthError = ({ message }) => {
  if (!message) return null;
  return <p className="text-center text-sm text-red-400">{message}</p>;
};
