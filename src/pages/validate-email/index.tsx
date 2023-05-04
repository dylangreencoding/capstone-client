import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import { validateEmail } from "../../expressAPI/validate-email";
import { logIn } from "../../expressAPI/log-in";

interface Props {
  email: any;
}

export default function ValidateEmail(props: Props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleValidateEmail = async (e: any) => {
    e.preventDefault();

    const codeData = {
      validationCode: code,
      password: password,
    };
    const data = {
      email: props.email,
      password: password,
    };

    try {
      await validateEmail(codeData);

      const response = await logIn(data);
      console.log(response);
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(response.accessToken)
      );
      alert(response.message);
      navigate("/capstone_user_account", { replace: true });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleValidateEmail}>
        <label className="auth-label">
          Desired Password
          <input
            className="auth-input"
            required
            type="password"
            minLength={8}
            maxLength={20}
            title="8 - 20 characters"
            placeholder="!@#$%^&*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="auth-label">
          Verification Code
          <input
            className="auth-input"
            required
            type="text"
            title="paste code here"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxMmRjMmE3LWJjNmMtNDAwNy04NTFiLWMzMGViY2RjM2YyOSIsImlhdCI6MTY4MzA4NDA0OCwiZXhwIjoxNjgzMDg0NjQ4fQ.MICk2vPlDkbTgJEOJL9sha2YouCjoRaq98Tp05HPW_U"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <button className="auth-button" type="submit">
          Verify & Login
        </button>
      </form>
    </div>
  );
}
