import { useEffect, useRef, useState } from "react";
import { iDialogHook, iObject } from "../../interfaces/molecules";

export const useDialog = ({ isOpen, toggleDialog }: iDialogHook) => {
	const dialogRef = useRef();
	const [mustHide, setMustHide] = useState(false);

	const themeTitle: iObject = {
		success: "Deu tudo certo!",
		errror: "Algo deu errado",
	}

	const themeText: iObject = {
		success: "Deu tudo certo!",
		errror: "Algo deu errado",
	}

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen]);

	const removeAnimationDialog = () => {
		setMustHide(false);
		
		if (toggleDialog) toggleDialog();
		
		dialogRef?.current?.removeEventListener('webkitAnimationEnd', removeAnimationDialog, false);
	}

	const closeDialog = () => {
		setMustHide(true);
		dialogRef?.current?.addEventListener('webkitAnimationEnd', removeAnimationDialog, false);
	}

    return {
        dialogRef,
		mustHide,
		closeDialog, 
		themeTitle,
		themeText
    }
}