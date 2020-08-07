import styled from 'styled-components'

export const CardList = styled.ul`
  list-style: none;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 3fr);
`

export const SingleCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 130px;
  border: 1px solid #000000;
  border-radius: 4px;
  margin: 5px;
`