import React from 'react'
import { useState, Link, useNavigate } from 'react';

export default function Join() {
    const Signup = () => {
      const [email, setEmail] = useState("");
      const [username, setUsername] = useState("");
      const [userNickname, setUserNickname] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [role, setRole] = useState("");
      
        const navigate = useNavigate();
      
        const handleSignup = async (event) => {
          event.preventDefault();
      
          // 회원가입 처리 로직을 구현합니다.
      
          // Check if passwords match
          if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
          }
      
          // Create payload - 회원가입에 필요한 정보
          const payload = {
            email: email,
            password: password,
            nickname: userNickname,
            name: username,
            phone: phoneNumber,
            role: role,
          };

      //회원가입을 위한 서버 통신(fetch)
          try {
            const response = await fetch(
              "요청지 주소",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );
      
            const data = await response.json();
      
            if (response.status === 201) {
              // Redirect to login.html
              console.log("성공! 이메일주소: " + data.email);
              navigate("/login"); // 로그인 성공시 홈으로 이동합니다.
            } else if (response.status === 400) {
              // Handle error
              alert(`회원가입 실패: ${data.email}`);
            }
          } catch (error) {
            console.error("오류 발생:", error);
          }
        };
      
        return (
          <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
              <h1>On&Off</h1>
      
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
      
              <label htmlFor="username">사용자명</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
      
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                value={userNickname}
                onChange={(e) => setUserNickname(e.target.value)}
              />
      
              <label htmlFor="phone-number">전화번호</label>
              <input
                type="text"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
      
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
      
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
      
              <div className="role-selection">
                <label>회원 유형</label>
                <div>
                  <input
                    type="radio"
                    id="customer"
                    value="user"
                    checked={role === "user"}
                    onChange={() => setRole("user")}
                  />
                  <label htmlFor="customer">고객</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="seller"
                    value="seller"
                    checked={role === "seller"}
                    onChange={() => setRole("seller")}
                  />
                  <label htmlFor="seller">판매자</label>
                </div>
              </div>
      
              <button id="signup-button" onClick={handleSignup}>
                회원가입
              </button>
      
              <p className="login-link">
                이미 회원이신가요? <Link to="/login">로그인</Link>
              </p>
            </form>
          </div>
        );
      };
}
