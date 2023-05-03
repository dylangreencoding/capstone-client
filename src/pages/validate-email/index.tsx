import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import { validateEmail } from "../../expressAPI/validate-email";
import { logIn } from "../../expressAPI/log-in";

interface Props {
  email: any;
  password: any;
}

export default function ValidateEmail(props: Props) {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");

  const handleValidateEmail = async (e: any) => {
    e.preventDefault();

    const codeData = {
      validationCode: code,
    };
    const data = {
      email: props.email,
      password: props.password,
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
          Validation Code
          <input
            className="auth-input"
            required
            type="text"
            // pattern="[0-9]{6}"
            // maxLength={6}
            title="paste code here"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxMmRjMmE3LWJjNmMtNDAwNy04NTFiLWMzMGViY2RjM2YyOSIsImlhdCI6MTY4MzA4NDA0OCwiZXhwIjoxNjgzMDg0NjQ4fQ.MICk2vPlDkbTgJEOJL9sha2YouCjoRaq98Tp05HPW_U"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <button className="auth-button" type="submit">
          Validate & Login
        </button>
      </form>
    </div>
  );
}
