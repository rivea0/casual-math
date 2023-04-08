import { createContext } from 'react';

const initialTextState = ['1. Select an option', '2. Type the equation', '3. Click enter (⏎) to get the result'];
const Context = createContext(initialTextState);
export default Context;
