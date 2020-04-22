const header = document.querySelector('header');
const scollToTop = document.querySelector('.scrollToTop');
const piclb = document.querySelector('.glide');

window.addEventListener('scroll', function(){
	//获取header元素的高度
	 let height = piclb.getBoundingClientRect().height;
	 //窗口距离页面的高度减去header元素占屏幕那块区域的高度大于800就执行
	 if(window.pageYOffset > height-300){
		 if(!header.classList.contains('sticky')){
			 header.classList.add('sticky');
		 }
	 }
	 else{
		 if(header.classList.contains('sticky')){
			 header.classList.remove('sticky');
		 }
	 }
	 
	 if(window.pageYOffset > 2000){
		 scollToTop.style.display = "block";
	 }
	 else{
		 scollToTop.style.display = 'none';
	 }
})

scollToTop.addEventListener('click',function(){
	
})

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll('.slide-caption')

glide.on(["mount.after", "run.after"], function(){
	const caption = captionsEl[glide.index];
	anime({
		targets: caption.children,
		opacity: [0, 1],
		duration: 400,
		easing: "linear",
		delay: anime.stagger(400, {start: 300}),
		translateY: [anime.stagger([40, 10]), 0]
	});
});

glide.on("run.before", function(){
	document.querySelectorAll(".slide-caption > *").forEach(function(el){
		el.style.opacity = 0;
	});
});

glide.mount();

const isotope = new Isotope('.cases', {
	layoutMode: "fitRows",
	itemSelector: ".case-item"
});


const filterBtns = document.querySelector('.filter-btns');
/* 注册监听事件：addEventListener */
filterBtns.addEventListener("click", function(e){
	let {target}=e;		//表示哪一个按钮被点击
	//获取被点击按钮的data-filter属性的值
	const filterOption = target.getAttribute("data-filter");
	if(filterOption){
		document.querySelectorAll(".filter-btn.active").forEach(function(btn){
			btn.classList.remove('active');
	})
	target.classList.add("active");
	isotope.arrange({filter: filterOption});
	}
})

const staggeringOption = {
	delay: 300,	//第一个元素出现的等待时间
	distance: "50px",	//元素出现时运动50px
	duration: 500,		//动画运行时间
	easing: "ease-in-out",	//动画执行函数	'ease-in-out',由慢到快再慢
	origin: "bottom",		//决定动画的从下往上,设置为top则从上往下
};

//interval:200	每次元素出现的间隔为200毫秒
//{ ...staggeringOption , interval:200 }	这是将staggeringOption和interval的值拼成一个新的对象
//如果staggeringOptin设置了interval,则会被此处这个覆盖
ScrollReveal().reveal('.feature', { ...staggeringOption , interval:200 } );
ScrollReveal().reveal('.service-item', { ...staggeringOption , interval:200 } );

ScrollReveal().reveal('.data-section', {
	//beforeReveal回调函数
	beforeReveal:function(){
		anime({
			targets:".num",
			innerHTML:function(el){
				return [0, el.innerHTML];
			},
			duration: 1000,
			round: 1,	//表示数字按整数1增长，没有这个属性则会按小数增长
			easing: "easeInExpo"	//动画执行越来越快
		})
	}
})
/* ***********此处为数据区域的视差效果,代码有问题*********** */
const data = document.querySelector('.data-section');
window.addEventListener('scroll', function(){
	//获取(.data-section)元素的顶部距离窗口顶部的距离
	let top = data.getBoundingClientRect().top;
	//获取(.data-section)元素的底部距离敞口顶部的距离
	let bottom = data.getBoundingClientRect().bottom;
	
	if(bottom>0 && top<window.innerHeight){
		data.style.backgroundPosition = "center calc(50%-${bottom/10}px)";
	}
})

//适用于使用a标签的锚点跳转,可以直接在创建SmoothScroll对象的时候直接传参
const scroll = new SmoothScroll("nav a[href*='#'],.scrollToTop a[href*='#']",{
	header: "header",		//如有固定的导航栏就将该元素的标签名或选择器填入
	offset: 80				//设置到目标的距离向上加80px的距离
}) 

//点击按钮滑动到具体位置使用下面的方法
document.querySelectorAll('.explore-btn').forEach(function(e){
	e.addEventListener('click',function(){
		//使用创建好的SmoothScroll对象
		scroll.animateScroll(document.querySelector('#about-us'));
	})
})