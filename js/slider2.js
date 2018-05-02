var interval = 3000,
  activeSlide = {'background-color' : '#fdd279'},
  noActiveSlide = {'background-color' : '#fff'};

$(function() {
  var width = $('#slider-wrap').width(),
    controlSlide = $('.sli-links').children(),
    playSlide;

    //Поместим копию последнего слайда в начало и первого в конец слайдера
    $('.slide:last').clone().prependTo('#slider');
    $('.slide').eq(1).clone().appendTo('#slider');
    //Сдвинем слайдер влево на ширину одного слайдера
    $('#slider').css('margin-left', -width);
    //Делаем активной кнопку навигации первого слайдаж
    controlSlide.eq(0).css(activeSlide);
    //Запуск слайдера
    playSlide = setInterval('animation()', interval);
    //Остановка слайдера при наведении курсора на блок со слайдером
    $('.content-slider').hover(
      function() {
        clearInterval(playSlide);
      },
      function() {
        playSlide = setInterval('animation()', interval)}
    );
    //Следующий слайд
    $('#nextbutton').click(function() {
      if($('#slider').is(':animated')) return;
      animation();
    })
    //Предыдущий слайд
    $('#prewbutton').click(function() {
      if($('#slider').is(':animated')) return;
      animation('prew');
    })
    //Показать определенный слайд
    controlSlide.click(function() {
      animation($(this).text());
    })
});

//Функция переключающая слайдер
function animation(course) {
  var margin = parseInt($('#slider').css('marginLeft')),
    width = $('#slider-wrap').width(),
    slidersAmount = $('#slider').children().length,
    controlSlide = $('.sli-links').children();
  //Переключение слайдера кнопками вперед или назад
  if(course == 'prew') {
    if(margin != 0) {
      margin = margin + width;
    } else {
      $('#slider').css('margin-left', -width * 4)
      margin = -width * 3
    }
  } else {
    if(margin != (-width * (slidersAmount - 1))) {
      margin = margin - width;
    } else {
      $('#slider').css('margin-left', -width);
      margin =- width * 2;
    }
  }
  //Переключение слайдера кнопками навигации
  if(course == 0) margin = -width;
  if(course == 1) margin = -2 * width;
  if(course == 2) margin = -3 * width;
  if(course == 3) margin = -4 * width;
  //Показ активной кнопки навигации в зависимости от слfйдера
  controlSlide.css(noActiveSlide);
  if(margin == 0 || margin == -4 * width ) {
    controlSlide.eq(3).css(activeSlide);
  }
  if(margin == -width || margin == -5 * width ) {
    controlSlide.eq(0).css(activeSlide);
  }
  if(margin == 2 * -width ) {
    controlSlide.eq(1).css(activeSlide);
  }
  if(margin == 3 * -width ) {
    controlSlide.eq(2).css(activeSlide);
  }
  //Анимация слайдера
  $('#slider').animate({marginLeft: margin}, 500);
};
