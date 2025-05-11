import React, { useEffect, useState } from 'react';

const User = {
  email: 'test@example.com',
  pw: 'test1234@@@'
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  // 에러 메시지 상태 추가
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorMessage(''); // 입력할 때마다 에러 메시지 초기화
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    setErrorMessage(''); // 입력할 때마다 에러 메시지 초기화
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 예외 처리 추가
  const onClickConfirmButton = () => {
    try {
      // 1. 입력값 최종 검증
      if (!emailValid) {
        setErrorMessage('올바른 이메일을 입력해주세요.');
        return;
      }
      if (!pwValid) {
        setErrorMessage('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.');
        return;
      }

      // 2. 로그인 시도
      if (email === User.email && pw === User.pw) {
        alert('로그인에 성공했습니다.');
        setErrorMessage('');
      } else {
        setErrorMessage('등록되지 않은 회원이거나 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      // 3. 예기치 못한 에러 처리
      setErrorMessage('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>

      {/* 최종 에러 메시지 표시 */}
      {errorMessage && (
        <div className="errorMessageWrap" style={{ color: 'red', marginTop: 10 }}>
          {errorMessage}
        </div>
      )}

      <div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>
    </div>
  );
}
