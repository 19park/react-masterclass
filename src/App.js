import styled, {keyframes} from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`;
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0;
  }
`;
const Emoji = styled.span`
  font-size: 36px;
`;
const Box = styled.div`
  background-color: tomato;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 60px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>★</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;