import Lottie from 'react-lottie';
import * as animationData from '../assets/loader.json';
import { Container } from './style';

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <Container>
      <Lottie options={defaultOptions} height={500} width={500} />
      <h1>Aguarde</h1>
    </Container>
  );
}

export default Loader;
