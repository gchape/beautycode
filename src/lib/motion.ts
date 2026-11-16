export const cinematicEase = [0.22, 1, 0.36, 1] as const;

export const hoverTransition = {
	type: "spring" as const,
	stiffness: 300,
	damping: 30,
	mass: 0.7,
};

export const revealTransition = {
	duration: 0.3,
	ease: cinematicEase,
};
