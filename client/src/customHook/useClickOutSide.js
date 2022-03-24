import { useEffect } from 'react';

function useClickOutSide(handleClick) {
    useEffect(() => {
        window.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('mousedown', handleClick);
        }
    })
}

export default useClickOutSide;
