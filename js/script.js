// 当页面加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const daysLeft = document.getElementById('daysLeft');

    // 音乐控制
    let isMusicPlaying = false;
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '♫';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '❚❚';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 设置固定的开始日期
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 21); // 设置为21天前
    localStorage.setItem('loveStartDate', startDate.toISOString());

    // 更新天数显示
    function updateDays() {
        const currentDate = new Date();
        const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
        daysLeft.textContent = '21';
        
        // 更新进度条
        document.querySelector('.progress-bar').style.width = '100%';

        // 显示每日消息
        const dailyMessage = document.querySelector('.daily-message');
        dailyMessage.style.display = 'block';
        document.getElementById('dailyText').textContent = dailyMessages[20]; // 显示最后一天的消息
    }

    // 创建心形特效
    function createHearts() {
        const container = document.querySelector('.container');
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = Math.random() * 2 + 3 + 's';
                container.appendChild(heart);
                
                // 动画结束后移除心形元素
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 300);
        }
    }

    // 调试背景音乐
    bgMusic.addEventListener('error', function(e) {
        console.error('音乐加载错误:', e);
        alert('背景音乐加载失败，请检查音乐文件路径是否正确');
    });

    // 检查背景图片是否加载
    const img = new Image();
    img.onload = function() {
        console.log('背景图片加载成功');
    };
    img.onerror = function() {
        console.error('背景图片加载失败');
        alert('背景图片加载失败，请检查图片文件路径是否正确');
    };
    img.src = 'assets/images/bg.jpg';

    // 初始化
    updateDays();
    createHearts();
    initializePhotoWall();
    
    // 自动启动心形飘落效果
    createFloatingHearts();
});

function initializePhotoWall() {
    const frames = document.querySelectorAll('.photo-frame');
    
    frames.forEach(frame => {
        // 随机浮动动画
        frame.style.animation = `floatPhoto ${5 + Math.random() * 2}s ease-in-out infinite`;
        
        // 改进点击查看效果
        frame.addEventListener('click', function() {
            const viewer = document.createElement('div');
            viewer.className = 'photo-viewer';
            viewer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const img = document.createElement('img');
            img.src = this.querySelector('img').src;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;
            
            // 添加加载动画
            img.onload = () => img.style.transform = 'scale(1)';
            
            viewer.appendChild(img);
            document.body.appendChild(viewer);
            
            // 点击关闭
            viewer.addEventListener('click', () => {
                viewer.style.opacity = '0';
                setTimeout(() => viewer.remove(), 300);
            });
        });
    });
}

const dailyMessages = [
    "初次相遇，你的笑容真美",
    "牵手的感觉真好",
    "第一次看电影，你靠在我肩上",
    "一起吃火锅，你给我夹菜",
    "公园散步，数星星",
    "送你回家的路上，舍不得分开",
    "一起看星星，许下愿望",
    "分享彼此的过去",
    "为你做的第一顿饭",
    "规划第一次旅行",
    "一起逛街，你试衣服的样子真可爱",
    "分享彼此的梦想",
    "见到对方的好朋友们",
    "一起打游戏，你总是很可爱",
    "为你挑选的小礼物",
    "分享工作中的趣事",
    "一起看日落",
    "收到你的小惊喜",
    "深夜电话，听你的声音",
    "一起学做甜点",
    "憧憬美好的未来"
];

// 添加随机心形飘落效果
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.cssText = `
            left: ${Math.random() * 100}vw;
            color: rgb(${255 * Math.random()}, ${100 * Math.random()}, ${150 * Math.random()});
            font-size: ${20 + Math.random() * 20}px;
            animation-duration: ${3 + Math.random() * 3}s;
            animation-delay: ${Math.random()}s;
        `;
        document.body.appendChild(heart);
        
        // 动画结束后移除元素
        setTimeout(() => heart.remove(), 4000);
    }, 300);
} 
