;(function ($) {
  $.fn.bbNameDate = function ($showDom) {
    let nowT = new Date();
    let nowY = nowT.getFullYear();
    let nowM = nowT.getMonth();
    let nowD = nowT.getDate();
    let nowH = nowT.getHours();
    let nowF = nowT.getMinutes();
    let $bb = $('.bb-name-date-pl');
    let $leapMonth = $bb.find('.leapMonth');
    let $datetime = $bb.find('.datetime');
    let almanac = '公历';
    let datetimeTxt = '';
    let yearType = 0; // 年份类型

    let dateHtml = function () {
      let yHtml = '';
      let mHtml = '';
      let dHtml = '';
      let hHtml = '';
      let fHtml = '';

      for (let y = nowY; y > 1940; y--) {
        yHtml += ('<span>' + y + '</span>');
      }
      for (let m = 12; m > 0; m--) {
        mHtml += ('<span>' + m + '</span>');
      }
      for (let d = 31; d > 0; d--) {
        dHtml += ('<span>' + d + '</span>');
      }
      for (let h = 23; h > -1; h--) {
        hHtml += ('<span>' + h + '</span>');
      }
      for (let f = 59; f > -1; f--) {
        fHtml += ('<span>' + f + '</span>');
      }

      $bb.find('.yHtml').html(yHtml).find('span').eq(0).addClass('on');
      $bb.find('.mHtml').html(mHtml).find('span').eq(0).addClass('on');
      $bb.find('.dHtml').html(dHtml).find('span').eq(0).addClass('on');
      $bb.find('.hHtml').html(hHtml).find('span').eq(0).addClass('on');
      $bb.find('.fHtml').html(fHtml).find('span').eq(0).addClass('on');

      dateRes(yearType);
    };

    let dateRes = function (type) {
      if (type === 1) {
        datetimeTxt = almanac + ' ' + nowY + '年' + nowM + '月' + nowD + '日 ' + nowH + '时' + nowF + '分';
      } else if (type === 2) {
        datetimeTxt = almanac + ' ' + nowY + '年闰' + nowM + '月' + nowD + '日 ' + nowH + '时' + nowF + '分';
      } else {
        datetimeTxt = almanac + ' ' + nowY + '-' + nowM + '-' + nowD + ' ' + nowH + ':' + nowF;
      }
      $datetime.text(datetimeTxt);
    };

    dateHtml();
    $bb.show();
    $bb.unbind('click').on('click', '.leapMonth', function () {
      $(this).toggleClass('on');
      if ($(this).hasClass('on')) {
        yearType = 2;
        dateRes(yearType);
      } else {
        yearType = 1;
        dateRes(yearType);
      }
    });
    $bb
      .on('click', '.almanac', function () {
        $bb.find('.almanac').each(function () {
          $(this).removeClass('on');
        });
        $(this).addClass('on');
        if ($(this).find('input[name="almanac"]').val() === '1') {
          $('.leapMonth').removeClass('on');
          yearType = 0;
          almanac = '公历';
          $leapMonth.hide();
          dateRes(yearType);
        } else {
          yearType = 1;
          almanac = '农历';
          $leapMonth.show();
          dateRes(yearType);
        }
      })
      .on('click', '.btn-ok', function () {
        $bb.find('.almanac').each(function () {
          $(this).removeClass('on');
        });
        $('.leapMonth').removeClass('on');
        $showDom.val($datetime.text());
        $bb.hide();
      })
      .on('click', '.itemY .yHtml span', function () {
        $(this).addClass('on').siblings().removeClass('on');
        nowY = $(this).text();
        dateRes(yearType);
      })
      .on('click', '.itemM .mHtml span', function () {
        $(this).addClass('on').siblings().removeClass('on');
        nowM = $(this).text();
        dateRes(yearType);
      })
      .on('click', '.itemD .dHtml span', function () {
        $(this).addClass('on').siblings().removeClass('on');
        nowD = $(this).text();
        dateRes(yearType);
      })
      .on('click', '.itemH .hHtml span', function () {
        $(this).addClass('on').siblings().removeClass('on');
        nowH = $(this).text();
        dateRes(yearType);
      })
      .on('click', '.itemF .fHtml span', function () {
        $(this).addClass('on').siblings().removeClass('on');
        nowF = $(this).text();
        dateRes(yearType);
      });
  }
})(jQuery);
