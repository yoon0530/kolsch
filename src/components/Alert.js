import React from 'react' //React 라이브러리를 사용하는 JavaScript 파일에서 React를 가져오는 구문

function Alert(props) { //Alert(사용자에게 중요한 메세지를 전달하는데 사용)를 정의하고
                        //props라는 매개변수를 통해 부모 컴포넌트로부터 전달된 속성(properties)을 받을 수 있게 함
    const capitalize=(word)=>{  //word라는 문자열을 입력으로 받음
      if (word==='danger'){ //입력된 단어가 danger이라면
        word='error'        //error로 변경
      }
        const lower=word.toLowerCase(); //입력된 단어를 모두 소문자로 변환
        return lower.charAt(0).toUpperCase() + lower.slice(1);
        //lower.charAt(0).toUpperCase(): 소문자로 변환된 단어의 첫 글자를 대문자로 변환
        //lower.slice(1): 첫 글자를 제외한 나머지 부분은 그대로 가져옴
    }
  return (
            <div style={{height:'50px'}} >

            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                 <strong>{capitalize(props.alert.type)} </strong> {props.alert.mssg}
                
            </div>}
            </div>
            
  )
}

export default Alert
