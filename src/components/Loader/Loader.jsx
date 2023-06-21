import { Blocks } from "react-loader-spinner";
import { Overlay } from "./Loader.styled";

export const Loader = () => {
  return (
    <Overlay >
      <Blocks
        visible={true}
        height="280"
        width="280"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </Overlay>
      
  )
}
