document.addEventListener('DOMContentLoaded', () => {
  // Typewriter animation
  const typewriter = document.querySelector('.typewriter');
  const names = ["I'm Wicky", "I'm Kiddo"];
  let nameIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    const currentName = names[nameIndex];
    
    if (isDeleting) {
      typewriter.textContent = currentName.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 100;
    } else {
      typewriter.textContent = currentName.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentName.length) {
      typingSpeed = 2000; // Pause at the end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      nameIndex = (nameIndex + 1) % names.length;
      typingSpeed = 500; // Pause before starting new word
    }

    setTimeout(type, typingSpeed);
  }

  type();

  // Create hover effect for nav items
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    item.addEventListener('mouseover', (e) => {
      const letters = item.textContent.split('');
      const animatedText = letters.map((letter, index) => 
        `<span style="animation: letterFloat 0.5s ease ${index * 0.05}s">${letter}</span>`
      ).join('');
      
      const originalText = item.textContent;
      item.innerHTML = animatedText;
      
      setTimeout(() => {
        item.textContent = originalText;
      }, letters.length * 50 + 500);
    });
  });

  // Smooth scroll
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const logo = document.querySelector('.logo');
  
  // Create shimmer effect on logo hover
  logo.addEventListener('mouseover', () => {
    logo.style.animation = 'none';
    logo.offsetHeight; // Trigger reflow
    logo.style.animation = 'gradientFlow 3s ease infinite';
  });

  // Handle mobile menu
  const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
      </svg>
    `;
    
    nav.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    });
  };

  if (window.innerWidth <= 768) {
    createMobileMenu();
  }

  window.addEventListener('resize', () => {
    const existingBtn = document.querySelector('.mobile-menu-btn');
    if (window.innerWidth <= 768 && !existingBtn) {
      createMobileMenu();
    } else if (window.innerWidth > 768 && existingBtn) {
      existingBtn.remove();
    }
  });

  function showProjectPermissionModal(projectUrl) {
    const permissionModal = document.createElement('div');
    permissionModal.classList.add('permission-modal');
    
    permissionModal.innerHTML = `
      <div class="permission-content">
        <h3>Project Viewing Permission Required</h3>
        <p>This project requires permission from the owner to view.</p>
        <p>Would you like to request viewing rights?</p>
        <div class="permission-buttons">
          <a href="mailto:marketingwycon@gmail.com?subject=Project Viewing Permission Request&body=Hello, I would like to request permission to view the project at: ${projectUrl}" class="request-btn">Request Permission</a>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(permissionModal);

    const cancelBtn = permissionModal.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
      permissionModal.remove();
    });
  }

  // Add project permission handling
  const projectLinks = document.querySelectorAll('.view-project-btn');
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectUrl = link.getAttribute('href');
      showProjectPermissionModal(projectUrl);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes letterFloat {
      0% { transform: translateY(0); opacity: 1; }
      50% { transform: translateY(-10px); opacity: 0.8; }
      100% { transform: translateY(0); opacity: 1; }
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: #333;
      cursor: pointer;
      padding: 5px;
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }
    }
  `;
  document.head.appendChild(style);

  // Add payment triggers to rate table rows
  const rateTable = document.querySelector('.rate-table');
  if (rateTable) {
    const rows = rateTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const priceCell = row.querySelector('td:nth-child(2)');
      const packageCell = row.querySelector('td:first-child');
      
      if (priceCell && priceCell.textContent.includes('Ksh')) {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
          const amount = priceCell.textContent.match(/\d+,?(\d+)?/)[0].replace(',', '');
          handlePayment(packageCell.textContent, amount);
        });
      }
    });
  }
});

function generateBackgroundAnimation() {
  const heroSection = document.querySelector('.hero');
  const animatedBg = document.createElement('div');
  animatedBg.classList.add('animated-bg');

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");

  const colors = ['#FF6B6B', '#FFD700', '#4ECDC4', '#FF9F1C', '#A8E6CE', '#F06292', '#BA68C8', '#673AB7', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];

  for(let i = 0; i < 5; i++) {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.setAttribute("cx", Math.random() * 100);
    shape.setAttribute("cy", Math.random() * 100);
    shape.setAttribute("r", Math.random() * 10 + 5);
    shape.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
    shape.classList.add('shape');
    if(i == 1) {
      shape.classList.add('shape-2')
    } else if (i == 2) {
      shape.classList.add('shape-3')
    }

    svg.appendChild(shape);
  }
  animatedBg.appendChild(svg);
  heroSection.appendChild(animatedBg);
  createShatterEffect(heroSection)
}

function createShatterEffect(container) {
  const shatterDiv = document.createElement('div');
  shatterDiv.classList.add('shatter');
  container.appendChild(shatterDiv)
  const pieces = 50;

  for(let i = 0; i < pieces; i++) {
    const piece = document.createElement('div');
    piece.classList.add('shatter-piece');
    const size = Math.random() * 10 + 5
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    piece.style.left = `${x}%`;
    piece.style.top = `${y}%`;
    const destinationX = (Math.random() - 0.5) * 500
    const destinationY = (Math.random() - 0.5) * 500
    const rotate = Math.random() * 360 - 180
    const scale = Math.random() * 2 + 1;

    piece.style.setProperty('--x', `${destinationX}px`)
    piece.style.setProperty('--y', `${destinationY}px`)
    piece.style.setProperty('--rotate', `${rotate}deg`)
    piece.style.setProperty('--scale', scale)
    shatterDiv.appendChild(piece);
  }
  setTimeout(() => {
    shatterDiv.remove()
  }, 3000)
}

function playBackgroundMusic() {
  const audio = new Audio('https://file-examples.com/storage/fe83623805841626e34b7a4/2017/11/file_example_MP3_700KB.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  audio.play()
    .catch(error => {
      console.error("Autoplay failed: ", error);
      // Optional: Show a button to allow user to manually play the audio
    });
}

function createRoadSimulation() {
  const heroSection = document.querySelector('.hero');
  const roadSimulation = document.createElement('div')
  roadSimulation.classList.add('road-simulation')

  const road = document.createElement('div')
  road.classList.add('road')
  roadSimulation.appendChild(road)

  const car = document.createElement('div')
  car.classList.add('car')
  roadSimulation.appendChild(car)

  const towns = ["Mombasa", "Nairobi", "Kisumu", "Kajiado", "Kapsabet", "Kakamega"]
  towns.forEach((town, index) => {
    const townElement = document.createElement('div')
    townElement.textContent = town
    townElement.classList.add('town', `town-${index + 1}`)
    const townMessage = document.createElement('div');
    townMessage.classList.add('town-message');
    townMessage.textContent = `Welcome to ${town}!`
    townElement.appendChild(townMessage)
    const flag = document.createElement('div')
    flag.classList.add('town-flag')
    flag.addEventListener('click', () => {
      townMessage.classList.add('show');
      setTimeout(() => {
        townMessage.classList.remove('show')
      }, 3000)
    })
    townElement.appendChild(flag)
    roadSimulation.appendChild(townElement)
  })

  heroSection.appendChild(roadSimulation);

  const carElement = document.querySelector('.car');
  const townElements = document.querySelectorAll('.town');

  function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show')
      }
    })
  }, { threshold: 0.8 });

  townElements.forEach(town => {
    observer.observe(town)
  });

  const roadPath = document.querySelector('.road').getAttribute('clip-path');

  const extractPathCoords = (path) => {
    if (!path) return [];

    const parts = path.match(/([MC]\s[\d\s.,-]+)/g);
    if(!parts) return []
    const coords = parts.reduce((acc, part) => {
      const [type, ...points] = part.split(/\s+/);
      const pairs = points.filter(val => val !== '').map(Number)
      for(let i = 0; i < pairs.length; i += 2) {
        acc.push({x: pairs[i], y: pairs[i + 1]})
      }
      return acc
    }, [])
    return coords
  }

  const pathCoords = extractPathCoords(roadPath)
  if(!pathCoords || pathCoords.length === 0) {
    console.error("Path coordinates are invalid or empty:", pathCoords)
    return;
  }

  function animateCarAlongPath() {
    let progress = 0;
    const animationDuration = 25000; // Duration in milliseconds

    function updateCarPosition() {
      if (progress >= 1) return;

      const currentPointIndex = Math.floor(progress * (pathCoords.length - 1));
      const nextPointIndex = Math.min(currentPointIndex + 1, pathCoords.length - 1)

      const t = (progress * (pathCoords.length - 1)) % 1;

      const currentPoint = pathCoords[currentPointIndex]
      const nextPoint = pathCoords[nextPointIndex]

      const x = currentPoint.x + (nextPoint.x - currentPoint.x) * t;
      const y = currentPoint.y + (nextPoint.y - currentPoint.y) * t
      carElement.style.left = `${x/12}%`
      carElement.style.top = `${y / 1.5 + 30}%`;
      progress += 1 / (animationDuration / 16)
      requestAnimationFrame(updateCarPosition);
    }
    updateCarPosition()
  }
  animateCarAlongPath()
}

function handlePayment(packageName, amount) {
  const paymentModal = document.createElement('div');
  paymentModal.classList.add('payment-modal');
  
  paymentModal.innerHTML = `
    <div class="payment-content">
      <h3>Select Payment Method for ${packageName}</h3>
      <p class="package-amount">Amount: KSH ${amount}</p>
      <div class="payment-options">
        <button class="mpesa-btn">Pay with M-PESA</button>
        <button class="crypto-btn">Pay with Cryptocurrency</button>
      </div>
      <button class="close-modal">×</button>
    </div>
  `;

  document.body.appendChild(paymentModal);

  const closeBtn = paymentModal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    paymentModal.remove();
  });

  const mpesaBtn = paymentModal.querySelector('.mpesa-btn');
  mpesaBtn.addEventListener('click', () => {
    showMpesaInstructions(packageName, amount);
  });

  const cryptoBtn = paymentModal.querySelector('.crypto-btn');
  cryptoBtn.addEventListener('click', () => {
    showCryptoInstructions(packageName, amount);
  });
}

function showMpesaInstructions(packageName, amount) {
  const mpesaModal = document.createElement('div');
  mpesaModal.classList.add('payment-modal');
  
  mpesaModal.innerHTML = `
    <div class="payment-content">
      <h3>M-PESA Payment Instructions</h3>
      <div class="mpesa-details">
        <p>Please follow these steps:</p>
        <ol>
          <li>Go to M-PESA on your phone</li>
          <li>Select Pay Bill</li>
          <li>Enter Business Number: <strong>714777</strong></li>
          <li>Enter Account Number: <strong>0759015580</strong></li>
          <li>Enter Amount: <strong>KSH ${amount}</strong></li>
          <li>Enter your M-PESA PIN and confirm</li>
        </ol>
        <p class="waiting-text">Waiting for payment confirmation...</p>
        <p class="timeout-text">If confirmation takes too long, please email your transaction details to:</p>
        <a href="mailto:marketingwycon@gmail.com" class="email-link">marketingwycon@gmail.com</a>
      </div>
      <button class="close-modal">×</button>
    </div>
  `;

  document.body.appendChild(mpesaModal);

  const closeBtn = mpesaModal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    mpesaModal.remove();
  });

  // Add timeout message after 2 minutes
  setTimeout(() => {
    const waitingText = mpesaModal.querySelector('.waiting-text');
    if (waitingText) {
      waitingText.style.color = '#ff6b6b';
      waitingText.textContent = 'Payment taking longer than expected. Please email your transaction details.';
    }
  }, 120000);
}

function showCryptoInstructions(packageName, amount) {
  const cryptoModal = document.createElement('div');
  cryptoModal.classList.add('payment-modal');
  
  cryptoModal.innerHTML = `
    <div class="payment-content">
      <h3>Cryptocurrency Payment</h3>
      <p>Please contact us at marketingwycon@gmail.com for cryptocurrency payment instructions.</p>
      <button class="close-modal">×</button>
    </div>
  `;

  document.body.appendChild(cryptoModal);

  const closeBtn = cryptoModal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    cryptoModal.remove();
  });
}

generateBackgroundAnimation();
playBackgroundMusic();
createRoadSimulation()

const rateButton = document.querySelector('.rate-btn');
rateButton.addEventListener('click', () => {
  document.querySelector('#rate-card').scrollIntoView({
    behavior: 'smooth'
  });
})

const heroImage = document.querySelector('.hero-image')
const triangle = document.createElement('div')
triangle.classList.add('triangle')
heroImage.innerHTML = ''
heroImage.appendChild(triangle)
