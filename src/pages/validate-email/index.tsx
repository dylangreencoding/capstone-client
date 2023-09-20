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
  const [loading, setLoading] = useState<boolean>(false);

  const handleValidateEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const codeData = {
      validationCode: code,
      password: password,
    };
    const data = {
      email: props.email,
      password: password,
    };
    try {
      const response1 = await validateEmail(codeData);

      // if email validation fails, return
      if (response1.type !== "200 OK") {
        alert(response1.message);
        setLoading(false);
        return;
      }

      const response = await logIn(data);
      // console.log(response.type);
      if (response.type === "200 OK") {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(response.accessToken)
        );
        alert(response.message);
        navigate("/capstone_user_account", { replace: true });
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
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
            onChange={(e) => setCode(e.target.value.trim())}
          />
        </label>
        {!loading ? (
          <button className="auth-button" type="submit">
            Verify & Login
          </button>
        ) : (
          <span className="small">Verifying...</span>
        )}
      </form>
    </div>
  );
}
