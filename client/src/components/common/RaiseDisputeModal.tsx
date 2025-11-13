import {useState, useTransition} from "react";
import {Button} from "../ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter} from "../ui/dialog";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {disputeApi} from "../../api/disputeApi";
import {toast} from "sonner";

interface RaiseDisputeModalProps {
	postId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function RaiseDisputeModal({postId, open, onOpenChange}: RaiseDisputeModalProps) {
	const [reason, setReason] = useState("");
	const [description, setDescription] = useState("");
	const [isPending, startTrasition] = useTransition();

	const handleRaiseDispute = () => {
		if (!reason.trim()) {
			toast.error("Please enter a reason for the dispute.");
			return;
		}
		if (!description.trim()) {
			toast.error("Please enter a description for the dispute.");
			return;
		}

		startTrasition(async () => {
			try {
				await disputeApi.createDispute(postId, reason, description);
				onOpenChange(false);
				setReason("");
				setDescription("");
				toast.error("Dispute raised successfully.");
			} catch {
				toast.error("Failed to create a dispute. Please try again");
			}
		});
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
							disabled={isPending}
							onChange={(e) => setReason(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Describe your issue..."
							value={description}
							disabled={isPending}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>

				<DialogFooter className="mt-6 flex justify-end gap-3">
					<Button variant="outline" disabled={isPending} onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={handleRaiseDispute} disabled={isPending}>
						Raise Dispute
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
