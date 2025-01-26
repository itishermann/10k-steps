interface Props {
	title: string;
}

export function SocialMediaImageBase({ title }: Props) {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #6710C2 0%, #FC0388 100%)",
				fontFamily: "Poppins, sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "20px",
					padding: "40px",
					maxWidth: "90%",
				}}
			>
				<h1
					style={{
						fontSize: 60,
						fontWeight: "bold",
						color: "#ffffff",
						marginBottom: "20px",
						textAlign: "center",
					}}
				>
					{title}
				</h1>
				<p
					style={{
						fontSize: 28,
						color: "#f0f0f0",
						marginBottom: "30px",
						textAlign: "center",
					}}
				>
					Generate personalized walking routes to achieve your daily step goals!
				</p>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						width: "100%",
						marginBottom: "30px",
					}}
				>
					{[
						"🗺 Interactive Map",
						"📂 GPX Export",
						"🚶 Personalized Routes",
						"💾 Offline Storage",
					].map((feature, index) => (
						<div
							key={index}
							style={{
								fontSize: 20,
								color: "#ffffff",
								textAlign: "center",
								padding: "0 10px",
							}}
						>
							{feature}
						</div>
					))}
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "20px",
					}}
				>
					<span style={{ fontSize: 48, marginRight: "10px" }}>🚶</span>
					<span
						style={{
							marginLeft: "10px",
							fontSize: 24,
							fontWeight: "bold",
							color: "#ffffff",
						}}
					>
						Get Started Now!
					</span>
				</div>
				<p style={{ fontSize: 20, color: "#ffffff", marginBottom: "10px" }}>
					🔗 10k-steps.itishermann.me
				</p>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
						<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
					</svg>
					<span style={{ fontSize: 18, color: "#f0f0f0" }}>
						itishermann/10k-steps
					</span>
				</div>
				<div
					style={{
						fontSize: 16,
						color: "#f0f0f0",
					}}
				>
					By Hermann Kao | Open Source | MIT License
				</div>
			</div>
		</div>
	);
}
