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
		.querySelectorAll('.card, .bonus, .skills-section, .edu-exp-section')
		.forEach((el) => observer.observe(el));
	const dots = document.querySelectorAll('.dot');

	const contents = document.querySelectorAll('.edu-exp-section .content > div');
	const labels = {
		education: document.getElementById('label-education'),
		experience: document.getElementById('label-experience'),
	};

	dots.forEach((dot) => {
		dot.addEventListener('click', () => {
			const target = dot.dataset.target;

			// Przełącz kropki
			dots.forEach((d) => d.classList.remove('active'));
			dot.classList.add('active');

			// Przełącz treść
			contents.forEach((content) => {
				content.classList.remove('active');
			});
			document
				.querySelector(`.edu-exp-section .${target}`)
				.classList.add('active');

			// Przełącz etykiety
			Object.keys(labels).forEach((key) => {
				labels[key].classList.remove('active');
			});
			labels[target].classList.add('active');
		});
	});
	const sectionIds = ['about', 'experience', 'projects', 'contact'];
	const navDots = document.querySelectorAll('.side-nav .nav-dot');
	let isClickScrolling = false;

	function updateActiveDot() {
		if (isClickScrolling) return; // ignoruj scroll podczas kliknięcia i smooth scrollowania

		let activeIndex = 0;
		for (let i = 0; i < sectionIds.length; i++) {
			const section = document.getElementById(sectionIds[i]);
			if (!section) continue;
			const rect = section.getBoundingClientRect();
			if (rect.top <= window.innerHeight / 2) {
				activeIndex = i;
			} else {
				break;
			}
		}

		navDots.forEach((dot) => dot.classList.remove('active'));
		if (navDots[activeIndex]) navDots[activeIndex].classList.add('active');
	}

	window.addEventListener('scroll', updateActiveDot);
	updateActiveDot();

	navDots.forEach((dot, index) => {
		dot.addEventListener('click', (e) => {
			e.preventDefault();

			isClickScrolling = true; // blokuj updateActiveDot na scroll przez chwilę

			navDots.forEach((d) => d.classList.remove('active'));
			dot.classList.add('active'); // natychmiast ustaw aktywną kropkę

			const section = document.getElementById(sectionIds[index]);
			if (!section) return;

			section.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});

			// Po 700ms (czas scrolla) znów zezwól na aktualizację aktywnej kropki na scroll
			setTimeout(() => {
				isClickScrolling = false;
				updateActiveDot(); // wymuś update po scrollu
			}, 700);
		});
	});
	document.querySelectorAll('.nav-links a').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			const id = link.getAttribute('href').substring(1);
			const target = document.getElementById(id);

			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: id === 'experience' ? 'end' : 'center',
				});
			}
		});
	});
});
const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const skill = entry.target;
				const percentage = parseInt(skill.getAttribute('data-percentage'), 10);
				const progressCircle = skill.querySelector('.progress');
				const percentageText = skill.querySelector('.percentage');

				const radius = 110;
				const circumference = 2 * Math.PI * radius;

				progressCircle.style.strokeDasharray = circumference;
				progressCircle.style.strokeDashoffset = circumference;

				let current = 0;
				const duration = 1500;
				const steps = 120;
				const increment = percentage / steps;

				const animate = () => {
					current += increment;
					if (current > percentage) current = percentage;

					const offset = circumference * (1 - current / 100);
					progressCircle.style.strokeDashoffset = offset;
					percentageText.textContent = Math.round(current) + '%';

					if (current < percentage) {
						requestAnimationFrame(animate);
					}
				};

				requestAnimationFrame(animate);

				// Odłącz obserwator po uruchomieniu animacji, żeby nie odpalała się ponownie
				observer.unobserve(skill);
			}
		});
	},
	{
		threshold: 0.3, // oznacza, że 30% elementu musi być w widoku, żeby uruchomić
	}
);

// Obserwujemy wszystkie elementy .skill
document.querySelectorAll('.skill').forEach((skill) => {
	observer.observe(skill);
});
