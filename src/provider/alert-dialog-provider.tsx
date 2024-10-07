"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type AlertType = "confirm" | "delete";

interface AlertDialogContextValue {
	showAlert: {
		confirm: (description: ReactNode, onConfirm: () => void) => void;
		delete: (description: ReactNode, onDelete: () => void) => void;
	};
	closeAlert: () => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(
	undefined,
);

export const useAlertDialog = (): AlertDialogContextValue => {
	const context = useContext(AlertDialogContext);
	if (!context) {
		throw new Error(
			"useAlertDialog must be used within an AlertDialogProvider",
		);
	}
	return context;
};

interface AlertDialogProviderProps {
	children: ReactNode;
}

export const AlertDialogProvider = ({ children }: AlertDialogProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [alertType, setAlertType] = useState<AlertType | null>(null);
	const [description, setDescription] = useState<ReactNode>(null);
	const [callback, setCallback] = useState<(() => void) | null>(null);

	const closeAlert = useCallback(() => {
		setIsOpen(false);
		setAlertType(null);
		setDescription(null);
		setCallback(null);
	}, []);

	const showConfirm = useCallback(
		(description: ReactNode, onConfirm: () => void) => {
			setAlertType("confirm");
			setDescription(description);
			setCallback(() => () => {
				onConfirm();
				closeAlert();
			});
			setIsOpen(true);
		},
		[closeAlert],
	);

	const showDelete = useCallback(
		(description: ReactNode, onDelete: () => void) => {
			setAlertType("delete");
			setDescription(description);
			setCallback(() => () => {
				onDelete();
				closeAlert();
			});
			setIsOpen(true);
		},
		[closeAlert],
	);

	const getActionText = useCallback(() => {
		switch (alertType) {
			case "delete":
				return "Delete";
			case "confirm":
				return "Confirm";
			default:
				return "Confirm";
		}
	}, [alertType]);

	return (
		<AlertDialogContext.Provider
			value={{
				showAlert: { confirm: showConfirm, delete: showDelete },
				closeAlert,
			}}
		>
			{children}
			<AlertDialog onOpenChange={setIsOpen} open={isOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogDescription>{description}</AlertDialogDescription>
					<AlertDialogFooter>
						<AlertDialogAction onClick={callback || closeAlert}>
							{getActionText()}
						</AlertDialogAction>
						<AlertDialogCancel onClick={closeAlert}>Cancel</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AlertDialogContext.Provider>
	);
};
