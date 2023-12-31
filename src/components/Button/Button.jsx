import PropTypes from 'prop-types'

import { ButtonWraper, LoadMoreBtn } from "./Button.styled";

export  const Button = ({onClick}) => {

  return(
    <ButtonWraper>
        <LoadMoreBtn type="button" onClick= { () => onClick() }>
          Load more
        </LoadMoreBtn>
    </ButtonWraper>
  )
};


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};