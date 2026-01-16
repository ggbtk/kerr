// 헤더 스크롤 효과
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 확인
});

// 부드러운 스크롤 (내비게이션 앵커 링크)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #으로 시작하는 앵커 링크만 처리
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// FAQ 아코디언
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 현재 아이템이 이미 활성화되어 있는지 확인
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 아이템 닫기 (선택사항 - 원하면 한 개만 열리도록)
            // faqItems.forEach(faq => faq.classList.remove('active'));
            
            // 클릭한 아이템 토글
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// 팝업 기능
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popupClose');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    const popupHideToday = document.getElementById('popupHideToday');
    const STORAGE_KEY = 'popup_hide_until';
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24시간을 밀리초로

    // 로컬스토리지에서 숨김 여부 확인
    function shouldShowPopup() {
        const hideUntil = localStorage.getItem(STORAGE_KEY);
        if (!hideUntil) {
            return true;
        }
        
        const hideUntilTime = parseInt(hideUntil, 10);
        const now = Date.now();
        
        // 숨김 기간이 지났으면 팝업 표시
        return now > hideUntilTime;
    }

    // 팝업 표시
    function showPopup() {
        if (shouldShowPopup()) {
            popup.classList.add('show');
            // 팝업이 열려도 스크롤 가능하도록 overflow 제거
        }
    }

    // 팝업 숨기기
    function hidePopup() {
        popup.classList.remove('show');
    }

    // 1일 동안 보지 않기
    function hideForOneDay() {
        const now = Date.now();
        const hideUntil = now + ONE_DAY_MS;
        localStorage.setItem(STORAGE_KEY, hideUntil.toString());
        hidePopup();
    }

    // 닫기 버튼 클릭 이벤트
    popupClose.addEventListener('click', hidePopup);
    popupCloseBtn.addEventListener('click', hidePopup);

    // 1일 동안 보지 않기 버튼 클릭 이벤트
    popupHideToday.addEventListener('click', hideForOneDay);

    // 팝업 오버레이 클릭 시 닫기 (팝업 컨테이너 클릭은 제외)
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hidePopup();
        }
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            hidePopup();
        }
    });

    // 페이지 로드 시 팝업 표시
    // 약간의 딜레이를 주어 페이지 로딩 완료 후 표시
    setTimeout(showPopup, 500);
});

