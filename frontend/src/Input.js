import React, { useState } from 'react';

function Input() {
    const [inputs, setInputs] = useState({
        email: '',
        nickname: ''
    });

    const { email, nickname } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    console.log(inputs)

    return (
        <div>
            이메일주소: <input name="email" placeholder="이메일 주소" onChange={onChange} value={email}/>
            <br />
            닉네임: <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <br />

            <button>채용정보 무료로 구독하기</button>
        </div>
    );

}

export default Input;