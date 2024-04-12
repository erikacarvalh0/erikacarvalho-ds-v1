import { useState } from "react"

export const useHeader = () => {
    const currentPage = window.location.pathname;
	const isHome =  currentPage == "/"

    const [ isOpen, setIsOpen ] = useState(false);

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    }
    return {
        isHome,
        isOpen,
        toggleDialog
    }
}