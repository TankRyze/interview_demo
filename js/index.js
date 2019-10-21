window.onload = function () {
  function Brick() {
    this.colorArr = ['#810042', '#b942b6', '#4040bf', '#61b8ff', '#3dba3d', '#93b987', '#fff']
  }
  Brick.prototype = {
    init: function (arr) {
      if (Array.isArray(arr)){
        const newArr = arr.reverse()
        let li = '' 
        newArr.forEach((item, index) => {
          li += `<li class='vb_vertical' style='background:${this.colorArr[index] ? this.colorArr[index]: '#fff'}'><span class='vb_calipers vb_right'>${item}</span></li>`
        })
        $('#v_bricks').append(li)
      }else {
        alert('请传入数组')
      }
    },
    setStyle: function () {
      // 默认状态下是 卡尺式 竖排 右 长38 宽15
      // 获取排列样式
      const arrayStyle = $("input[name='arrayStyle']:checked").val()
      // 清除所有样式
      $('#v_bricks span').attr('class', '')
      // 改变样式
      this._numStyleChange(arrayStyle)
      // 数字位置发生变化
      this._directionChange(arrayStyle)
      // 长宽的改变 (调用位置必须在_acrossChange方法的前面)
      this._HWchange(arrayStyle)
      // 横竖排的改变
      this._acrossChange(arrayStyle)
    },
    // 数值样式的改变
    _numStyleChange: function(type) {
      // 获取数值样式
      const numStyle = $("input[name='numStyle']:checked").val()
      if (type === 'vertical') {
        // 竖排
        // 改变数值样式
        if (numStyle == 'center') {
          // 居中样式
          $('#v_bricks span').addClass('vb_vertical_center')
        }else {
          // 卡尺样式
          $('#v_bricks span').addClass('vb_vertical_calipers')
        }
      }else {
        // 横排
        // 改变数值样式
        if (numStyle == 'center') {
          // 居中样式
          $('#v_bricks span').addClass('vb_across_center')
        }else {
          // 卡尺样式
          $('#v_bricks span').addClass('vba_cross_calipers')
        }
      }
    },
    // 横排竖排切换
    _acrossChange: function(type) {
      $('#v_bricks li').attr('class', '')
      if (type === 'vertical') {
        // 竖排 各种清除样式
        $('#v_bricks li').removeClass('fr')
        $('#v_unit').removeClass('fr')
        $('#v_box').removeClass('fl')
        $('#v_bricks li').addClass('vb_vertical')
      }else {
        // 横排 各种添加样式
        $('#v_bricks li').addClass('fr')
        $('#v_unit').addClass('fr')
        $('#v_box').addClass('fl')
        $('#v_bricks li').addClass('vb_across')
        const v_box_width = arr.length * $('#v_bricks li').outerWidth() + $('#v_unit').width()
        $('#v_box').css({width: v_box_width + 'px'})
      }
    },
    // 长宽发生变化
    _HWchange: function(type) {
      // 获取单色块的长宽
      const height = $("input[name='height']").val()
      const width = $("input[name='width']").val()
      if (type === 'vertical') {
        // 长宽发生变化 竖排  长就是高  宽就是宽
        $('#v_bricks li').css({height})
        $('#v_bricks li').css({width})
      }else {
        // 长宽发生变化 横排  长就是宽 宽就是高
        $('#v_bricks li').css({width: height})
        $('#v_bricks li').css({height: width})
      }
    },
    // 数字方向发生变化
    _directionChange(type) {
      const direction = $('.c_active > .active').html()
      if (type === 'vertical') {
        // 数字发生变化
        if (direction === '左') {
          $('#v_bricks span').addClass('vb_left')
        }else {
          $('#v_bricks span').addClass('vb_right')
        }
      }else {
         // 横排
        if (direction === '上') {
          $('#v_bricks span').addClass('vb_top')
        }else {
          $('#v_bricks span').addClass('vb_bottom')
        }
      }
    }
  }
  // 数据源
  var arr = [0, 0.1, 1.6, 7, 15, 40, 50]
  // 创建对象
  var brick = new Brick();
  // 初始化
  brick.init(arr);

// 控制器变化
// 数值排序变化
$('input[name="numStyle"]').on('change',function () {
  brick.setStyle()
})
// 数值位置发生变化（上下左右）
$('.cba_contrul div').on('click', function () {
  // 判断input是不是选中状态
  const ipt = $($(this).parents('section')[0]).find('input')
  const checked = ipt.prop('checked')
  if (checked) {
    // 选中状态
    // 判断当前是不是选中状态
    if ($(this).hasClass('active')) {
      // 自己是选中状态，没有变化
      return
    }else {
      // 自己不是选中状态
      $(this).siblings('div').removeClass('active')
      $(this).addClass('active')
      brick.setStyle()
    }
  }else {
    // 没选中状态
    const mode = ipt.val() === 'across' ? '横排' : '竖排';
    alert(`请将排列方式切换为${mode}`)
  }
  
})
// 排列样式发生变化
$('input[name="arrayStyle"]').on('change',function () {
  $('.cba_contrul').removeClass('c_active')
  $($(this).parents('section')[0]).find($('.cba_contrul')).addClass('c_active')
  brick.setStyle()
})
// 长宽发生变化
$('#cb_oneAttr div input').on('change', function() {
  if ($(this).val().indexOf('px') ==  -1) {
    $(this).val( $(this).val() + 'px')
  }
  
  brick.setStyle()
})
}