import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../state/store";
import {
  AuthButton,
  AuthInput,
  AuthLayout,
  AuthLink,
  AuthLogo,
} from "./AuthComponents";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ ...form });
    navigate("/profile");
  };

  return (
    <AuthLayout>
      <AuthLogo />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthInput
          label="ელ-ფოსტა"
          type="email"
          placeholder="mariam@example.com"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <AuthInput
          label="პაროლი"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <AuthButton>შესვლა</AuthButton>
      </form>
      <AuthLink
        label="ანგარიში არ გაქვს?"
        linkText="რეგისტრაცია"
        onClick={() => navigate("/register")}
      />
    </AuthLayout>
  );
};

export default Login;
