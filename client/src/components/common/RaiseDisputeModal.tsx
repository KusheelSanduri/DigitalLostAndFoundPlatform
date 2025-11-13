import {useState} from "react";
import {Button} from "../ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter} from "../ui/dialog";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";

interface RaiseDisputeModalProps {
	postId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function RaiseDisputeModal({postId, open, onOpenChange}: RaiseDisputeModalProps) {
	const [reason, setReason] = useState("");
	const [description, setDescription] = useState("");

	const handleRaiseDispute = () => {
		if (!reason.trim()) {
			alert("Please enter a reason for the dispute.");
			return;
		}

		console.log({
			reason,
			description,
		});

		// TODO: Integrate with backend API here
		// e.g., axios.post('/api/disputes', { reason, description })

		onOpenChange(false);
		setReason("");
		setDescription("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Raise a Dispute</DialogTitle>
					<DialogTitle>Post Id: {postId}</DialogTitle>
					<DialogDescription>Please provide the details for your dispute below.</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 mt-3 ">
					<div className="space-y-2">
						<Label htmlFor="reason">Reason</Label>
						<Input
							id="reason"
							placeholder="Enter reason"
							value={reason}
							onChange={(e) => setReason(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Describe your issue..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>

				<DialogFooter className="mt-6 flex justify-end gap-3">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleRaiseDispute}>Raise Dispute</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
