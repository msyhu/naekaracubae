import React, { useState } from 'react';

function Input() {
    const axios = require('axios');
    const [count, setCount] = useState(0);
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

    const submitSubscribe = async() => {
        if (inputs.email === '') {
           alert('email 을 입력해 주세요');
           return;
        }
        else if (inputs.nickname === '') {
            alert('nickname 을 입력해 주세요');
            return;
        }

        const response = await axios.post('http://localhost:8089/users',
            {email: inputs.email, name: inputs.nickname}
        );

        console.log(response);

        if (response.status === 200) {
            alert("등록 성공!");
            setInputs({
                email: '',
                nickname: ''
            });
            return;
        }
        else {
            alert("등록 실패");
            return;
        }

    }

    console.log(inputs)

    return (
        <div>
            이메일주소: <input name="email" placeholder="이메일 주소" onChange={onChange} value={email}/>
            <br />
            닉네임: <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <br />

            <button onClick={submitSubscribe}>채용정보 무료로 구독하기</button>
            <div>총 {count} 분이 채용정보를 구독하고 계십니다.</div>
        </div>
    );

}

export default Input;