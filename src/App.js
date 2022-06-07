import styled from 'styled-components'

const Father = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;
const Circle = styled(Box)`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const Btn = styled.button`
  color: #fff;
  background-color: green;
  border-radius: 15px;
  padding: 2px 5px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal"/>
      <Circle bgColor="tomato"/>

      <Btn>Login</Btn>
      <Btn as="a" href="#">Login</Btn>
    </Father>
  );
}

export default App;