// 리뷰 슬라이더 기능
document.addEventListener('DOMContentLoaded', function() {
    const reviewSlider = document.getElementById('reviewSlider');
    const reviewDots = document.getElementById('reviewDots');
    
    if (!reviewSlider || !reviewDots) return;

    // 랜덤 이름 목록
    const names = [
        '김민준', '이서연', '박지우', '최서현', '정도현',
        '강예준', '윤채원', '임하준', '한소율', '오지훈',
        '신지아', '백준서', '류수빈', '조현우', '안예린',
        '송민성', '홍서진', '양도윤', '배수아', '전우진'
    ];

    // 랜덤 리뷰 내용 목록
    const reviewTexts = [
        '상품권 매입 서비스가 정말 만족스러워요. 빠른 상담과 투명한 절차로 편하게 이용했습니다.',
        '24시간 상담 가능해서 새벽에도 문의드릴 수 있어서 좋았어요. 친절한 안내 감사합니다.',
        '처음 이용해봤는데 절차가 간단하고 빠르게 처리해주셔서 매우 만족합니다. 추천드려요!',
        '다른 곳보다 수수료가 합리적이고 서비스도 훌륭합니다. 다음에도 이용하겠습니다.',
        '문자 상담이 정말 편리했어요. 자세하고 친절하게 답변해주셔서 신뢰가 갑니다.',
        '상품권 종류가 다양해서 좋았어요. 무엇이든 상담 가능하다는 점이 큰 장점입니다.',
        '처음에는 걱정이 많았는데 상담 받고 나니 안심이 되었어요. 정말 추천합니다!',
        '빠른 응답과 정확한 안내 덕분에 시간 낭비 없이 바로 진행할 수 있었습니다.',
        '직원분들이 정말 친절하시고 전문적이세요. 믿고 맡길 수 있는 서비스입니다.',
        '온라인으로 간단하게 상담받고 바로 진행할 수 있어서 편리했어요. 좋은 서비스입니다.'
    ];

    // 랜덤 날짜 생성 (최근 30일 이내)
    function getRandomDate() {
        const today = new Date();
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date(today);
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0].replace(/-/g, '.');
    }

    // 랜덤 리뷰 객체 생성 함수
    function generateRandomReview() {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
        const randomRating = 4 + Math.floor(Math.random() * 2); // 4 또는 5
        const randomDate = getRandomDate();
        
        return {
            name: randomName,
            text: randomText,
            rating: randomRating,
            date: randomDate
        };
    }

    // 리뷰 아이템 HTML 생성
    function createReviewHTML(review) {
        const initials = review.name.substring(0, 1);
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHTML += '<span class="star filled">★</span>';
            } else {
                starsHTML += '<span class="star empty">☆</span>';
            }
        }
        
        return `
            <div class="review-item">
                <div class="review-content">
                    <div class="review-header">
                        <div class="review-user">
                            <div class="review-user-avatar">${initials}</div>
                            <span class="review-user-name">${review.name}</span>
                            <div class="review-rating">${starsHTML}</div>
                        </div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-text">
                        <p>${review.text}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // 리뷰 슬라이더 초기화
    const wrapper = document.createElement('div');
    wrapper.className = 'review-slider-wrapper';
    
    // 초기 리뷰 3개 생성 및 배열에 저장
    const reviews = [];
    for (let i = 0; i < 3; i++) {
        reviews.push(generateRandomReview());
    }
    
    // 모든 슬라이드 HTML 생성
    reviews.forEach((review) => {
        wrapper.innerHTML += createReviewHTML(review);
    });
    
    reviewSlider.appendChild(wrapper);

    let currentSlideIndex = 0;
    let isTransitioning = false;
    let autoSlideInterval;

    // 다음 슬라이드로 이동 (계속 오른쪽으로 진행)
    function goToNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // 다음 슬라이드 인덱스
        const nextIndex = currentSlideIndex + 1;
        
        // 현재 슬라이드가 마지막에서 2번째일 때, 새로운 슬라이드를 추가
        if (nextIndex >= reviews.length - 1) {
            // 새로운 랜덤 리뷰 생성 및 추가
            const newReview = generateRandomReview();
            reviews.push(newReview);
            
            // 새로운 슬라이드 HTML 추가
            const newSlideHTML = createReviewHTML(newReview);
            wrapper.innerHTML += newSlideHTML;
        }
        
        // 다음 슬라이드의 리뷰를 새로운 랜덤 리뷰로 교체
        const newReview = generateRandomReview();
        reviews[nextIndex] = newReview;
        
        const reviewItems = wrapper.querySelectorAll('.review-item');
        if (reviewItems[nextIndex]) {
            reviewItems[nextIndex].outerHTML = createReviewHTML(newReview);
        }
        
        // 슬라이드 이동
        wrapper.style.transition = 'transform 0.5s ease-in-out';
        currentSlideIndex = nextIndex;
        wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // 도트 업데이트 (3개 슬라이드 기준으로 순환)
        updateDots();
        
        // 메모리 관리를 위해 앞의 슬라이드 제거 (5개 이상일 때)
        if (reviews.length > 5) {
            // 첫 번째 슬라이드 제거
            reviews.shift();
            const firstItem = wrapper.querySelector('.review-item');
            if (firstItem) {
                firstItem.remove();
            }
            // translateX 조정
            currentSlideIndex--;
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // 도트 업데이트 함수
    function updateDots() {
        const dotIndex = currentSlideIndex % 3;
        document.querySelectorAll('.review-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIndex);
        });
    }

    // 특정 슬라이드로 이동 (도트 클릭 시)
    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // 현재 인덱스를 도트 인덱스에 맞춰 조정
        const targetIndex = currentSlideIndex - (currentSlideIndex % 3) + index;
        
        // 필요한 슬라이드가 없으면 생성
        while (reviews.length <= targetIndex) {
            reviews.push(generateRandomReview());
            wrapper.innerHTML += createReviewHTML(reviews[reviews.length - 1]);
        }
        
        wrapper.style.transition = 'transform 0.5s ease-in-out';
        
        // 이동할 슬라이드의 리뷰를 새로운 랜덤 리뷰로 교체
        const newReview = generateRandomReview();
        reviews[targetIndex] = newReview;
        
        const reviewItems = wrapper.querySelectorAll('.review-item');
        if (reviewItems[targetIndex]) {
            reviewItems[targetIndex].outerHTML = createReviewHTML(newReview);
        }
        
        currentSlideIndex = targetIndex;
        wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // 도트 업데이트
        updateDots();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // 초기 도트 생성 (3개)
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('button');
        dot.className = 'review-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => goToSlide(i));
        reviewDots.appendChild(dot);
    }

    // 자동 슬라이드
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToNextSlide();
        }, 4000); // 4초마다 변경
    }

    // 자동 슬라이드 시작
    startAutoSlide();

    // 마우스 오버 시 자동 슬라이드 정지
    reviewSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // 마우스 아웃 시 자동 슬라이드 재시작
    reviewSlider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});

