const jQuery = require("jquery");

// 다크모드
$('.thema_infor li').on('click', function () {
  let idx = $('.thema_infor li').index(this);
  //같은 레벨(부모 요소를 기준으로)에서 내가 몇 번째 요소인지 찾을 때 : $('li').index();
  //같은 레벨이 아닌 모든 button 중 내가 몇 번째 인지 찾을 때 : $(this).index();

  $('body').removeClass();
  alert(idx);
  $('.thema_infor li').removeClass('active');
  if (idx === 0) {} else {
    $('body').addClass('dark');
  }
});

//스와이퍼
const swiperSet = function () {
  let swiperDefault = [],
    swUnit = $('.swiper_unit');
  function swOptionGet(swiperEl) {
    let option = {
      auto: swiperEl.attr('data-auto') ? swiperEl.data('auto') : false
    };
    return option;
  }
  //each 함수/init/getter 뭔지 모르겠음
  return {
    init: function () {
      swUnit.each(function (index, swEl) {
        // swiper index로 구분
        $(swEl).addClass("sw-" + index);
        // swiper option 적용
        const swOpt = SwOptionSet(SwOptionGet($(swEl)));
        // swiper 각자 생성
        swiperDefault[index] = new Swiper(".sw-" + index, swOpt);
      });
    },
    getter: function () {
      return swiperDefault;
    }
  };
};

//삼항연사자
// 조건 ? true : false;
// var age = 26;
// var beverage = (age > 21) ? 'beer' : 'juice';
// console.log(beverage) -> 'beer'

// .attr() : 요소(el)의 속성 값(attribute)을 가져오거나 속성을 추가. 
// 값 가져오기 :  $('div').attr('class');
// 값 추가하기 : $('h1').atter('title', 'hello'); h1 타이틀에 hello 값 추가.