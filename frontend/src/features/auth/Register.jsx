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

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: form.email, firstname: form.firstname, orders: [] });
    navigate("/profile");
  };

  return (
    <AuthLayout>
      <AuthLogo />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <AuthInput
            label="სახელი"
            type="text"
            placeholder="მარიამი"
            value={form.firstname}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <AuthInput
            label="გვარი"
            type="text"
            placeholder="გელაშვილი"
            value={form.lastname}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
        </div>
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
          label="ტელეფონი"
          type="tel"
          placeholder="(+995) 599-000-000"
          value={form.phone}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, phone: e.target.value }))
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
        <AuthInput
          label="გაიმეორე პაროლი"
          type="password"
          placeholder="••••••••"
          value={form.confirm}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <AuthButton>რეგისტრაცია</AuthButton>
      </form>
      <AuthLink
        label="უკვე გაქვს ანგარიში?"
        linkText="შესვლა"
        onClick={() => navigate("/login")}
      />
    </AuthLayout>
  );
};

export default Register;
