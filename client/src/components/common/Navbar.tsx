import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function Navbar() {
	return (
		<header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 h-[70px]">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
						<Search className="w-4 h-4 text-primary-foreground" />
					</div>
					<span className="font-bold text-xl text-foreground">
						NITC Lost & Found
					</span>
				</div>
				<nav className="hidden md:flex items-center gap-6">
					<Link
						to="/posts"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						Browse Items
					</Link>
					<Link
						to="/about"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						About
					</Link>
					<Link
						to="/contact"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						Contact
					</Link>
				</nav>
				<div className="flex items-center gap-3">
					<Link to="/login">
						<Button variant="ghost">Login</Button>
					</Link>
					<Link to="/register">
						<Button>Get Started</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}
