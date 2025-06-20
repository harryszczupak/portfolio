const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const overlay = document.querySelector('.cursor-overlay');
let timeout;

if (!overlay) {
	console.error('Element .cursor-overlay nie znaleziony!');
}

document.addEventListener('mousemove', (e) => {
	const x = e.clientX;
	const y = e.clientY;

	overlay.style.backgroundImage = `
  radial-gradient(circle 60px at ${x}px ${y}px, rgba(26,188,156,0.3), transparent 50%)
`;

	clearTimeout(timeout);
	timeout = setTimeout(() => {
		overlay.style.backgroundImage = '';
	}, 800);
});

burger.addEventListener('click', () => {
	nav.classList.toggle('active');
	burger.classList.toggle('toggle');
});
const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const appearOnScroll = new IntersectionObserver(function (
	entries,
	appearOnScroll
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.add('is-visible');
		appearOnScroll.unobserve(entry.target);
	});
},
appearOptions);

faders.forEach((fader) => {
	appearOnScroll.observe(fader);
});

document.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 }
	);

	document
		.querySelectorAll('.card, .bonus')
		.forEach((el) => observer.observe(el));
});
