import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import RaiseDisputeModal from "../../components/common/RaiseDisputeModal";

export default function PostChatPage() {
    const { postId } = useParams();
    // console.log( postId );
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senderName] = useState(() => {
        // Try to load existing senderName for this post
        const storedName = localStorage.getItem(`chat_sender_${postId}`);
        if (storedName) return storedName;

        
        // Generate new name if not found
        const newName = `Anonymous${Math.floor(Math.random() * 9000) + 1000}`;
        localStorage.setItem(`chat_sender_${postId}`, newName);
        return newName;
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const pollingRef = useRef<number | null>(null);

    // Ensure room exists when component mounts
    useEffect(() => {
        const ensureRoom = async () => {
            if (!postId) return;

            try {
                setLoading(true);
                // Try to fetch messages - if room doesn't exist, the message creation will handle it
                await api.getMessages(postId);
                setError("");
            } catch (err) {
                console.error("Room may not exist:", err);
                // Room will be created automatically when first message is sent
                setError("");
            } finally {
                setLoading(false);
            }
        };

        ensureRoom();
    }, [postId]);

    const fetchMessages = async () => {
        if (!postId) return;

        try {
            const data = await api.getMessages(postId);
            setMessages([...data]);
            setError("");
        } catch (e) {
            console.error("Failed to fetch messages:", e);
            // Don't show error on every poll, only set error state silently
        }
    };

    useEffect(() => {
        if (!postId) return;

        fetchMessages();
        pollingRef.current = window.setInterval(fetchMessages, 2000);
        return () => {
            if (pollingRef.current) window.clearInterval(pollingRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    const handleSend = async () => {
        if (!text.trim() || !postId) return;

        try {
            await api.createMessage(postId, senderName, text);
            setText("");
            // Immediately fetch new messages
            await fetchMessages();
            setError("");
        } catch (e) {
            console.error("Failed to send message:", e);
            setError("Failed to send message. Please try again.");
        }
    };

    if (loading && messages.length === 0) {
        return (
            <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
                <h2>Loading chat room...</h2>
            </div>
        );
    }


    if (postId == "" || !postId) return <>Please go to a post chat page</>


    return <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        <div style={{ marginBottom: 16 }}>
            <h2>Anonymous Chat - Room: {postId}</h2>
            <p style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
                You are: <strong>{senderName}</strong> | Share this room ID to let
                others join
            </p>
        </div>

        {error && (
            <div
                style={{
                    padding: 12,
                    marginBottom: 12,
                    backgroundColor: "#fee2e2",
                    color: "#dc2626",
                    borderRadius: 4,
                }}
            >
                {error}
            </div>
        )}

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
                height: 400,
                overflowY: "auto",
                marginBottom: 12,
                backgroundColor: "#f9fafb",
            }}
        >
            {messages.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#666",
                    }}
                >
                    No messages yet. Start the conversation!
                </div>
            ) : (
                messages.map((m) => (
                    <div
                        key={m._id}
                        style={{
                            marginBottom: 12,
                            padding: 8,
                            backgroundColor:
                                m.senderName === senderName ? "#dbeafe" : "#ffffff",
                            borderRadius: 8,
                            border:
                                m.senderName === senderName
                                    ? "1px solid #93c5fd"
                                    : "1px solid #e5e7eb",
                        }}
                    >
                        <div style={{ marginBottom: 4 }}>
                            <strong
                                style={{
                                    color: m.senderName === senderName ? "#1e40af" : "#374151",
                                }}
                            >
                                {m.senderName}
                            </strong>
                            {m.senderName === senderName && (
                                <span
                                    style={{ marginLeft: 8, fontSize: 12, color: "#6b7280" }}
                                >
                                    (You)
                                </span>
                            )}
                        </div>
                        <div style={{ marginBottom: 4, wordBreak: "break-word" }}>
                            {m.text}
                        </div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>
                            {new Date(m.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))
            )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
            <Input
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-background"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
            />
            <Button onClick={handleSend}>
                Send
            </Button>
            <RaiseDisputeModal postId={postId} open={isModalOpen} onOpenChange={setIsModalOpen}/>
            <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
                Raise Dispute
            </Button>

        </div>
    </div>
}
