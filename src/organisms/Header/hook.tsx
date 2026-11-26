import { useRef, useState } from "react"

export const useHeader = () => {
    const currentPage = window.location.pathname;
	const isHome =  currentPage == "/"
    const inputRef = useRef<HTMLInputElement>(null)
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    const [ isOpen, setIsOpen ] = useState(false);

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    }

    const onChangeMenu = ({ target }: { target: HTMLInputElement }) => {
        setIsMenuOpen(target.checked)
    }

    const openMenu = () => {
        if (inputRef?.current) {
            inputRef.current.checked = true
            setIsMenuOpen(true)
        }
    }

    const closeMenu = () => {
        if (inputRef?.current) {
            inputRef.current.checked = false
            setIsMenuOpen(false)
        }
    }

    return {
        isMenuOpen,
        isHome,
        isOpen,
        onChangeMenu,
        toggleDialog,
        openMenu,
        closeMenu,
        inputRef
    }
}